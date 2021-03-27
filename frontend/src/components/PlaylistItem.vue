<template lang="pug">
  q-item(clickable v-ripple v-close-popup @click="clicked")
    q-item-section(avatar)
      q-avatar(color="grey" rounded :icon="hasAlbumArt?undefined:'music_note'")
        img(v-if="hasAlbumArt" :src="parsedAlbumArt")
    q-item-section
      q-item-label
        span.q-pr-xs(v-if="hasTrackNumber") {{ trackNumber }}.
        span {{ title }}
      q-item-label(caption lines="2") {{ artist }} - {{ album }}
    q-item-section(side v-if="isPlayingSong")
      q-icon(name="volume_up" color="primary")
</template>

<script>
export default {
  name: 'PlaylistItem',
  props: {
    songdata: [Object, String],
    index: Number
  },
  data () {
    return {}
  },
  computed: {
    albumObject() {
      if (this.songdata.album) return this.songdata.album
      else return {}
    },
    albumArtObject() {
      if (this.albumObject.albumArt) return this.albumObject.albumArt
      else return {}
    },
    albumArt() { return this.albumArtObject.contentUrl },
    parsedAlbumArt() { return this.$store.getters['system/getMediaURL'](this.albumArt) },
    artist() { return this.albumObject.artist },
    album() { return this.albumObject.name },
    title() { return this.songdata.name },
    trackNumber() { return this.songdata.trackNumber },
    hasAlbumArt() { 
      let returnable = false
      if (typeof this.albumArt === "undefined") returnable = false
      else returnable = this.albumArt !== ""
      return returnable
    },
    hasTrackNumber() { return this.trackNumber > 0 },
    isPlayingSong() { return this.$store.getters["audioplayer/getPlayingIndex"] === this.index }
  },
  methods: {
    clicked() {
      this.$store.dispatch("audioplayer/goToSong", this.index);
    }
  }
}
</script>
