<template lang="pug">
q-page(padding)
  q-card(flat bordered)
    q-card-section
      .q-gutter-y-md
        div
          .text-caption.text-weight-light ID
          .text {{data.id}}
        div
          .text-caption.text-weight-light User
          router-link(v-if="data.user" @click.native.stop="" :to="`/admin/users/${data.user.id}/show`") {{data.user.firstname}} {{data.user.lastname}}
        div
          .text-caption.text-weight-light Song
          router-link(v-if="data.song" @click.native.stop="" :to="`/admin/songs/${data.song.id}/show`") {{data.song.album.artist}} - {{data.song.name}}
        div
          .text-caption.text-weight-light Timestamp
          .text {{parseDate(data.timestamp)}}

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
    data () { return this.$store.getters['cache/playHistory/getObjectJoined'](this.id) }
  },
  methods: {
    parseDate (timestamp) { return date.formatDate(timestamp, 'DD-MM-YYYY HH:mm:ss') }
  },
  mounted () {
    this.$store.dispatch('cache/playHistory/getAllFromAPI')
  }
}
</script>
