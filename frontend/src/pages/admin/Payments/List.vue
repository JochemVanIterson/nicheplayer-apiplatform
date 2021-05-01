<template lang="pug">
q-page(padding)
  q-table(
    title="Payments",
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
      .row.items-center.q-gutter-x-sm
        q-btn(icon="refresh" flat round @click="refresh")
        q-input(outlined dense debounce="300" v-model="filter" placeholder="Search")
          template(v-slot:append)
            q-icon(name="search")
        q-btn(icon="add" flat label="Create" no-caps @click="$router.push('/admin/payments/create')")
    template(v-slot:body-cell-user="props")
      q-td(:props="props" auto-width)
        router-link(v-if="props.row.user" @click.native.stop="" :to="`/admin/users/${props.row.user.id}/show`") {{props.value}}
    template(v-slot:body-cell-album="props")
      q-td(:props="props" auto-width)
        router-link(v-if="props.row.album" @click.native.stop="" :to="`/admin/albums/${props.row.album.id}/show`") {{props.value}}
    template(v-slot:body-cell-song="props")
      q-td(:props="props" auto-width)
        router-link(v-if="props.row.song" @click.native.stop="" :to="`/admin/songs/${props.row.song.id}/show`") {{props.value}}
    template(v-slot:body-cell-actions="props")
      q-td(:props="props" auto-width)
        q-btn(flat color="primary" icon="edit" label="Edit" no-caps @click.stop="editClicked(props.row.id)" no-wrap)
</template>

<script>
import { date } from 'quasar'

export default {
  name: 'PageAdminPaymentsList',
  data () {
    return {
      filter: '',
      selected: [],
      columns: [
        {
          name: 'id',
          align: 'left',
          label: 'ID',
          field: 'id',
          sortable: true
        },
        {
          name: 'user',
          align: 'left',
          label: 'User',
          field: (row) => `${row.user.firstname} ${row.user.lastname}`,
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
          name: 'song',
          align: 'left',
          label: 'Song',
          field: (row) => row.song ? row.song.name : '',
          sortable: true
        },
        {
          name: 'album',
          align: 'left',
          label: 'Album',
          field: (row) => row.album ? `${row.album.artist} - ${row.album.name}` : '',
          sortable: true
        },
        {
          name: 'status',
          align: 'left',
          label: 'Payment status',
          field: 'paymentStatus',
          sortable: true
        },
        {
          name: 'datetime',
          align: 'left',
          label: 'Date',
          field: (row) => this.parseDate(row.datetime),
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
      return this.$store.getters['cache/payments/getAllJoined'].filter((e) => {
        return e !== undefined
      })
    }
  },
  methods: {
    parseDate (timestamp) { return date.formatDate(timestamp, 'DD-MM-YYYY HH:mm:ss') },
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.data.length}`
    },
    rowClicked (evt, row, index) {
      this.$router.push(`/admin/payments/${row.id}/show`)
    },
    editClicked (id) {
      this.$router.push(`/admin/payments/${id}/edit`)
    },
    refresh () {
      this.$store.dispatch('cache/payments/getAllFromAPI')
    }
  },
  mounted () {
    this.refresh()
  }
}
</script>
