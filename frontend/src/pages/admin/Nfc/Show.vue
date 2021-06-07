<template lang="pug">
q-page(padding)
  q-card(flat bordered)
    q-card-section
      .q-gutter-y-md
        div
          .text-caption.text-weight-light Album Art
          q-img(
            :src="data.albumArt.contentUrl"
            style="width: 128px; height: 128px;"
            :ratio="1")
        div
          .text-caption.text-weight-light Name
          .text {{data.name}}
        div
          .text-caption.text-weight-light Artist
          .text {{data.artist}}
        div
          .text-caption.text-weight-light Release Date
          .text {{parseDate(data.releaseDate)}}
        div
          .text-caption.text-weight-light Songs
          q-markup-table(flat bordered)
            thead
              tr.q-th--no-hover
                th.text-left Track Number
                th.text-left Name
                th.text-left Duration
            tbody
              tr.q-tr--no-hover(v-for="song in songs" :key="'song_'+song.id")
                td {{song.trackNumber}}
                td {{song.name}}
                td {{parseDuration(song.duration)}}
    q-card-actions(align="right")
      q-btn(color="primary" icon="edit" padding="xs md" @click="$router.push(`/admin/albums/${id}/edit`)") Edit

</template>

<script>
import { date } from 'quasar'

export default {
  name: 'PageAdminAlbumsShow',
  data () {
    return {}
  },
  computed: {
    id () { return this.$route.params.id },
    data () { return this.$store.getters['cache/albums/getObjectJoined'](this.id) },
    songs () { return this.data.songs.map((e) => { return this.$store.getters['cache/songs/getObject'](e.replace('/api/songs/', '')) }) }
  },
  methods: {
    parseDate (timestamp) { return date.formatDate(timestamp, 'DD-MM-YYYY') },
    parseDuration (seconds) {
      const newDate = date.buildDate({ minutes: 0, seconds: seconds })

      return date.formatDate(newDate, 'mm:ss')
    }
  },
  mounted () {
    this.$store.dispatch('cache/albums/getAllFromAPI')
  }
}
</script>
