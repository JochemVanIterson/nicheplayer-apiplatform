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
  name: 'PageAdminUsersShow',
  data () {
    return {}
  },
  computed: {
    id () { return this.$route.params.id },
    data () { return this.$store.getters['cache/users/getObjectJoined'](this.id) }
  },
  mounted () {
    this.$store.dispatch('cache/users/getAllFromAPI')
  }
}
</script>
