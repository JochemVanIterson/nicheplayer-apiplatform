<template lang="pug">
q-page(padding)
  q-card(flat bordered)
    q-card-section
      .q-gutter-y-md
        .text-h5 Initialize NFC Tag
        q-select(
          label="Album"
          filled
          v-model="album"
          :options="albums"
          option-value="@id"
          :option-label="(item) => `${item.artist} - ${item.name}`"
          emit-value
          map-options
          @filter="filterAlbums")
        q-field(filled label="Single card or range" stack-label)
          q-toggle(:label="range?'Range':'Card'" v-model="range")
        q-input(v-if="!range" filled v-model="cardUID" label="Card UID" mask="XX:XX:XX:XX:XX:XX:XX" fill-mask unmasked-value)
        q-input(v-if="range" filled v-model="rangeMin" label="Minimum bounds" mask="XX:XX:XX:XX:XX:XX:XX" fill-mask unmasked-value)
        q-input(v-if="range" filled v-model="rangeMax" label="Maximum bounds" mask="XX:XX:XX:XX:XX:XX:XX" fill-mask unmasked-value)
        q-field(filled label="Blocked" stack-label)
          q-toggle(:label="blocked?'On':'Off'" v-model="blocked")
    q-card-actions(align="right")
      q-btn(:disabled="!savable" color="primary" icon="save" padding="xs md" @click="saveAction") Save
</template>

<script>
import MediaField from 'components/MediaField'

export default {
  name: 'PageAdminAlbumsCreate',
  components: {
    MediaField
  },
  data () {
    return {
      newStore: {
        album: undefined,
        range: true,
        cardUID: '',
        rangeMin: '',
        rangeMax: '',
        users: [],
        blocked: false
      }
    }
  },
  computed: {
    albums () { return this.$store.getters['cache/albums/getAll'] },

    album: {
      get () { return this.newStore.album },
      set (val) { this.$set(this.newStore, 'album', val) }
    },
    range: {
      get () { return this.newStore.range },
      set (val) { this.$set(this.newStore, 'range', val) }
    },
    cardUID: {
      get () { return this.newStore.cardUID },
      set (val) { this.$set(this.newStore, 'cardUID', val) }
    },
    rangeMin: {
      get () { return this.newStore.rangeMin },
      set (val) { this.$set(this.newStore, 'rangeMin', val) }
    },
    rangeMax: {
      get () { return this.newStore.boundsMax },
      set (val) { this.$set(this.newStore, 'rangeMax', val) }
    },
    cardUsers: {
      get () { return this.newStore.users },
      set (val) { this.$set(this.newStore, 'users', val) }
    },
    blocked: {
      get () { return this.newStore.blocked },
      set (val) { this.$set(this.newStore, 'blocked', val) }
    },

    savable () { return this.username !== '' && this.email !== '' && this.firstname !== '' && this.lastname !== '' && this.password !== '' }
  },
  methods: {
    filterAlbums (val, update, abort) {
      this.$store.dispatch('cache/albums/getAllFromAPI').then(() => {
        update()
      })
    },
    saveAction () {
      this.$store.dispatch('cache/nfc/insertAPI', this.newStore).then((res) => {
        this.$router.go(-1)
      })
    }
  },
  mounted () {
  }
}
</script>
