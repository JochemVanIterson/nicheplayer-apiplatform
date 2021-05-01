<template lang="pug">
  q-layout.bg-grey-2(view="hHh LpR fFf")

    q-header(elevated class="bg-primary text-white")
      q-toolbar
        q-btn(dense flat round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen"  v-if="$q.screen.lt.lg")
        q-toolbar-title {{$route.meta.title}}
        q-space
        q-btn(stretch flat label="Go Back" no-caps @click="$router.push('/')")
        q-btn-dropdown(stretch flat no-caps)
          template(v-slot:label)
            div(class="row items-center no-wrap")
              q-avatar(color="grey-6")
                img.profilePic(v-if="userHasProfilePic" :src="userProfilePic")
                span(v-else) {{userInitials}}
              div.q-ml-sm(class="text-center" v-if="$q.screen.gt.xs") {{userFullName}}

          q-list
            //- q-item(clickable v-close-popup tabindex="0" @click="goToAdminPanel" )
            //-   q-item-section
            //-     q-item-label Admin panel
            //- q-separator(spaced)
            q-item(clickable v-close-popup tabindex="0" @click="logoutButton")
              q-item-section
                q-item-label Logout

    q-drawer(show-if-above v-model="leftDrawerOpen" side="left" bordered :width="250" content-class="bg-white")
      q-list(class="rounded-borders")
        q-item(clickable v-ripple to="/admin/dashboard" exact :active="pathMatch('dashboard')")
          q-item-section(avatar)
            q-icon(name="dashboard")
          q-item-section Dashboard
        q-item(clickable v-ripple to="/admin/users" exact :active="pathMatch('users')")
          q-item-section(avatar)
            q-icon(name="people")
          q-item-section Users

        q-item(clickable v-ripple to="/admin/albums" exact :active="pathMatch('albums')")
          q-item-section(avatar)
            q-icon(name="album")
          q-item-section Albums
        q-item(clickable v-ripple to="/admin/songs" exact :active="pathMatch('songs')")
          q-item-section(avatar)
            q-icon(name="music_note")
          q-item-section Songs

        q-item(clickable v-ripple to="/admin/media_objects" exact :active="pathMatch('media')")
          q-item-section(avatar)
            q-icon(name="photo")
          q-item-section Media
        q-item(clickable v-ripple to="/admin/sources" exact :active="pathMatch('sources')")
          q-item-section(avatar)
            q-icon(name="account_balance")
          q-item-section Sources
        q-item(clickable v-ripple to="/admin/payments" exact :active="pathMatch('payments')")
          q-item-section(avatar)
            q-icon(name="credit_card")
          q-item-section Payments
        q-item(clickable v-ripple to="/admin/play_history" exact :active="pathMatch('play_history')")
          q-item-section(avatar)
            q-icon(name="assessment")
          q-item-section Play History

    q-page-container
      router-view
</template>

<script>
export default {
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  computed: {
    userFullName () { return this.$store.getters['system/userFullName'] },
    userProfilePic () { return this.$store.getters['system/userProfilePic'] },
    userHasProfilePic () { return this.$store.getters['system/userHasProfilePic'] },
    userInitials () { return this.$store.getters['system/userInitials'] }
  },
  methods: {
    logoutButton () {
      this.$store.dispatch('system/logoutAction').then(() => {
        this.$router.replace('/')
      })
    },
    pathMatch (id) {
      return this.$route.fullPath.startsWith('/admin/' + id)
    }
  }
}
</script>

<style lang='scss' scoped>
  .profilePic {
    object-fit: cover;
  }
</style>
