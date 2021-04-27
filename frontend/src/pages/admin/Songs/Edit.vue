<template lang="pug">
q-page(padding)
  q-card(flat bordered)
    q-card-section
      .q-gutter-y-md
        .text-h5 Edit song
        q-input(filled v-model="file" label="File")
        q-input(filled v-model="name" label="Name")
        q-input(filled v-model="songArtist" label="Song Artist")
        q-input(filled v-model="album" label="Album")
        q-input(filled v-model="trackNumber" label="Track Number")
        q-field(filled label="Explorable" stack-label)
          q-toggle(:label="explorable?'On':'Off'" v-model="explorable")
        q-input(filled v-model="duration" label="Duration")
        //- q-input(filled v-model="releaseDate" label="Release Date" mask="date" :rules="['date']")
        //-   template(v-slot:append)
        //-     q-icon(name="event" class="cursor-pointer")
        //-       q-popup-proxy(ref="qDateProxy" transition-show="scale" transition-hide="scale")
        //-         q-date(v-model="releaseDate" mask="YYYY/MM/DD")
        //-           div(class="row items-center justify-end")
        //-             q-btn(v-close-popup label="Close" color="primary" flat)
        //- q-input(filled v-model="songArt" label="Song Art")
        //- .row
        //-   q-input.col.q-pr-xs( v-model.number="price" label="Price" type="number" filled :step="0.01" :max-decimals="2" :min="0")
        //-   q-select.col-sm-auto(filled v-model="currency" :options="currencyOptions" emit-value map-options label="Currency" style="width:120px")
    q-card-actions(align="right")
      q-btn(flat color="red" icon="delete" padding="xs md") Delete
      q-btn(:disabled="!savable" color="primary" icon="save" padding="xs md") Save
</template>

<script>
export default {
  name: 'PageAdminSongsCreate',
  data () {
    return {
      changedStore: {}
    }
  },
  computed: {
    id () { return this.$route.params.id },
    oldStore () { return this.$store.getters['cache/songs/getObject'](this.id) },

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
  },
  mounted () {
    this.$store.dispatch('cache/songs/getAllFromAPI')
  }
}
</script>
