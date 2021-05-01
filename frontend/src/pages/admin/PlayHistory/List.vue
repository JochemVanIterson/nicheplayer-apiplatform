<template lang="pug">
q-page(padding)
  q-table(
    title="Songs",
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
    template( v-slot:body-cell-songart="props")
      q-td(:props="props")
        q-img(
          :src="props.value"
          style="width: 64px; height: 64px;"
          :ratio="1")
    template(v-slot:body-cell-user="props")
      q-td(:props="props" auto-width)
        router-link(@click.native.stop="" :to="`/admin/users/${props.row.user.id}/show`") {{props.value}}
    template(v-slot:body-cell-song="props")
      q-td(:props="props" auto-width)
        router-link(@click.native.stop="" :to="`/admin/songs/${props.row.song.id}/show`") {{props.value}}
</template>

<script>
import { date } from 'quasar'

export default {
  name: 'PageAdminSongsList',
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
          name: 'song',
          align: 'left',
          label: 'Song',
          field: (row) => row.song.album ? `${row.song.album.artist} - ${row.song.name}` : '',
          sortable: true
        },
        {
          name: 'datetime',
          align: 'left',
          label: 'Datetime',
          field: (row) => {
            return this.parseDate(row.timestamp)
          },
          sortable: true
        }
      ]
    }
  },
  computed: {
    data () {
      return this.$store.getters['cache/playHistory/getAllJoined'].filter((e) => {
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
      this.$router.push(`/admin/play_history/${row.id}/show`)
    },
    refresh () {
      this.$store.dispatch('cache/playHistory/getAllFromAPI')
    }
  },
  mounted () {
    this.refresh()
  }
}
</script>
