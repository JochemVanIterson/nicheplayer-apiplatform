<template lang="pug">
  .flex(v-if="playlist.length > 0")
    q-linear-progress( :value="playbackProgress" color="secondary")
    q-toolbar
      .col-auto.row
        q-avatar(color="grey" rounded :icon="hasAlbumArt?undefined:'music_note'")
          img(v-if="hasAlbumArt" :src="parsedAlbumArt")
        .col.q-px-sm
          .text-weight-bold
            span.q-pr-xs(v-if="hasTrackNumber") {{trackNumber}}.
            span {{title}}
          .text-weight-light {{artist}}
        q-popup-proxy(@show="openPlaylist")
          q-card(style="min-width:250px")
            q-list
              q-item-label(header) Playlist
              PlaylistItem(v-for="(song, index) in playlistData" :index="index" :songdata="song")
              q-item(v-if="playlistData.length == 0")
                q-item-section Empty
      .col
      .col-auto.q-gutter-x-sm
        q-btn(round outline dense icon="fast_rewind" v-if="$q.screen.gt.xs" @click="rewindClicked")
        q-btn(round outline :icon="isPlaying?'pause':'play_arrow'" @click="playClicked")
        q-btn(round outline dense icon="fast_forward" @click="forwardClick")
</template>

<script>
import { ENTRYPOINT } from "../config/1314272676_entrypoint";
import PlaylistItem from "./PlaylistItem";

export default {
  name: 'AudioFooter',
  components: {
    PlaylistItem
  },
  data () {
    return {
    }
  },
  computed: {
    isPlaying() { return this.$store.getters["audioplayer/getIsPlaying"] },
    playlist() { return this.$store.getters["audioplayer/getPlaylist"] },
    playlistData() { return this.$store.getters["audioplayer/getPlaylistData"] },
    currentSongData() { return this.$store.getters["audioplayer/getCurrentSong"] },
    playbackProgress() { return this.$store.getters["audioplayer/getPlaybackProgress"] },
    albumArt() { return this.$store.getters["audioplayer/getMetaAlbumArt"] },
    parsedAlbumArt() { return `${ENTRYPOINT}/${this.albumArt}` },
    artist() { return this.$store.getters["audioplayer/getMetaArtist"] },
    album() { return this.$store.getters["audioplayer/getMetaAlbum"] },
    title() { return this.$store.getters["audioplayer/getMetaTitle"] },
    trackNumber() { return this.$store.getters["audioplayer/getMetaTrackNumber"] },
    hasAlbumArt() { return this.albumArt || this.albumArt !== "" },
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
    this.$store.dispatch('audioplayer/getSongFromAPI', this.$store.getters["audioplayer/getSongID"]())
  }
}
</script>
