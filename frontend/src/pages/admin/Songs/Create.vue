<template lang="pug">
q-page(padding)
  q-card(flat bordered)
    q-card-section
      .q-gutter-y-md
        .text-h5 New song
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
      q-btn(:disabled="!savable" color="primary" icon="save" padding="xs md" @click="saveAction") Save
</template>

<script>
import MediaField from 'components/MediaField'

export default {
  name: 'PageAdminSongsCreate',
  components: {
    MediaField
  },
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
        file: '',
        songArtist: null,
        album: null,
        trackNumber: 0,
        explorable: false,
        duration: 0.0
      }
    }
  },
  computed: {
    albums () { return this.$store.getters['cache/albums/getAll'] },

    files () {
      return this.$store.getters['cache/mediaObjects/getAll'].filter((e) => {
        return e.type === 'audio'
      })
    },

    name: {
      get () { return this.newStore.name },
      set (val) { this.$set(this.newStore, 'name', val) }
    },
    file: {
      get () { return this.newStore.file },
      set (val) { this.$set(this.newStore, 'file', val) }
    },
    songArtist: {
      get () { return this.newStore.songArtist },
      set (val) { this.$set(this.newStore, 'songArtist', val) }
    },
    album: {
      get () { return this.newStore.album },
      set (val) { this.$set(this.newStore, 'album', val) }
    },
    trackNumber: {
      get () { return this.newStore.trackNumber },
      set (val) { this.$set(this.newStore, 'trackNumber', val) }
    },
    explorable: {
      get () { return this.newStore.explorable },
      set (val) { this.$set(this.newStore, 'explorable', val) }
    },
    duration: {
      get () { return this.newStore.duration },
      set (val) { this.$set(this.newStore, 'duration', val) }
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
      this.$store.dispatch('cache/songs/insertAPI', this.newStore).then((res) => {
        this.$router.go(-1)
      })
    }
  },
  mounted () {
  }
}
</script>
