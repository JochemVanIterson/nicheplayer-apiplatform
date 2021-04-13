<template lang="pug">
  q-page.bg-grey-4(padding)
      .row.q-col-gutter-md.q-pb-md
        .col-xs-12.col-sm-4.flex
          q-img.rounded-borders.shadow-2(:src="albumArt" basic)
        
        .col-xs-12.col-sm-8.q-gutter-y-md.column
          q-card
            q-card-section.column.justify-center
              .text-h2.text-weight-normal {{ albumData.name }}
              .text-h4.text-weight-thin {{ albumData.artist }}
          q-card.col
            q-card-section
              q-card-section
                .row.q-pb-sm
                  .col-xs-12.col-sm.text-h4.text-weight-normal Purchase
                  q-chip.col-auto(size="lg" color="primary" text-color="white") {{ priceString }}
                div(v-if="paymentStatus=='unknown'")
                  q-btn(color="primary" :label="paymentStatusPrintable" no-caps :disabled="isPurchasing" @click="confirmPayment")
                div(v-else)
                  .text-h6.text-weight-thin.self-center {{paymentStatusPrintable}}
                  div(v-if="paymentStatus=='requested'")
                    .text Your request has been send. You will receive an email with the payment instructions.
                  div(v-else-if="paymentStatus=='in_progress'")
                    .text Payment request has been send by the author.
                  div(v-else-if="paymentStatus=='declined'")
                    .text
                      | The author has declined your request, either because it took too long or because something went wrong during transaction.
                      | Please contact the author for further instructions
                  div(v-else-if="paymentStatus=='success'")
                    .text You have purchased this album. Please go to the dedicated album page for more features.

      q-card#albumTracks
        .row.justify-between.q-px-md.q-pt-md
          .text-h5 Tracks
          q-btn(
              color="primary"
              label="Preview album"
              no-caps
              @click="playAlbum()")
        q-markup-table#trackList
          thead
            tr
              th(class="text-right" style="width: 0px") Track
              th(class="text-left") Title
              th(class="text-left") Artist
              th(class="text-left" v-if="$q.screen.gt.xs") Duration
          tbody
            tr(v-for="(song, i) in songsSorted" @click="rowClicked(i)" :class="!songPlayable(song)?['q-tr--no-hover', 'disabled', 'track_disabled']:['cursor-pointer']")
              td(class="text-right") {{song.trackNumber}}
              td(class="text-left")
                q-icon.q-pr-sm(name="volume_up" color="primary" size="sm" v-if="currentPlayingId == song.id && isPlaying")
                span {{song.name}}
              td(class="text-left") {{song.songArtistt || albumData.artist}}
              td(class="text-left" v-if="$q.screen.gt.xs") {{`${prettyDate(song.duration)}`}}
</template>

<script>
import { date } from 'quasar'
export default {
  name: 'ExploreAlbum',
  data() {
    return {
    }
  },
  computed: {
    isLoggedIn() { return this.$store.getters["system/isLoggedIn"] },
    paymentObject() { return this.$store.getters["cache/payments/getObjectByAlbum"](this.albumID) },
    paymentStatus () { return (this.paymentObject) ? this.paymentObject.paymentStatus : 'unknown' },
    isPurchasing () { return this.paymentStatus !== '' && this.paymentStatus !== 'unknown' },
    paymentStatusPrintable () {
      if (!this.paymentStatus) return ''
      const options = {
        unknown: 'Buy Album',
        requested: 'Requested...',
        in_progress: 'In Progress...',
        success: 'Success',
        declined: 'Declined'
      }
      return options[this.paymentStatus]
    },
    currency () {
      if (!this.albumData.currency) return ''
      const options = {
        euro: '€',
        dollar: '$'
      }
      return options[this.albumData.currency]
    },
    priceString() { return `${this.currency}${this.albumData.price}` },

    albumID() { return this.$route.params.id },
    albumData() { return this.$store.getters['cache/albums/getObjectJoined'](this.albumID, ['albumArt', 'songs']) },

    albumArt() {
      return (this.albumData && this.albumData.albumArt && this.albumData.albumArt.contentUrl)
        ? this.$store.getters['system/getMediaURL'](this.albumData.albumArt.contentUrl) : ""
    },
    songs() { return (this.albumData && this.albumData.songs) ? this.albumData.songs : [] },
    songsSorted() { return this.songs.slice().sort((a, b) => a.trackNumber - b.trackNumber) },
    songsExplorable() { return (this.paymentObject && this.paymentStatus === 'success') ? this.songsSorted : this.songsSorted.filter((song) => song.explorable) },
    currentPlayingPage() { return this.$store.getters["audioplayer/getPlaylistPage"] },
    currentPlayingId() { return this.currentPlayingPage == this.$route.path && this.$store.getters["audioplayer/getSongID"]() },
    isPlaying() { return this.$store.getters["audioplayer/getIsPlaying"] },
  },
  watch: {
    isLoggedIn(value) {
      if (value != "") {
        this.$store.dispatch("cache/albums/getFromAPI", { id: this.albumID, joinFields: ['albumArt', 'songs'], force: true })
        this.updatePaymentStatus()
      }
    }
  },
  methods: {
    prettyDate (timestamp) {
      return date.formatDate(date.buildDate({ minutes: 0, seconds: timestamp }), 'mm:ss')
    },
    songPlayable (song) { return song.explorable || (this.paymentObject && this.paymentObject.paymentStatus) == 'success' },
    rowClicked (index) {
      let explorableIndex = this.songsExplorable.indexOf(this.songsSorted[index])
      if (this.songsSorted[index].explorable || this.paymentStatus === 'success') this.playAlbum(explorableIndex)
    },
    playAlbum (trackNumber = 0) {
      this.$store.dispatch("audioplayer/clearPlaylist").then(() => {
        const songList = this.songsExplorable;
        const actionList = songList.map(song => this.$store.dispatch("audioplayer/appendPlaylist", { songID: song.id }))
        return Promise.all(actionList).then((values) => {
          this.$store.commit('audioplayer/setPlayingIndex', trackNumber)
          this.$store.commit('audioplayer/setPlaylistPage', this.$route.path)
          this.$store.dispatch('audioplayer/setIsPlaying', true)
        });
      })
    },
    confirmPayment () {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Realy sure you want to buy this album?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.sendPaymentRequest()
        this.$q.dialog({
          title: 'Purchase Requested',
          message: 'Because this is still a prototype the online payment funcionality is not yet implemented. The author will send a payment request via email.',
        })
      })
    },
    sendPaymentRequest () {
      let self = this
      const userData = this.$store.getters['system/userData']
      const payload = {
        user: `/api/users/${userData.id}`,
        album: `/api/albums/${parseInt(this.albumID)}`,
        paymentStatus: 'requested',
        type: 'album',
        price: this.albumData.price
      }

      return this.$store.dispatch("system/apiRequest", { path: `payments`, method: 'POST', payload })
        .then((data) => {
          self.updatePaymentStatus()
          console.log("sendPaymentRequest", data)
          return true
        })
        .catch((e) => {
          console.log("sendPaymentRequest Failed", e)
          return false
        })
    },
    updatePaymentStatus () {
      return this.$store.dispatch("cache/payments/getFromAPIByAlbum", { album: parseInt(this.albumID) })
    }
  },
  mounted() {
    if (this.isLoggedIn != "") {
      this.$store.dispatch("cache/albums/getFromAPI", { id: this.albumID, joinFields: ['albumArt', 'songs'], force: true })
      this.updatePaymentStatus()
    }
  }
}
</script>

<style lang="scss" scoped>
.flex-break{
  flex: 1 0 100% !important
}
.row{
  .flex-break{
    height: 0 !important
  }
}
.column{
  .flex-break{
    width: 0 !important
  }
}
.track_disabled {
  background-color: #ccc
}
</style>