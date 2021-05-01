<template lang="pug">
q-page(padding)
  q-card(flat bordered)
    q-card-section
      .q-gutter-y-md
        .text-h5 Edit song
        .row.items-center
          MediaField.col(v-model="file" type="Audio" filled stack-label label="File")
          .col-auto
            q-btn.q-ml-sm(color="primary" label="Get From Metadata" no-caps @click="loadFromMetadata")
        q-input(filled v-model="name" label="Name")
        q-input(filled v-model="songArtist" label="Song Artist")
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
        q-input(filled v-model="trackNumber" label="Track Number")
        q-field(filled label="Explorable" stack-label)
          q-toggle(:label="explorable?'On':'Off'" v-model="explorable")
        q-input(filled v-model="duration" label="Duration")
    q-card-actions(align="right")
      q-btn(flat color="red" icon="delete" padding="xs md" @click="deleteAction") Delete
      q-btn(:disabled="!savable" color="primary" icon="save" padding="xs md" @click="saveAction") Save
</template>

<script>
import _ from 'lodash'
import MediaField from 'components/MediaField'

export default {
  name: 'PageAdminSongsCreate',
  components: {
    MediaField
  },
  data () {
    return {
      changedStore: {}
    }
  },
  computed: {
    id () { return this.$route.params.id },

    oldStore () { return this.$store.getters['cache/songs/getObject'](this.id) },

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
    file: {
      get () { return this.changedStore.file === undefined ? this.oldStore.file : this.changedStore.file },
      set (val) { this.$set(this.changedStore, 'file', val) }
    },
    songArtist: {
      get () { return this.changedStore.songArtist === undefined ? this.oldStore.songArtist : this.changedStore.songArtist },
      set (val) { this.$set(this.changedStore, 'songArtist', val) }
    },
    album: {
      get () { return this.changedStore.album === undefined ? this.oldStore.album : this.changedStore.album },
      set (val) { this.$set(this.changedStore, 'album', val) }
    },
    trackNumber: {
      get () { return this.changedStore.trackNumber === undefined ? this.oldStore.trackNumber : this.changedStore.trackNumber },
      set (val) { this.$set(this.changedStore, 'trackNumber', val) }
    },
    explorable: {
      get () { return this.changedStore.explorable === undefined ? this.oldStore.explorable : this.changedStore.explorable },
      set (val) { this.$set(this.changedStore, 'explorable', val) }
    },
    duration: {
      get () { return this.changedStore.duration === undefined ? this.oldStore.duration : this.changedStore.duration },
      set (val) { this.$set(this.changedStore, 'duration', val) }
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
      this.$set(this, 'songArtist', currentFile.meta.artist)
      this.$set(this, 'trackNumber', parseInt(currentFile.meta.track))
      this.$set(this, 'duration', parseFloat(currentFile.meta.duration))
      this.$store.dispatch('cache/albums/getAllFromAPI').then((albums) => {
        for (const album of albums) {
          if (album.name.toUpperCase() === currentFile.meta.album.toUpperCase()) {
            this.$set(this, 'album', album['@id'])
            continue
          }
        }
      })
    },
    saveAction () {
      const newStore = {}
      _.merge(newStore, this.oldStore, this.changedStore)
      this.$store.dispatch('cache/songs/updateAPI', { id: this.id, payload: newStore }).then((res) => {
        console.log(res)
        this.$router.go(-1)
      })
    },
    deleteAction () {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Would you like to delete this user',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$store.dispatch('cache/songs/deleteAPI', this.id).then((res) => {
          console.log(res)
          this.$router.replace('/admin/songs')
        })
      })
    }
  },
  mounted () {
    this.$store.dispatch('cache/songs/getFromAPI', { id: this.id, follow: true })
  }
}
</script>
