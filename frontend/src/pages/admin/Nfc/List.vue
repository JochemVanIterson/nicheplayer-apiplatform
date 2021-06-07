<template lang="pug">
q-page(padding)
  q-table(
    title="Albums",
    :data="data",
    :columns="columns",
    row-key="id"
    :selected-rows-label="getSelectedString"
    selection="multiple"
    :selected.sync="selected"
    :filter="filter"
    flat bordered
    @row-click="rowClicked"
    :pagination="{rowsPerPage: 10}"
  )
    template(v-slot:top-right)
      .row.items-center.q-gutter-sm
        q-btn(icon="refresh" flat round @click="refresh")
        q-input(outlined dense debounce="300" v-model="filter" placeholder="Search")
          template(v-slot:append)
            q-icon(name="search")
        q-btn(icon="add" flat label="Create" no-caps @click="$router.push('/admin/nfc/create')")
</template>

<script>
export default {
  name: 'PageAdminAlbumsList',
  data () {
    return {
      filter: '',
      selected: [],
      columns: [
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'left',
          field: 'id',
          sortable: true
        },
        {
          name: 'cardUID',
          align: 'left',
          label: 'Card ID',
          field: 'cardUID',
          sortable: true
        },
        {
          name: 'album',
          align: 'left',
          label: 'Album art',
          field: (row) => `${row.album.artist} - ${row.album.name}`,
          sortable: true
        },
        {
          name: 'users',
          align: 'left',
          label: 'Users',
          field: (row) => row.users.length,
          sortable: false
        }
      ]
    }
  },
  computed: {
    data () {
      return this.$store.getters['cache/nfc/getAllJoined'].filter((e) => {
        return e !== undefined
      })
    }
  },
  methods: {
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.data.length}`
    },
    rowClicked (evt, row, index) {
      this.$router.push(`/admin/nfc/${row.id}/edit`)
    },
    refresh () {
      this.$store.dispatch('cache/nfc/getAllFromAPI', { joinFields: ['album'] })
    }
  },
  mounted () {
    this.refresh()
  }
}
</script>
