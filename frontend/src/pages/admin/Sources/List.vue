<template lang="pug">
q-page(padding)
  q-table(
    title="Sources",
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
        //- q-btn(icon="add" flat label="Create" no-caps @click="$router.push('/admin/sources/create')")
    template( v-slot:body-cell-sourceart="props")
      q-td(:props="props")
        q-img(
          :src="props.value"
          style="width: 64px; height: 64px;"
          :ratio="1")
    template(v-slot:body-cell-album="props")
      q-td(:props="props" auto-width)
        router-link(@click.native.stop="" :to="`/admin/albums/${props.row.album.id}/show`") {{props.value}}
    template(v-slot:body-cell-file="props")
      q-td(:props="props" auto-width)
        router-link(@click.native.stop="" :to="`/admin/media_objects/${props.row.file.id}/show`") {{props.value}}
    template(v-slot:body-cell-explorable="props")
      q-td(:props="props" auto-width)
        q-icon(:name="props.value?'check':'close'" size="sm")
    //- template(v-slot:body-cell-actions="props")
    //-   q-td(:props="props" auto-width)
    //-     q-btn(flat color="primary" icon="edit" label="Edit" no-caps @click.stop="editClicked(props.row.id)" no-wrap)
</template>

<script>
export default {
  name: 'PageAdminSourcesList',
  data () {
    return {
      filter: '',
      selected: [],
      columns: [
        {
          name: 'name',
          align: 'left',
          label: 'Name',
          field: 'name',
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
          name: 'config',
          align: 'left',
          label: 'Config',
          field: (row) => JSON.stringify(row.config),
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
    data () {
      return this.$store.getters['cache/sources/getAllJoined'].filter((e) => {
        return e !== undefined
      })
    }
  },
  methods: {
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.data.length}`
    },
    rowClicked (evt, row, index) {
      this.$router.push(`/admin/sources/${row.id}/show`)
    },
    editClicked (id) {
      this.$router.push(`/admin/sources/${id}/edit`)
    },
    refresh () {
      this.$store.dispatch('cache/sources/getAllFromAPI')
    }
  },
  mounted () {
    this.refresh()
  }
}
</script>
