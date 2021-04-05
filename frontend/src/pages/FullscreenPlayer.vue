<template lang="pug">
  q-layout.bg-grey-4(view="lHh Lpr lFf")
    q-header.bg-transparent
      q-toolbar.text-white#toolbar
        q-btn(stretch flat label="Back" icon="arrow_back" @click="$router.go(-1)" no-caps)
        q-toolbar-title
        q-btn(flat @click="drawerRight = !drawerRight" round dense icon="menu")


    q-drawer(
      side="right"
      v-model="drawerRight"
      show-if-above
      bordered
      :width="250"
      :breakpoint="600")
      q-scroll-area(class="fit")
        q-list
          q-item-label(header) Playlist
          PlaylistItem(v-for="(song, index) in playlistData" :index="index" :songdata="song" noimage)
          q-item(v-if="playlistData.length == 0")
            q-item-section Empty

    q-page-container
      q-page.flex.justify-center(padding)
        .column(style="max-width:600px; width:100%;")
          .col.flex.flex-center
            //- q-responsive.col(:ratio="1")
            //-   div(class="rounded-borders bg-primary text-white flex flex-center")
            //-     | Ratio 1:1
            q-img.col.rounded-borders.shadow-1.q-mx-sm-xl.q-mx-md(:src="parsedAlbumArt" :ratio="1" )
              template(v-slot:error)
                div(class="absolute-full flex flex-center bg-grey text-white")
                  q-icon(size="100px" name="music_note")
          q-card.q-mt-md
            .q-px-md
              q-slider(v-model="progress" :min="0" :max="1")
            q-card-section.row.justify-center
              .q-gutter-x-sm.q-gutter-sm-x-lg
                q-btn(size="md" round outline dense icon="fast_rewind" @click="rewindClicked")
                q-btn(size="lg" round outline :icon="isPlaying?'pause':'play_arrow'" @click="playClicked")
                q-btn(size="md" round outline dense icon="fast_forward" @click="forwardClick")

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
      progress: 0,
      drawerRight: false
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

<style lang="scss" scoped>
  #toolbar {
    background-color: #000000A0;
  }
  #homeCard {
    width: 100%;
    max-width: 400px;
    color: white;
    background-color: #222222A0;
  }
</style>