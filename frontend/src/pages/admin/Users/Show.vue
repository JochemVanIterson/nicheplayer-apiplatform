<template lang="pug">
q-page(padding)
  q-card(flat bordered)
    q-card-section.column.items-center
      q-avatar(size="400px" color="grey-6")
        img.profilePic(v-if="data.profilePic" :src="data.profilePic")
        q-icon(name="person" color="white")
      .text-h3.q-pt-md {{data.firstname}} {{data.lastname}}
    q-card-section
      q-markup-table(flat bordered)
        tbody
          tr.q-tr--no-hover
            td Username
            td {{data.username}}
          tr.q-tr--no-hover
            td Email
            td {{data.email}}
          tr.q-tr--no-hover
            td Firstname
            td {{data.firstname}}
          tr.q-tr--no-hover
            td Lastname
            td {{data.lastname}}
</template>

<script>
export default {
  name: 'PageAdminUsersList',
  data () {
    return {
    }
  },
  computed: {
    id () { return this.$route.params.id },
    data () { return this.$store.getters['cache/users/getObjectJoined'](this.id) }
  },
  methods: {
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.data.length}`
    }
  },
  mounted () {
    console.log(this.$route)
    this.$store.dispatch('cache/users/getAllFromAPI')
  }
}
</script>
