<template lang="pug">
  q-page.bg-grey-4(padding)
    .q-gutter-y-lg
      q-card#albumMetaCard
        q-card-section(:horizontal="true")
          img.col-auto( :src="albumArt" basic :ratio="1" style="max-height:400px; height:100%; max-width: 45%")
          q-card-section.column.justify-center
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
            tr(v-for="(song, i) in songsSorted" @click="rowClicked(i)" :class="{'q-tr--no-hover':!song.explorable, 'disabled':!song.explorable}")
              td(class="text-right") {{song.trackNumber}}
              td(class="text-left") {{song.name}}
              td(class="text-left") {{song.songArtistt || albumData.artist}}
              td(class="text-left" v-if="$q.screen.gt.xs") {{`${song.duration}`}}
</template>

<script>
import { MEDIAPOINT } from '../../config/1314272676_entrypoint'

export default {
  name: 'ExploreAlbum',
  data() {
    return {
    }
  },
  computed: {
    albumID() { return this.$route.params.id },
    albumData() { return this.$store.getters['cache/albums/getObjectJoined'](this.albumID, ['albumArt', 'songs']) },

    albumArt() {
      if (this.albumData && this.albumData.albumArt && this.albumData.albumArt.contentUrl) return `${MEDIAPOINT}/${this.albumData.albumArt.contentUrl}`
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
      return this.songsSorted.filter((song) => song.explorable);
    }
  },
  methods: {
    rowClicked(index) {
      let explorableIndex = this.songsExplorable.indexOf(this.songsSorted[index])
      if (this.songsSorted[index].explorable) this.playAlbum(explorableIndex)
    },
    playAlbum(trackNumber = 0) {
      this.$store.dispatch("audioplayer/clearPlaylist").then(() => {
        const songList = this.songsExplorable;
        const actionList = songList.map(song => this.$store.dispatch("audioplayer/appendPlaylist", song.id))
        return Promise.all(actionList).then((values) => {
          this.$store.commit('audioplayer/setPlayingIndex', trackNumber)
          this.$store.dispatch('audioplayer/setIsPlaying', true)
          console.log(values);
        });
      })
    }
  },
  mounted() {
    this.$store.dispatch("cache/albums/getFromAPI", { id: this.albumID, joinFields: ['albumArt', 'songs'], force: true })
  }
}
</script>
<style lang="scss" scoped>

</style>