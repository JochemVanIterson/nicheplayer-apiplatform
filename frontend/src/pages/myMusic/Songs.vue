<template lang="pug">
  q-page(padding)
    .text-h2.q-pb-lg My Songs
    q-list(bordered separator class="rounded-borders")
      q-item(v-for="song in orderedSongs" v-if="song" :clickable="songAllowed(song)" :disabled="!songAllowed(song)" @click="songClicked(song)")
        q-item-section(top avatar)
          q-avatar(rounded size="48px")
            q-img( :src="parsedURL(song.album.albumArt)" basic :ratio="1")
        q-item-section(side v-if="song.id == currentPlayingId")
          q-icon(name="volume_up" color="primary")
        q-item-section
          q-item-label {{song.name}}
          q-item-label(caption lines="2") {{song.album.artist}} - {{song.album.name}}
        q-item-section(v-if="song.payment" side top) {{readableStatus(song)}}

</template>

<script>
export default {
  name: 'MySongs',
  computed: {
    songs() { return this.$store.getters["cache/songs/getAllJoined"] },
    payments() { return this.$store.getters["cache/payments/getAllJoined"] },
    orderedSongs() {
      return this.songs.map((song) => {
        let payment = this.payments.filter((e) => {
          return e.album == song.album['@id']
        })[0]
        song.payment = payment
        return song
      }).sort((a, b) => {
        if (!a.payment || !b.payment) return 0
        // Sort success payments on top
        if (a.payment.paymentStatus != "success" && b.payment.paymentStatus == "success") return 1;
        if (a.payment.paymentStatus == "success" && b.payment.paymentStatus != "success") return -1;
        // then sort by album
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      })
    },
    songsPlayable() {
      return this.orderedSongs.filter((song) => song.payment && song.payment.paymentStatus == "success");
    },
    currentPlayingPage() { return this.$store.getters["audioplayer/getPlaylistPage"] },
    currentPlayingId() { return this.currentPlayingPage == this.$route.path && this.$store.getters["audioplayer/getSongID"]() }
  },
  methods: {
    parsedURL(value) {
      if (value && value.contentUrl) return this.$store.getters['system/getMediaURL'](value.contentUrl)
      else return ""
    },
    readableStatus(album) {
      if (!album.payment) return ""
      const status = album.payment.paymentStatus
      switch (status) {
        case 'in_progress':
          return "Payment in progress"
        case 'requested':
          return "Payment requested"
        case 'declined':
          return "Payment Declined"
        default:
          return ""
      } 
    },
    songAllowed(song) { return song.payment && song.payment.paymentStatus == 'success' },
    songClicked(song) {
      console.log("songClicked", song)
      let playableIndex = this.songsPlayable.indexOf(song)
      if (this.songAllowed(song)) this.playList(playableIndex)
    },
    playList (trackNumber) {
      this.$store.dispatch("audioplayer/clearPlaylist").then(() => {
        const songList = this.songsPlayable;
        const actionList = songList.map(song => this.$store.dispatch("audioplayer/appendPlaylist", { songID: song.id }))
        return Promise.all(actionList).then((values) => {
          this.$store.commit('audioplayer/setPlayingIndex', trackNumber)
          this.$store.commit('audioplayer/setPlaylistPage', this.$route.path)
          this.$store.dispatch('audioplayer/setIsPlaying', true)
        });
      })
    },
  },
  mounted() {
    if (this.isLoggedIn != "") this.$store.dispatch("cache/songs/getAllFromAPI")
    if (this.isLoggedIn != "") this.$store.dispatch("cache/payments/getAllFromAPI")
  }
}
</script>
