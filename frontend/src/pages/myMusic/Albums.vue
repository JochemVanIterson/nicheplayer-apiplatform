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
import _ from 'lodash'
export default {
  name: 'MyAlbums',
  computed: {
    payments () { return this.$store.getters['cache/payments/getAllJoined'] },
    filteredAlbums () {
      return this.payments.filter((e) => {
        return e.album !== 'collecting'
      }).map((e) => {
        let album = _.clone(e.album)
        if (album && album !== 'collecting') album.payment = e
        return album
      }).sort((a, b) => {
        if (!a.payment || !b.payment) return 0
        // Sort success payments on top
        if (a.payment.paymentStatus !== 'success' && b.payment.paymentStatus === 'success') return 1
        if (a.payment.paymentStatus === 'success' && b.payment.paymentStatus !== 'success') return -1
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
    albumAllowed (album) { return album.payment && album.payment.paymentStatus === 'success' },
    albumClicked (album) { if (this.albumAllowed(album)) this.$router.push(`/my/album/${album.id}`) }
  },
  mounted () {
    if (this.isLoggedIn !== '') this.$store.dispatch('cache/payments/getAllFromAPIByUser')
  }
}
</script>
