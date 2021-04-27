<template lang="pug">
q-page(padding)
  q-card(flat bordered)
    q-card-section
      .q-gutter-y-md
        div
          .text-caption.text-weight-light Name
          .text {{data.name}}
        div
          .text-caption.text-weight-light Album
          .text(v-if="data.album") {{data.album.artist}} - {{data.album.name}}
        div
          .text-caption.text-weight-light Track Number
          .text {{data.trackNumber}}
        div.column
          .text-caption.text-weight-light File
          router-link(v-if="data.file" @click.native.stop="" :to="`/admin/media_objects/${data.file.id}/show`") {{data.file.fileName}}
          audio(v-if="data.file" controls :src="data.file.contentUrl")
        div
          .text-caption.text-weight-light Explorable
          q-icon(:name="data.explorable?'check':'close'" size="sm")
        div
          .text-caption.text-weight-light Duration
          .text {{parseDuration(data.duration)}}
    q-card-actions(align="right")
      q-btn(color="primary" icon="edit" padding="xs md" @click="$router.push(`/admin/songs/${id}/edit`)") Edit

</template>

<script>
import { date } from 'quasar'

export default {
  name: 'PageAdminSongsShow',
  data () {
    return {}
  },
  computed: {
    id () { return this.$route.params.id },
    data () { return this.$store.getters['cache/songs/getObjectJoined'](this.id) }
  },
  methods: {
    parseDuration (seconds) {
      const newDate = date.buildDate({ minutes: 0, seconds: seconds })
      return date.formatDate(newDate, 'mm:ss')
    }
  },
  mounted () {
    this.$store.dispatch('cache/songs/getAllFromAPI')
  }
}
</script>
