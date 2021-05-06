<template lang="pug">
q-layout(view="lHh Lpr lFf")
    q-page-container
      q-page
        q-img.bg-grey-4.window-height(src="background_image.jpg")
          div(class="absolute-full text-subtitle2 flex flex-center bg-transparent")
            q-card#homeCard(dark)
              .row.q-ma-md.justify-center
                q-avatar.shadow-1(size="96px" color="white" text-color="primary" icon="nfc")
              .q-px-xl
                q-img(:ratio="1" :src="albumArt")
              q-card-section
                .text-h6 {{albumArtist}}
                .text-h6 {{albumName}}
              q-separator(dark)
              div(v-if="isLoggedIn && !hasPurchased")
                q-card-section
                  .text Card: {{cardUID}}
                q-card-actions(vertical)
                  q-btn(label="Connect" noCaps color="primary" :to="`/my/album/${this.albumID}`")
              div(v-else-if="isLoggedIn && hasPurchased")
                q-card-actions(vertical)
                  q-btn(label="Open" noCaps color="primary" :to="`/my/album/${this.albumID}`")
              div(v-else)
                q-card-section
                  q-banner(dense inline-actions rounded class="bg-primary text-white") Log in to connect the card
                    template(v-slot:action)
                      q-btn(dense flat label="Register" noCaps color="white" to="/register")
                      q-btn(dense flat label="Login" noCaps color="white" :to="{ path: '/login', query: { to: $route.fullPath } }")

        q-toolbar.text-white.fixed-top#toolbar
          q-toolbar-title NichePlayer

</template>

<script>
export default {
  name: 'NfcPage',
  data () {
    return {
    }
  },
  computed: {
    isLoggedIn () { return this.$store.getters['system/isLoggedIn'] },
    albumID () { return this.$route.params.album },
    cardUID () { return this.$route.query.uid },

    paymentObject () { return this.$store.getters['cache/payments/getObjectByAlbum'](this.albumID) },
    paymentStatus  () { return (this.paymentObject) ? this.paymentObject.paymentStatus : 'unknown' },
    hasPurchased () { return this.paymentStatus === 'success' },

    albumData () { return this.$store.getters['cache/albums/getObjectJoined'](this.albumID, ['albumArt']) },
    albumArt () {
      if (!this.albumData || !this.albumData.albumArt) return undefined
      return this.albumData.albumArt.contentUrl
    },
    albumArtist () { return this.albumData ? this.albumData.artist : '' },
    albumName () { return this.albumData ? this.albumData.name : '' }
  },
  methods: {},
  mounted () {
    this.$store.dispatch('cache/albums/getFromAPI', { id: this.albumID, joinFields: ['albumArt'], nojwt: true })
    this.$store.dispatch('cache/payments/getFromAPIByAlbum', { album: this.albumID, joinFields: [], nojwt: true })
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
    background-color: #222222A0;
    backdrop-filter: blur(8px);
  }
</style>
