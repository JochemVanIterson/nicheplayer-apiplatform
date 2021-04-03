<template lang="pug">
  q-page(padding)
    .text-h2.q-pb-lg My Songs
    q-list(bordered separator class="rounded-borders")
      q-item(v-for="song in songs" v-if="song" clickable)
        q-item-section(top avatar)
          q-avatar(rounded size="48px")
            q-img( :src="parsedURL(song.album.albumArt)" basic :ratio="1")
        q-item-section(side v-if="isPlayingSong(song)")
          q-icon(name="volume_up" color="primary")
        q-item-section
          q-item-label {{song.name}}
          q-item-label(caption lines="2") {{song.album.artist}}
        //- q-item-section {{ song }}

</template>

<script>
export default {
  name: 'MySongs',
  computed: {
    songs() { return this.$store.getters["cache/songs/getAllJoined"] }
  },
  methods: {
    parsedURL(value) {
      if (value && value.contentUrl) return this.$store.getters['system/getMediaURL'](value.contentUrl)
      else return ""
    },
    isPlayingSong(song) {
      return false // song.id == 2
    }
  },
  mounted() {
    if (this.isLoggedIn != "") this.$store.dispatch("cache/songs/getAllFromAPI")
  }
}
</script>
