<template lang="pug">
q-page(padding)
  q-card(flat bordered)
    q-card-section
      .q-gutter-y-md
        .text-h5 Edit source
        q-input(filled v-model="name" label="Name")
        q-input(filled v-model="type" label="Type")
        q-input(filled v-model="config" label="Config")
    q-card-actions(align="right")
      q-btn(flat color="red" icon="delete" padding="xs md") Delete
      q-btn(:disabled="!savable" color="primary" icon="save" padding="xs md") Save
</template>

<script>
export default {
  name: 'PageAdminSourcesCreate',
  data () {
    return {
      changedStore: {}
    }
  },
  computed: {
    id () { return this.$route.params.id },

    oldStore () { return this.$store.getters['cache/sources/getObject'](this.id) },

    albums () { return this.$store.getters['cache/albums/getAll'] },

    files () {
      return this.$store.getters['cache/mediaObjects/getAll'].filter((e) => {
        return e.type === 'audio'
      })
    },

    name: {
      get () { return this.changedStore.name === undefined ? this.oldStore.name : this.changedStore.name },
      set (val) { this.$set(this.changedStore, 'name', val) }
    },
    type: {
      get () { return this.changedStore.type === undefined ? this.oldStore.type : this.changedStore.type },
      set (val) { this.$set(this.changedStore, 'type', val) }
    },
    config: {
      get () { return this.changedStore.config === undefined ? this.oldStore.config : this.changedStore.config },
      set (val) { this.$set(this.changedStore, 'config', val) }
    },

    savable () { return Object.keys(this.changedStore).length > 0 }
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
    this.$store.dispatch('cache/sources/getFromAPI', { id: this.id, follow: true })
  }
}
</script>
