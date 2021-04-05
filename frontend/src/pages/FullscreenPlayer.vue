<template lang="pug">
  q-layout(view="lHh Lpr lFf")
    q-page-container
      q-page.bg-grey

</template>

<script>

import PlaylistItem from "../components/PlaylistItem";

export default {
  name: 'FullscreenPlayer',
  components: {
    PlaylistItem
  },
  data () {
    return {
      progress: 0
    }
  },
  computed: {
    isPlaying() { return this.$store.getters["audioplayer/getIsPlaying"] },
    playlist() { return this.$store.getters["audioplayer/getPlaylist"] },
    playlistData() { return this.$store.getters["audioplayer/getPlaylistData"] },
    currentSongData() { return this.$store.getters["audioplayer/getCurrentSong"] },
    albumArt() { return this.$store.getters["audioplayer/getMetaAlbumArt"] },
    parsedAlbumArt() { return this.$store.getters['system/getMediaURL'](this.albumArt) },
    artist() { return this.$store.getters["audioplayer/getMetaArtist"] },
    album() { return this.$store.getters["audioplayer/getMetaAlbum"] },
    title() { return this.$store.getters["audioplayer/getMetaTitle"] },
    trackNumber() { return this.$store.getters["audioplayer/getMetaTrackNumber"] },
    hasAlbumArt() {
      let returnable = false
      if (typeof this.albumArt === "undefined") returnable = false
      else returnable = this.albumArt !== ""
      return returnable
      },
    hasTrackNumber() { return this.trackNumber > 0 }
  },
  methods: {
    rewindClicked() {
      this.$store.dispatch("audioplayer/goBack")
    },
    forwardClick() {
      this.$store.dispatch("audioplayer/goNext")
    },
    playClicked() {
      this.$store.dispatch("audioplayer/toggleIsPlaying")
    },
    openPlaylist() {
      this.$store.dispatch("audioplayer/collectSongInfo")
    }
  },
  mounted() {
    this.$store.dispatch('cache/songs/getFromAPI', { id: this.$store.getters["audioplayer/getSongID"]() })
    setInterval(() => {
      this.progress = this.$howlerPlayer.progress / 100
    }, 100)
  }
}
</script>
