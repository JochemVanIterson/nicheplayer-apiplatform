<template lang="pug">
  q-page.bg-grey-4(padding)
      .row.q-col-gutter-md.q-pb-md
        .col-xs-12.col-sm-4.flex
          q-img.rounded-borders(:src="albumArt" basic)
        
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
        q-markup-table
          thead
            tr
              th(class="text-right" style="width: 0px") Track
              th(class="text-left") Title
              th(class="text-left") Artist
              th(class="text-left" v-if="$q.screen.gt.xs") Duration
          tbody
            tr(v-for="(song, i) in songsSorted" @click="rowClicked(i)" :class="{'q-tr--no-hover':!songPlayable(song), 'disabled':!songPlayable(song)}")
              td(class="text-right") {{song.trackNumber}}
              td(class="text-left") {{song.name}}
              td(class="text-left") {{song.songArtistt || albumData.artist}}
              td(class="text-left" v-if="$q.screen.gt.xs") {{`${song.duration}`}}
</template>

<script>
export default {
  name: 'ExploreAlbum',
  data() {
    return {
      paymentObject: {
        status: 'unknown'
      }
    }
  },
  computed: {
    isLoggedIn() { return this.$store.getters["system/isLoggedIn"] },
    paymentStatus () {
      console.log("paymentStatus", this.paymentObject)
      return (this.paymentObject) ? this.paymentObject.paymentStatus : 'unknown'
    },
    isPurchasing () {
      return this.paymentStatus !== '' && this.paymentStatus !== 'unknown'
    },
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
      if (this.albumData && this.albumData.albumArt && this.albumData.albumArt.contentUrl) return this.$store.getters['system/getMediaURL'](this.albumData.albumArt.contentUrl)
      else return ""
    },
    songs() {
      if (this.albumData && this.albumData.songs) return this.albumData.songs;
      else return []
    },
    songsSorted() {
      return this.songs.slice().sort((a, b) => a.trackNumber - b.trackNumber)
    },
    songsExplorable() {
      if (this.paymentObject && this.paymentStatus === 'success') return this.songsSorted
      else return this.songsSorted.filter((song) => song.explorable);
    }
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
    songPlayable (song) {
      return song.explorable || (this.paymentObject && this.paymentObject.paymentStatus) == 'success'
    },
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
      let self = this
      const userData = this.$store.getters['system/userData']
      const params = {
        user: userData.id,
        album: parseInt(this.albumID),
        type: 'album'
      }
      console.log("updatePaymentStatus", params)
      return this.$store.dispatch("system/apiRequest", { path: `payments`, params })
          .then((data) => {
              console.log("updatePaymentStatus", data)
              const arrayLength = data['hydra:member'].length
              self.paymentObject = data['hydra:member'][arrayLength - 1]
              return true
          })
          .catch((e) => {
              console.log("updatePaymentStatus Failed", e)
              return false
          })
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
</style>