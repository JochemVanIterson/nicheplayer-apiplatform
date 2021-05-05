<template lang="pug">
q-page(padding)
  q-card(flat bordered)
    q-card-section.column.items-center
      div(style="width:100%; max-width:300px")
        q-img.profilePic.bg-grey-6(:ratio="1" :src="profilepic")
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
    q-card-actions(align="right")
      q-btn(color="primary" icon="edit" padding="xs md" @click="$router.push(`/admin/users/${id}/edit`)") Edit

</template>

<script>
export default {
  name: 'PageAdminUsersShow',
  data () {
    return {}
  },
  computed: {
    id () { return this.$route.params.id },
    data () { return this.$store.getters['cache/users/getObjectJoined'](this.id) },
    profilepic () {
      return this.data.profilepic ? this.data.profilepic.contentUrl : '/profilepic_white.svg'
    }
  },
  mounted () {
    this.$store.dispatch('cache/users/getAllFromAPI')
  }
}
</script>

<style lang='scss' scoped>
  .profilePic {
    object-fit: cover;
    border-radius: 100%;
  }
</style>
