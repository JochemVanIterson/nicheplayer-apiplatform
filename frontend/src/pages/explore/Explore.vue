<template lang="pug">
  q-page()
    .q-px-md.q-pt-md
      .text-h2.q-pb-md Explore
      .text-h4.q-pb-md Albums
    q-scroll-area( horizontal style="height:248px" class="bg-grey-4 inset-shadow ")
      .row.no-wrap.q-gutter-lg.q-pa-lg
        q-card.shadow-10.cursor-pointer(v-for="album in albums" v-if="album" :key="album.id" style="width: 200px;" @click="albumClicked(album)")
          q-img( :src="parsedURL(album.albumArt)" basic :ratio="1")
            .absolute-bottom
              .text-subtitle2.text-center {{album.name}}
              .text-subtitle.text-center {{album.artist}}
</template>

<script>
import { MEDIAPOINT } from "../../config/1314272676_entrypoint";

export default {
  name: 'Explore',
  data() {
    return {}
  },
  computed: {
    albums() { return this.$store.getters["cache/albums/getAllJoined"] }
  },
  methods: {
    parsedURL(value) {
      if (value && value.contentUrl) return `${MEDIAPOINT}/${value.contentUrl}`
      else return ""
    },
    albumClicked(data) {
      console.log("albumClicked", data)
      this.$router.push(`/explore/album/${data.id}`)
    }
  },
  mounted() {
    this.$store.dispatch("cache/albums/getAllFromAPI")
  }
}
</script>
