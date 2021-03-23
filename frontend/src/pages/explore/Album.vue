<template lang="pug">
  q-page.bg-grey-4(padding)
    .q-gutter-y-lg
      q-card#albumMetaCard
        q-card-section(:horizontal="true")
          q-img.col-5( :src="albumArt" basic :ratio="1")
          q-card-section.column.justify-center
            .text-h2.text-weight-normal {{ albumData.name }}
            .text-h4.text-weight-thin {{ albumData.artist }}
      q-card#albumTracks
        q-table(
          title="Tracks"
          :data="songs"
          :columns="songsColumns"
          row-key="id"
          @row-click="rowClicked"
          :pagination="initialPagination" hide-pagination)
          template(v-slot:top-right)
            q-btn(
              color="primary"
              label="Play album"
              no-caps
              @click="playAlbum()")
</template>

<script>
import { MEDIAPOINT } from '../../config/1314272676_entrypoint'

export default {
  name: 'ExploreAlbum',
  data() {
    return {
      initialPagination: {
        sortBy: 'trackNumber',
        descending: false,
        page: 0,
        rowsPerPage: -1
      },
    }
  },
  computed: {
    songsColumns() {
      return [
        { name: 'trackNumber', align: 'right', label: 'Track', field: 'trackNumber', sortable: true, style: "width: 40px" },
        { name: 'name', align: 'left', label: 'Title', field: 'name', sortable: false },
        { name: 'songArtist', align: 'left', label: 'Artist', field: 'songArtist', sortable: false, format: val => `${val || this.albumData.artist}` },
        { name: 'duration', align: 'left', label: 'Duration', field: 'duration', sortable: false, format: val => `${val}` }
      ]
    },

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
  },
  methods: {
    rowClicked(evt, row, index) {
      this.playAlbum(index)
    },
    playAlbum(trackNumber = 0) {
      this.$store.dispatch("audioplayer/clearPlaylist").then(() => {
        const songList = this.songs.slice().sort((a, b) => a.trackNumber - b.trackNumber);
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