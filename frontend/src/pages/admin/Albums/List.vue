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
  )
    template(v-slot:top-right)
      .row.items-center.q-gutter-x-sm
        q-btn(icon="refresh" flat round @click="refresh")
        q-input(outlined dense debounce="300" v-model="filter" placeholder="Search")
          template(v-slot:append)
            q-icon(name="search")
        q-btn(icon="add" flat label="Create" no-caps @click="$router.push('/admin/albums/create')")
    template( v-slot:body-cell-albumart="props")
      q-td(:props="props")
        q-img(
          :src="props.value"
          style="width: 64px; height: 64px;"
          :ratio="1")
    template(v-slot:body-cell-actions="props")
      q-td(:props="props")
        q-btn(flat color="primary" icon="edit" label="Edit" no-caps @click.stop="editClicked(props.row.id)")
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
          name: 'albumart',
          align: 'left',
          label: 'Album art',
          field: (row) => row.albumArt.contentUrl,
          sortable: false
        },
        {
          name: 'name',
          align: 'left',
          label: 'Name',
          field: 'name',
          sortable: true
        },
        {
          name: 'artist',
          align: 'left',
          label: 'Artist',
          field: 'artist',
          sortable: true
        },
        {
          name: 'actions',
          align: 'right',
          label: '',
          sortable: false
        }
      ]
    }
  },
  computed: {
    data () { return this.$store.getters['cache/albums/getAllJoined'] }
  },
  methods: {
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.data.length}`
    },
    rowClicked (evt, row, index) {
      this.$router.push(`/admin/albums/${row.id}/show`)
    },
    editClicked (id) {
      this.$router.push(`/admin/albums/${id}/edit`)
    },
    refresh () {
      this.$store.dispatch('cache/albums/getAllFromAPI')
    }
  },
  mounted () {
    this.refresh()
  }
}
</script>
