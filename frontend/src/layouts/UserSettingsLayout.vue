<template lang="pug">
  q-layout.bg-grey-2(view="hHh LpR fFf")

    q-header(elevated class="bg-primary text-white")
      q-toolbar
        q-btn(dense flat round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen"  v-if="$q.screen.lt.lg")
        q-toolbar-title {{$route.meta.title}}
        q-space
        q-btn(stretch flat label="Go Back" no-caps @click="$router.push('/explore')")
        q-btn-dropdown(stretch flat no-caps)
          template(v-slot:label)
            div(class="row items-center no-wrap")
              q-avatar(color="grey-6")
                img.profilePic(v-if="userHasProfilePic" :src="userProfilePic")
                span(v-else) {{userInitials}}
              div.q-ml-sm(class="text-center" v-if="$q.screen.gt.xs") {{userFullName}}

          q-list
            q-item(clickable v-close-popup tabindex="0" @click="goToAdminPanel" )
              q-item-section
                q-item-label Admin panel
            q-separator(spaced)
            q-item(clickable v-close-popup tabindex="0" @click="logoutButton")
              q-item-section
                q-item-label Logout

    q-drawer(show-if-above v-model="leftDrawerOpen" side="left" bordered :width="250" content-class="bg-white")
      q-list(class="rounded-borders")
        q-item(clickable v-ripple to="/settings/user" exact :active="pathMatch('user')")
          q-item-section(avatar)
            q-icon(name="people")
          q-item-section User
        q-item(clickable v-ripple to="/settings/audioplayer" exact :active="pathMatch('audioplayer')")
          q-item-section(avatar)
            q-icon(name="radio")
          q-item-section Audio Player

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
    goToAdminPanel () {
      this.$router.push('/admin')
    },
    pathMatch (id) {
      return this.$route.fullPath.startsWith('/settings/' + id)
    }
  }
}
</script>

<style lang='scss' scoped>
  .profilePic {
    object-fit: cover;
  }
</style>
