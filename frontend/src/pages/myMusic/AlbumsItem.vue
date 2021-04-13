<template lang="pug">
  q-page.bg-grey-4(padding)
    .row.q-col-gutter-md.q-pb-md
      .col-xs-12.col-sm-4.flex
        q-img.rounded-borders.shadow-2(:src="albumArt" basic)
      
      .col-xs-12.col-sm-8.column
        q-card.col.row
          q-card-section.col.column.justify-center
            .text-h2.text-weight-normal {{ albumData.name }}
            .text-h4.text-weight-thin {{ albumData.artist }}

    q-card#albumTracks
      .row.justify-between.q-px-md.q-pt-md
        .text-h5 Tracks
        q-btn(
            color="primary"
            label="Play album"
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
          tr(v-for="(song, i) in songsSorted" @click="rowClicked(i)")
            td(class="text-right") {{song.trackNumber}}
            td(class="text-left")
              q-icon.q-pr-sm(name="volume_up" color="primary" size="sm" v-if="currentPlayingId == song.id")
              span {{song.name}}
            td(class="text-left") {{song.songArtistt || albumData.artist}}
            td(class="text-left" v-if="$q.screen.gt.xs") {{`${prettyDate(song.duration)}`}}
</template>

<script>
import { date } from 'quasar'
export default {
  name: 'MyAlbumItem',
  data() {
    return {
      paymentObject: {
        status: 'unknown'
      }
    }
  },
  computed: {
    isLoggedIn() { return this.$store.getters["system/isLoggedIn"] },

    albumID() { return this.$route.params.id },
    albumData() { return this.$store.getters['cache/albums/getObjectJoined'](this.albumID, ['albumArt', 'songs']) },

    albumArt() {
      return (this.albumData && this.albumData.albumArt && this.albumData.albumArt.contentUrl)
        ? this.$store.getters['system/getMediaURL'](this.albumData.albumArt.contentUrl) : ""
    },
    songs() { return (this.albumData && this.albumData.songs) ? this.albumData.songs : [] },
    songsSorted() { return this.songs.slice().sort((a, b) => a.trackNumber - b.trackNumber) },
    currentPlayingPage() { return this.$store.getters["audioplayer/getPlaylistPage"] },
    currentPlayingId() { return this.currentPlayingPage == this.$route.path && this.$store.getters["audioplayer/getSongID"]() }
  },
  watch: {
    isLoggedIn(value) {
      if (value != "") {
        this.$store.dispatch("cache/albums/getFromAPI", { id: this.albumID, joinFields: ['albumArt', 'songs'], force: true })
      }
    }
  },
  methods: {
    prettyDate (timestamp) {
      return date.formatDate(date.buildDate({ minutes: 0, seconds: timestamp }), 'mm:ss')
    },
    rowClicked (index) {
      this.playAlbum(index)
    },
    playAlbum (trackNumber = 0) {
      this.$store.dispatch("audioplayer/clearPlaylist").then(() => {
        const songList = this.songsSorted;
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
    if (this.isLoggedIn != "") {
      this.$store.dispatch("cache/albums/getFromAPI", { id: this.albumID, joinFields: ['albumArt', 'songs'], force: true })
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