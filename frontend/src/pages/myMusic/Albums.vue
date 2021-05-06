<template lang="pug">
  q-page(padding)
    .text-h2.q-pb-lg My Albums
    q-list(bordered separator class="rounded-borders")
      q-item(v-for="album in filteredAlbums" v-if="album" :key="'album_'+album.id" :clickable="albumAllowed(album)" :disabled="!albumAllowed(album)" @click="albumClicked(album)")
        q-item-section(top avatar)
          q-avatar(rounded size="64px")
            q-img( :src="parsedURL(album.albumArt)" basic :ratio="1")
        q-item-section
          q-item-label {{album.name}}
          q-item-label(caption lines="2") {{album.artist}}
        q-item-section(side top)
          .q-gutter-xs
            span(v-if="!album.payment || album.payment.paymentStatus != 'success'") {{readableStatus(album)}}
            q-btn(v-else size="12px" flat dense round icon="more_vert" @click.stop="")
              q-menu()
                q-list(style="min-width: 100px")
                  q-item(clickable v-close-popup)
                    q-item-section Play album (placeholder)

</template>

<script>
// import _ from 'lodash'
export default {
  name: 'MyAlbums',
  computed: {
    albums () { return this.$store.getters['cache/albums/getAllJoined'] },

    payments () { return this.$store.getters['cache/payments/getAllJoined'] },
    paymentsAlbums () { return this.payments.filter((e) => !!e).map((e) => { return e.album ? e.album['@id'] : undefined }) },

    nfcCards () { return this.$store.getters['cache/nfc/getAllBy'] },
    nfcAlbums () { return this.nfcCards.map((e) => { return e.album }) },

    filteredAlbums () {
      return this.albums.filter((e) => {
        return this.nfcAlbums.includes(e['@id']) || this.paymentsAlbums.includes(e['@id'])
      }).map((e) => {
        if (e && e !== 'collecting') {
          e.payment = this.payments.filter((p) => p.album['@id'] === e['@id'])[0]
          e.hasNfcCard = this.nfcAlbums.includes(e['@id'])
        }
        return e
      }).sort((a, b) => {
        if (!a.payment || !b.payment || !a.hasNfcCard || !b.hasNfcCard) return 0
        // Sort success payments on top
        if (a.payment.paymentStatus !== 'success' && b.payment.paymentStatus === 'success') return 1
        if (a.payment.paymentStatus === 'success' && b.payment.paymentStatus !== 'success') return -1
        // Sort NFC cards bellow payments
        if (!a.hasNfcCard && b.hasNfcCard) return 1
        if (a.hasNfcCard && !b.hasNfcCard) return -1
        // else sort by name
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      })
    }
  },
  methods: {
    parsedURL (value) {
      return (value && value.contentUrl) ? this.$store.getters['system/getMediaURL'](value.contentUrl) : ''
    },
    readableStatus (album) {
      if (album.hasNfcCard) return 'NFC Card'
      if (!album.payment) return ''
      const status = album.payment.paymentStatus
      switch (status) {
        case 'in_progress':
          return 'Payment in progress'
        case 'requested':
          return 'Payment requested'
        case 'declined':
          return 'Payment Declined'
        default:
          return ''
      }
    },
    albumAllowed (album) { return album.hasNfcCard || (album.payment && album.payment.paymentStatus === 'success') },
    albumClicked (album) { if (this.albumAllowed(album)) this.$router.push(`/my/album/${album.id}`) }
  },
  mounted () {
    if (this.isLoggedIn !== '') {
      this.$store.dispatch('cache/albums/getAllFromAPI')
      this.$store.dispatch('cache/payments/getAllFromAPIByUser')
      this.$store.dispatch('cache/nfc/getAllFromAPIByUser', { joinFields: [] })
    }
  }
}
</script>
