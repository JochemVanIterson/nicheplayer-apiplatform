<template lang="pug">
  q-page()
    .q-px-md.q-pt-md
      .text-h2.q-pb-md Explore
      .text-h4.q-pb-md Albums
    q-scroll-area( horizontal style="height:248px" class="bg-grey-4 inset-shadow ")
      .row.no-wrap.q-gutter-lg.q-pa-lg
        q-card.shadow-10.cursor-pointer(v-for="album in albums" :key="album.id" style="width: 200px;" @click="albumClicked(album)")
          q-img( :src="parsedURL(album.albumArt)" basic :ratio="1")
            .absolute-bottom
              .text-subtitle2.text-center {{album.title}}
              .text-subtitle.text-center {{album.artist}}

</template>

<script>
import { MEDIAPOINT } from "../../config/1314272676_entrypoint";

export default {
  name: 'Explore',
  data() {
    return {
      albums: [
        {
          id: 1,
          artist: "Arctic Monkeys",
          title: "AM",
          albumArt: "/media/604e4353d798d__AM__(Arctic_Monkeys).jpg"
        },
        {
          id: 2,
          artist: "Jochem van Iterson",
          title: "Test album",
          albumArt: "/media/6049042b2a949_Jochem-1.jpg"
        }
      ]
    }
  },
  computed: {

  },
  methods: {
    parsedURL(value) { return `${MEDIAPOINT}/${value}` },
    albumClicked(data) {
      console.log("albumClicked", data)
      this.$router.push(`/explore/album/${data.id}`)
    }
  }
}
</script>
