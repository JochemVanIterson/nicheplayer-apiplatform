<template lang="pug">
q-page(padding)
  q-card(flat bordered)
    q-card-section
      .q-gutter-y-md
        .text-h5 New payment
        q-select(
          label="User"
          filled
          v-model="user"
          :options="users"
          option-value="@id"
          :option-label="(item) => `${item.firstname} ${item.lastname}`"
          emit-value
          map-options
          @filter="filterUsers")
        q-select(filled v-model="paymentStatus" :options="statusOptions" emit-value map-options label="Payment Status")
        q-input(v-model.number="price" label="Price" type="number" filled :step="0.01" :max-decimals="2" :min="0")
        q-select(filled v-model="type" :options="typeOptions" emit-value map-options label="Type")
        q-card(flat bordered)
          q-card-section
            .q-gutter-y-md
              .text-h6 Content
              .text(v-if="!type") Select type
              q-select(
                v-if="type"
                label="Album"
                filled
                v-model="album"
                :options="albums"
                option-value="@id"
                :option-label="(item) => `${item.artist} - ${item.name}`"
                emit-value
                map-options
                @filter="filterAlbums")
              q-select(
                v-if="type=='song'"
                label="Song"
                filled
                v-model="song"
                :options="songs"
                option-value="@id"
                :option-label="(item) => `${item.trackNumber}. ${item.name}`"
                emit-value
                map-options
                @filter="filterSongs")
    q-card-actions(align="right")
      q-btn(:disabled="!savable" color="primary" icon="save" padding="xs md" @click="saveAction") Save
</template>

<script>
export default {
  name: 'PageAdminPaymentsCreate',
  data () {
    return {
      newStore: {
        user: null,
        paymentStatus: 'requested',
        price: null,
        type: null
      },
      statusOptions: [
        {
          label: 'Requested',
          value: 'requested'
        },
        {
          label: 'In Progress',
          value: 'in_progress'
        },
        {
          label: 'Success',
          value: 'success'
        },
        {
          label: 'Declined',
          value: 'declined'
        }
      ],
      typeOptions: [
        {
          label: 'Album',
          value: 'album'
        },
        {
          label: 'Song',
          value: 'song'
        }
      ]
    }
  },
  computed: {
    users () {
      return this.$store.getters['cache/users/getAll']
    },
    albums () {
      return this.$store.getters['cache/albums/getAll']
    },
    songs () {
      return this.$store.getters['cache/songs/getAll'].filter((e) => e.album === this.album)
    },

    user: {
      get () { return this.newStore.user },
      set (val) { this.$set(this.newStore, 'user', val) }
    },
    paymentStatus: {
      get () { return this.newStore.paymentStatus },
      set (val) { this.$set(this.newStore, 'paymentStatus', val) }
    },
    price: {
      get () { return this.newStore.price },
      set (val) { this.$set(this.newStore, 'price', val) }
    },
    type: {
      get () { return this.newStore.type },
      set (val) {
        this.$set(this.newStore, 'type', val)
        this.$set(this.newStore, 'album', null)
        this.$set(this.newStore, 'song', null)
      }
    },
    album: {
      get () { return this.newStore.album },
      set (val) {
        this.$set(this.newStore, 'album', val)
        this.$set(this.newStore, 'song', null)
      }
    },
    song: {
      get () { return this.newStore.song },
      set (val) { this.$set(this.newStore, 'song', val) }
    },

    savable () { return this.user && this.paymentStatus && this.type && this.album && (this.type !== 'song' || this.song) }
  },
  methods: {
    filterUsers (val, update, abort) {
      this.$store.dispatch('cache/users/getAllFromAPI').then(() => {
        update()
      })
    },
    filterAlbums (val, update, abort) {
      this.$store.dispatch('cache/albums/getAllFromAPI').then(() => {
        update()
      })
    },
    filterSongs (val, update, abort) {
      this.$store.dispatch('cache/songs/getAllFromAPI').then(() => {
        update()
      })
    },
    saveAction () {
      this.$store.dispatch('cache/payments/insertAPI', this.newStore).then((res) => {
        this.$router.go(-1)
      })
    }
  },
  mounted () {
  }
}
</script>
