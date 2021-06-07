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
                //- q-card-section
                //-   .text Card: {{cardUID}}
                q-card-actions(vertical)
                  q-btn(label="Connect" noCaps color="primary" @click="connectNFC")
              div(v-else-if="isLoggedIn && hasPurchased")
                q-card-actions(vertical)
                  q-btn(label="Open" noCaps color="primary" @click="openNFC")
              div(v-else)
                q-card-section
                  q-banner(dense inline-actions rounded class="bg-primary text-white") Log in to connect the card
                    template(v-slot:action)
                      q-btn(dense flat label="Register" noCaps color="white" to="/register")
                      q-btn(dense flat label="Login" noCaps color="white" :to="{ path: '/login', query: { to: $route.fullPath } }")

        q-toolbar.text-white.fixed-top#toolbar
          q-toolbar-title.cursor-pointer(@click="$router.replace('/explore')") NichePlayer

</template>

<script>
import _ from 'lodash'
export default {
  name: 'NfcPage',
  data () {
    return {
      nfcPayload: {
        album: -1,
        uid: ''
      }
    }
  },
  computed: {
    isLoggedIn () { return this.$store.getters['system/isLoggedIn'] },

    key () { return this.$route.query.key },

    albumID () { return this.nfcPayload.album },
    cardUID () { return this.nfcPayload.uid },

    paymentObject () { return this.$store.getters['cache/payments/getObjectByAlbum'](this.albumID) },
    paymentStatus  () { return (this.paymentObject) ? this.paymentObject.paymentStatus : 'unknown' },

    userData () { return this.isLoggedIn ? this.$store.getters['system/userData'] : { id: -1 } },

    nfcData () { return this.$store.getters['cache/nfc/getObjectJoined']({ album: `/api/albums/${this.albumID}`, users: `/api/users/${this.userData.id}` }) },

    hasPurchased () { return this.paymentStatus === 'success' || !_.isEmpty(this.nfcData) },

    albumData () { return this.$store.getters['cache/albums/getObjectJoined'](this.albumID, ['albumArt']) },
    albumArt () {
      if (!this.albumData || !this.albumData.albumArt) return undefined
      return this.albumData.albumArt.contentUrl
    },
    albumArtist () { return this.albumData ? this.albumData.artist : '' },
    albumName () { return this.albumData ? this.albumData.name : '' }
  },
  watch: {
    paymentObject (val) { console.log('paymentObject', val) },
    nfcData (val) { console.log('nfcData', val) }
  },
  methods: {
    decryptPayload () {
      this.$axios({
        method: 'post',
        url: 'https://np.audioware.nl/api/decrypt',
        data: { key: this.key }
      }).then(({ data }) => {
        this.nfcPayload = data
        this.$store.dispatch('cache/albums/getFromAPI', { id: data.album, joinFields: ['albumArt'], nojwt: true })
        this.$store.dispatch('cache/payments/getFromAPIByAlbum', { album: data.album, joinFields: [], nojwt: true })
        this.$store.dispatch('cache/nfc/getFromAPIByUID', { uid: data.uid, joinFields: ['album'], nojwt: true })
        
        console.log(data)
      })
    },
    openNFC () {
      this.$store.dispatch('system/apiRequest', { path: 'nfc_scan', payload: this.nfcPayload, method: 'POST' }).then((res) => {
        this.$router.replace(`/my/album/${res.album.replace('/api/albums/', '')}`)
      })
    },
    connectNFC () {
      this.$store.dispatch('system/apiRequest', { path: 'nfc_scan', payload: this.nfcPayload, method: 'POST' }).then((res) => {
        this.$router.replace(`/my/album/${res.album.replace('/api/albums/', '')}`)
      })
    }
  },
  mounted () {
    this.decryptPayload()
    console.log('paymentObject', this.paymentObject)
    console.log('nfcData', this.nfcData)
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
