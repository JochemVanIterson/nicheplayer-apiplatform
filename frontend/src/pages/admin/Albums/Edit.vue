<template lang="pug">
q-page(padding)
  q-card(flat bordered)
    q-card-section
      .q-gutter-y-md
        .text-h5 Edit album
        q-input(filled v-model="name" label="Name")
        q-input(filled v-model="artist" label="Artist")
        q-input(filled v-model="releaseDate" label="Release Date" mask="date" :rules="['date']" hide-bottom-space)
          template(v-slot:append)
            q-icon(name="event" class="cursor-pointer")
              q-popup-proxy(ref="qDateProxy" transition-show="scale" transition-hide="scale")
                q-date(v-model="releaseDate" mask="YYYY/MM/DD")
                  div(class="row items-center justify-end")
                    q-btn(v-close-popup label="Close" color="primary" flat)
        MediaField(v-model="albumArt" type="Image" filled stack-label label="Album Art")
        .row
          q-input.col.q-pr-xs( v-model.number="price" label="Price" type="number" filled :step="0.01" :max-decimals="2" :min="0")
          q-select.col-sm-auto(filled v-model="currency" :options="currencyOptions" emit-value map-options label="Currency" style="width:120px")
    q-card-actions(align="right")
      q-btn(flat color="red" icon="delete" padding="xs md" @click="deleteAction") Delete
      q-btn(:disabled="!savable" color="primary" icon="save" padding="xs md" @click="saveAction") Save
</template>

<script>
import _ from 'lodash'
import MediaField from 'components/MediaField'

export default {
  name: 'PageAdminAlbumsCreate',
  components: {
    MediaField
  },
  data () {
    return {
      changedStore: {},
      currencyOptions: [
        {
          label: 'Euro (€)',
          value: 'euro'
        },
        {
          label: 'Dollar ($)',
          value: 'dollar'
        }
      ]
    }
  },
  computed: {
    id () { return this.$route.params.id },
    oldStore () { return this.$store.getters['cache/albums/getObjectJoined'](this.id) },

    files () {
      return this.$store.getters['cache/mediaObjects/getAll'].filter((e) => {
        return e.type === 'image'
      })
    },

    name: {
      get () { return this.changedStore.name === undefined ? this.oldStore.name : this.changedStore.name },
      set (val) { this.$set(this.changedStore, 'name', val) }
    },
    artist: {
      get () { return this.changedStore.artist === undefined ? this.oldStore.artist : this.changedStore.artist },
      set (val) { this.$set(this.changedStore, 'artist', val) }
    },
    releaseDate: {
      get () { return this.changedStore.releaseDate === undefined ? this.oldStore.releaseDate : this.changedStore.releaseDate },
      set (val) { this.$set(this.changedStore, 'releaseDate', val) }
    },
    albumArt: {
      get () { return this.changedStore.albumArt === undefined ? this.oldStore.albumArt['@id'] : this.changedStore.albumArt },
      set (val) { this.$set(this.changedStore, 'albumArt', val) }
    },
    price: {
      get () { return this.changedStore.price === undefined ? this.oldStore.price : this.changedStore.price },
      set (val) { this.$set(this.changedStore, 'price', val) }
    },
    currency: {
      get () { return this.changedStore.currency === undefined ? this.oldStore.currency : this.changedStore.currency },
      set (val) { this.$set(this.changedStore, 'currency', val) }
    },

    savable () { return Object.keys(this.changedStore).length > 0 }
  },
  methods: {
    filterFiles (val, update, abort) {
      this.$store.dispatch('cache/mediaObjects/getAllFromAPI').then(() => {
        update()
      })
    },
    saveAction () {
      const newStore = {}
      _.merge(newStore, this.oldStore, this.changedStore)
      this.$store.dispatch('cache/albums/updateAPI', { id: this.id, payload: newStore }).then((res) => {
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
        this.$store.dispatch('cache/albums/deleteAPI', this.id).then((res) => {
          console.log(res)
          this.$router.replace('/admin/albums')
        })
      })
    }
  },
  mounted () {
    this.$store.dispatch('cache/albums/getAllFromAPI')
  }
}
</script>
