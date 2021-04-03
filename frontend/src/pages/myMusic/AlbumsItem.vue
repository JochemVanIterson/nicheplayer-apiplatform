<template lang="pug">
  q-page.bg-grey-4(padding)
    .row.q-col-gutter-md.q-pb-md
      .col-xs-12.col-sm-4.flex
        q-img.rounded-borders(:src="albumArt" basic)
      
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
            td(class="text-left") {{song.name}}
            td(class="text-left") {{song.songArtistt || albumData.artist}}
            td(class="text-left" v-if="$q.screen.gt.xs") {{`${song.duration}`}}
</template>

<script>
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
  },
  watch: {
    isLoggedIn(value) {
      if (value != "") {
        this.$store.dispatch("cache/albums/getFromAPI", { id: this.albumID, joinFields: ['albumArt', 'songs'], force: true })
      }
    }
  },
  methods: {
    rowClicked (index) {
      this.playAlbum(index)
    },
    playAlbum (trackNumber = 0) {
      this.$store.dispatch("audioplayer/clearPlaylist").then(() => {
        const songList = this.songsSorted;
        const actionList = songList.map(song => this.$store.dispatch("audioplayer/appendPlaylist", { songID: song.id }))
        return Promise.all(actionList).then((values) => {
          this.$store.commit('audioplayer/setPlayingIndex', trackNumber)
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