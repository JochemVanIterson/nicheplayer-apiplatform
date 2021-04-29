<template lang="pug">
q-page(padding)
  q-card(flat bordered)
    q-card-section
      .q-gutter-y-md
        .text-h5 Edit payment
        div
          .text-caption.text-weight-light User
          router-link(v-if="userID > 0" @click.native.stop="" :to="`/admin/users/${userObject.id}/show`") {{userObject.firstname}} {{userObject.lastname}}
        div
          .text-caption.text-weight-light Payment Statuw
          q-select(filled v-model="paymentStatus" :options="statusOptions" emit-value map-options label="Payment Status")
        div
          .text-caption.text-weight-light Type
          .text {{type}}
        div
          .text-caption.text-weight-light Album
          router-link(v-if="albumID > 0" @click.native.stop="" :to="`/admin/users/${albumObject.id}/show`") {{albumObject.artist}} - {{albumObject.name}}
        div
          .text-caption.text-weight-light Song
          router-link(v-if="songID > 0" @click.native.stop="" :to="`/admin/users/${songObject.id}/show`") {{songObject.trackNumber}}. {{songObject.name}}
        div
          .text-caption.text-weight-light Datetime
          .text {{parseDate(datetime)}}
        div
          .text-caption.text-weight-light Price
          .text {{price}}
    q-card-actions(align="right")
      q-btn(flat color="red" icon="delete" padding="xs md") Delete
      q-btn(:disabled="!savable" color="primary" icon="save" padding="xs md") Save
</template>

<script>
import { date } from 'quasar'

export default {
  name: 'PageAdminPaymentsCreate',
  data () {
    return {
      changedStore: {},
      statusOptions: [
        {
          label: 'Requested',
          value: 'requested'
        },
        {
          label: 'In Progress',
          value: 'in_progress'
        },
        {
          label: 'Success',
          value: 'success'
        },
        {
          label: 'Declined',
          value: 'declined'
        }
      ]
    }
  },
  computed: {
    id () { return this.$route.params.id },

    oldStore () { return this.$store.getters['cache/payments/getObject'](this.id) },

    userID () { return this.user ? parseInt(this.user.replace('/api/users/', '')) : -1 },
    albumID () { return this.album ? parseInt(this.album.replace('/api/albums/', '')) : -1 },
    songID () { return this.song ? parseInt(this.song.replace('/api/songs/', '')) : -1 },

    userObject () { return this.$store.getters['cache/users/getObject'](this.userID) },
    albumObject () { return this.$store.getters['cache/albums/getObject'](this.albumID) },
    songObject () { return this.$store.getters['cache/songs/getObject'](this.songID) },

    files () {
      return this.$store.getters['cache/mediaObjects/getAll'].filter((e) => {
        return e.type === 'audio'
      })
    },

    user: {
      get () { return this.changedStore.user === undefined ? this.oldStore.user : this.changedStore.user },
      set (val) { this.$set(this.changedStore, 'user', val) }
    },
    paymentStatus: {
      get () { return this.changedStore.paymentStatus === undefined ? this.oldStore.paymentStatus : this.changedStore.paymentStatus },
      set (val) { this.$set(this.changedStore, 'paymentStatus', val) }
    },
    type: {
      get () { return this.changedStore.type === undefined ? this.oldStore.type : this.changedStore.type },
      set (val) { this.$set(this.changedStore, 'type', val) }
    },
    album: {
      get () { return this.changedStore.album === undefined ? this.oldStore.album : this.changedStore.album },
      set (val) { this.$set(this.changedStore, 'album', val) }
    },
    song: {
      get () { return this.changedStore.song === undefined ? this.oldStore.song : this.changedStore.song },
      set (val) { this.$set(this.changedStore, 'song', val) }
    },
    datetime: {
      get () { return this.changedStore.datetime === undefined ? this.oldStore.datetime : this.changedStore.datetime },
      set (val) { this.$set(this.changedStore, 'datetime', val) }
    },
    price: {
      get () { return this.changedStore.price === undefined ? this.oldStore.price : this.changedStore.price },
      set (val) { this.$set(this.changedStore, 'price', val) }
    },

    savable () { return Object.keys(this.changedStore).length > 0 }
  },
  methods: {
    parseDate (timestamp) { return date.formatDate(timestamp, 'DD-MM-YYYY HH:mm:ss') }
  },
  mounted () {
    this.$store.dispatch('cache/payments/getFromAPI', { id: this.id })
  }
}
</script>
