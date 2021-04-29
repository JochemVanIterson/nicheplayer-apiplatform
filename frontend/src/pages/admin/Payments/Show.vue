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
          .text-caption.text-weight-light Type
          .text {{data.type}}
        div
          .text-caption.text-weight-light Album
          router-link(v-if="data.album" @click.native.stop="" :to="`/admin/albums/${data.album.id}/show`") {{data.album.artist}} - {{data.album.name}}
        div
          .text-caption.text-weight-light Song
          router-link(v-if="data.song" @click.native.stop="" :to="`/admin/songs/${data.song.id}/show`") {{data.song.album.artist}} - {{data.song.name}}
        div
          .text-caption.text-weight-light Status
          .text {{data.paymentStatus}}
        div
          .text-caption.text-weight-light Datetime
          .text {{parseDate(data.datetime)}}
    q-card-actions(align="right")
      q-btn(color="primary" icon="edit" padding="xs md" @click="$router.push(`/admin/payments/${id}/edit`)") Edit

</template>

<script>
import { date } from 'quasar'

export default {
  name: 'PageAdminPaymentsShow',
  data () {
    return {}
  },
  computed: {
    id () { return this.$route.params.id },
    data () { return this.$store.getters['cache/payments/getObjectJoined'](this.id) }
  },
  methods: {
    parseDate (timestamp) { return date.formatDate(timestamp, 'DD-MM-YYYY HH:mm:ss') }
  },
  mounted () {
    this.$store.dispatch('cache/payments/getAllFromAPI')
  }
}
</script>
