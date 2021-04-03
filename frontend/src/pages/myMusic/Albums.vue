<template lang="pug">
  q-page(padding)
    .text-h2.q-pb-lg My Albums
    q-list(bordered separator class="rounded-borders")
      q-item(v-for="album in albums" v-if="album" clickable :to="'/my/album/'+album.id")
        q-item-section(top avatar)
          q-avatar(rounded size="64px")
            q-img( :src="parsedURL(album.albumArt)" basic :ratio="1")
        q-item-section
          q-item-label {{album.name}}
          q-item-label(caption lines="2") {{album.artist}}

</template>

<script>
export default {
  name: 'MyAlbums',
  computed: {
    albums() { return this.$store.getters["cache/albums/getAllJoined"] }
  },
  methods: {
    parsedURL(value) {
      if (value && value.contentUrl) return this.$store.getters['system/getMediaURL'](value.contentUrl)
      else return ""
    },
  },
  mounted() {
    if (this.isLoggedIn != "") this.$store.dispatch("cache/albums/getAllFromAPI")
  }
}
</script>
