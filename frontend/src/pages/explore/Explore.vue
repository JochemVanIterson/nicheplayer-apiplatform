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
export default {
  name: 'Explore',
  data() {
    return {}
  },
  computed: {
    isLoggedIn() { return this.$store.getters["system/isLoggedIn"] },
    albums() { return this.$store.getters["cache/albums/getAllJoined"] }
  },
  watch: {
    isLoggedIn(value) {
      if (value != "") this.$store.dispatch("cache/albums/getAllFromAPI")
    }
  },
  methods: {
    parsedURL(value) {
      if (value && value.contentUrl) return this.$store.getters['system/getMediaURL'](value.contentUrl)
      else return ""
    },
    albumClicked(data) {
      this.$router.push(`/explore/album/${data.id}`)
    }
  },
  mounted() {
    if (this.isLoggedIn != "") this.$store.dispatch("cache/albums/getAllFromAPI")
  }
}
</script>
