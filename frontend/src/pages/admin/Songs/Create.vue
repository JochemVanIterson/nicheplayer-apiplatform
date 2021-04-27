<template lang="pug">
q-page(padding)
  q-card(flat bordered)
    q-card-section
      .q-gutter-y-md
        .text-h5 Edit song
        q-input(filled v-model="name" label="Name")
        q-input(filled v-model="artist" label="Artist")
        q-input(filled v-model="releaseDate" label="Release Date" mask="date" :rules="['date']")
          template(v-slot:append)
            q-icon(name="event" class="cursor-pointer")
              q-popup-proxy(ref="qDateProxy" transition-show="scale" transition-hide="scale")
                q-date(v-model="releaseDate" mask="YYYY/MM/DD")
                  div(class="row items-center justify-end")
                    q-btn(v-close-popup label="Close" color="primary" flat)
        q-input(filled v-model="songArt" label="Song Art")
        .row
          q-input.col.q-pr-xs( v-model.number="price" label="Price" type="number" filled :step="0.01" :max-decimals="2" :min="0")
          q-select.col-sm-auto(filled v-model="currency" :options="currencyOptions" emit-value map-options label="Currency" style="width:120px")
    q-card-actions(align="right")
      q-btn(:disabled="!savable" color="primary" icon="save" padding="xs md") Save
</template>

<script>
export default {
  name: 'PageAdminSongsCreate',
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
        artist: '',
        releaseDate: null,
        songArt: null,
        price: 0,
        currency: 'euro'
      }
    }
  },
  computed: {
    name: {
      get () { return this.newStore.name },
      set (val) { this.$set(this.newStore, 'name', val) }
    },
    artist: {
      get () { return this.newStore.artist },
      set (val) { this.$set(this.newStore, 'artist', val) }
    },
    releaseDate: {
      get () { return this.newStore.releaseDate },
      set (val) { this.$set(this.newStore, 'releaseDate', val) }
    },
    songArt: {
      get () { return this.newStore.songArt },
      set (val) { this.$set(this.newStore, 'songArt', val) }
    },
    price: {
      get () { return this.newStore.price },
      set (val) { this.$set(this.newStore, 'price', val) }
    },
    currency: {
      get () { return this.newStore.currency },
      set (val) { this.$set(this.newStore, 'currency', val) }
    },

    savable () { return this.username !== '' && this.email !== '' && this.firstname !== '' && this.lastname !== '' && this.password !== '' }
  },
  methods: {
  },
  mounted () {
  }
}
</script>
