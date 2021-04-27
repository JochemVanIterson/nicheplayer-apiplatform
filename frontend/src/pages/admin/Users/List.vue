<template lang="pug">
q-page(padding)
  q-table(
    title="Users",
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
        q-btn(icon="add" flat label="Create" no-caps @click="$router.push('/admin/users/create')")
    template( v-slot:body-cell-fullname="props")
      q-td(:props="props")
        q-avatar.q-mr-sm(size="md" color="grey-6")
          img.profilePic(v-if="props.row.profilePic" :src="props.row.profilePic")
          q-icon(name="people" color="white")
        q-badge(v-if="props.row.roles.includes('ROLE_ADMIN')" color="primary" :label="props.value")
        div(v-else) {{props.value}}
    template(v-slot:body-cell-actions="props")
      q-td(:props="props")
        q-btn(flat color="primary" icon="edit" label="Edit" no-caps @click.stop="editClicked(props.row.id)")
</template>

<script>
export default {
  name: 'PageAdminUsersList',
  data () {
    return {
      filter: '',
      selected: [],
      columns: [
        {
          name: 'fullname',
          required: true,
          label: 'Full name',
          align: 'left',
          field: (row) => `${row.firstname} ${row.lastname}`,
          sortable: true
        },
        {
          name: 'username',
          align: 'left',
          label: 'Username',
          field: 'username',
          sortable: true
        },
        {
          name: 'email',
          align: 'left',
          label: 'Email',
          field: 'email',
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
    data () { return this.$store.getters['cache/users/getAllJoined'] }
  },
  methods: {
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.data.length}`
    },
    rowClicked (evt, row, index) {
      this.$router.push(`/admin/users/${row.id}/show`)
    },
    editClicked (id) {
      this.$router.push(`/admin/users/${id}/edit`)
    }
  },
  mounted () {
    this.$store.dispatch('cache/users/getAllFromAPI')
  }
}
</script>
