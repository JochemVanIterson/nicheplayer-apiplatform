<template lang="pug">
q-page(padding)
  q-table(
    title="MediaObjects",
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
        q-btn(icon="add" flat label="Create" no-caps @click="$router.push('/admin/media_objects/create')")
    template( v-slot:body-cell-meta="props")
      q-td(:props="props")
        q-markup-table(dense flat bordered)
          tbody
            tr.q-tr--no-hover(v-for="item, key in props.value")
              td( class="text-left" style="width:100px" ) {{key}}
              td( class="text-left") {{item}}
    template(v-slot:body-cell-actions="props")
      q-td(:props="props")
        q-btn(flat color="primary" icon="edit" label="Edit" no-caps @click.stop="editClicked(props.row.id)")
</template>

<script>
import { format } from 'quasar'

export default {
  name: 'PageAdminMediaObjectsList',
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
          name: 'fileName',
          align: 'left',
          label: 'File Name',
          field: 'fileName',
          sortable: true
        },
        {
          name: 'type',
          align: 'left',
          label: 'Type',
          field: 'type',
          sortable: true
        },
        {
          name: 'access',
          align: 'left',
          label: 'Access',
          field: 'access',
          sortable: true
        },
        {
          name: 'size',
          align: 'left',
          label: 'Size',
          field: (row) => format.humanStorageSize(row.size),
          sortable: false
        },
        {
          name: 'source',
          align: 'left',
          label: 'Source',
          field: 'source',
          sortable: false
        },
        {
          name: 'meta',
          align: 'left',
          label: 'Meta',
          field: 'meta',
          sortable: false
        }
      ]
    }
  },
  computed: {
    data () {
      return this.$store.getters['cache/mediaObjects/getAll'].filter((e) => {
        return e !== undefined
      })
    }
  },
  methods: {
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.data.length}`
    },
    rowClicked (evt, row, index) {
      this.$router.push(`/admin/media_objects/${row.id}/show`)
    },
    editClicked (id) {
      this.$router.push(`/admin/media_objects/${id}/edit`)
    },
    refresh () {
      this.$store.dispatch('cache/mediaObjects/getAllFromAPI')
    }
  },
  mounted () {
    this.refresh()
  }
}
</script>
