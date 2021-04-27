<template lang="pug">
q-page(padding)
  q-card(flat bordered)
    q-card-section
      .q-gutter-y-md
        .text-h5 New source
        q-input(filled v-model="name" label="Name")
        q-input(filled v-model="type" label="Type")
        q-input(filled v-model="config" label="Config")
    q-card-actions(align="right")
      q-btn(:disabled="!savable" color="primary" icon="save" padding="xs md") Save
</template>

<script>
export default {
  name: 'PageAdminSourcesCreate',
  data () {
    return {
      isPwd: true,
      currencyOptions: [
        {
          label: 'Euro (€)',
          value: 'euro'
        },
        {
          label: 'Dollar ($)',
          value: 'dollar'
        }
      ],
      newStore: {
        name: '',
        type: '',
        config: {}
      }
    }
  },
  computed: {
    name: {
      get () { return this.newStore.name },
      set (val) { this.$set(this.newStore, 'name', val) }
    },
    type: {
      get () { return this.newStore.type },
      set (val) { this.$set(this.newStore, 'type', val) }
    },
    config: {
      get () { return this.newStore.config },
      set (val) { this.$set(this.newStore, 'config', val) }
    },

    savable () { return this.name !== '' && this.file !== '' && this.album !== '' }
  },
  methods: {
    filterAlbums (val, update, abort) {
      this.$store.dispatch('cache/albums/getAllFromAPI').then(() => {
        update()
      })
    },
    filterFiles (val, update, abort) {
      this.$store.dispatch('cache/mediaObjects/getAllFromAPI').then(() => {
        update()
      })
    },
    loadFromMetadata () {
      const currentFile = this.files.filter((e) => e['@id'] === this.file)[0]
      this.$set(this, 'name', currentFile.meta.title)
      this.$set(this, 'sourceArtist', currentFile.meta.artist)
      this.$set(this, 'trackNumber', currentFile.meta.track)
      this.$set(this, 'duration', currentFile.meta.duration)
    }
  },
  mounted () {
  }
}
</script>
