<template lang="pug">
  q-layout(view="hHh LpR fFf")
    q-header(elevated)
      q-toolbar
        q-btn(flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen" v-if="$q.screen.lt.lg")

        q-toolbar-title
          | NichePlayer

        q-btn(v-if="!isLoggedIn" stretch flat label="Login" to="/login" no-caps)
        q-btn-dropdown(v-else stretch flat no-caps)
          template(v-slot:label)
            div(class="row items-center no-wrap")
              q-avatar(color="grey-6")
                img.profilePic(v-if="userHasProfilePic" :src="userProfilePic")
                span(v-else) {{userInitials}}
              div.q-ml-sm(class="text-center" v-if="$q.screen.gt.xs") {{userFullName}}

          q-list
            div(v-if="userAdmin")
              q-item(clickable v-close-popup tabindex="0" @click="goToAdminPanel" )
                q-item-section
                  q-item-label Admin panel
              q-separator(spaced)
            q-item(clickable v-close-popup tabindex="0" @click="goToUserSettings" )
              q-item-section
                q-item-label Settings
            q-item(clickable v-close-popup tabindex="0" @click="logoutButton")
              q-item-section
                q-item-label Logout

    q-drawer(
      v-model="drawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1")
      q-list
        q-item(clickable to="/" exact)
          q-item-section(avatar)
            q-icon(name="home")
          q-item-section
            q-item-label Home
        q-item(clickable to="/explore" exact :active="pathMatch('explore')")
          q-item-section(avatar)
            q-icon(name="explore")
          q-item-section
            q-item-label Explore

        q-separator
        q-item-label(header class="text-grey-8") My Music
        q-item(clickable to="/my/album" exact :active="pathMatch('my/album')")
          q-item-section(avatar)
            q-icon(name="album")
          q-item-section
            q-item-label Albums
        q-item(clickable to="/my/songs" exact :active="pathMatch('my/songs')")
          q-item-section(avatar)
            q-icon(name="music_note")
          q-item-section
            q-item-label Songs

        q-separator
        q-item-label(header class="text-grey-8") Playlists
        q-item(clickable to="/my/playlist/favorite" exact :active="pathMatch('my/playlist/favorite')")
          q-item-section(avatar)
            q-icon(name="favorite")
          q-item-section
            q-item-label Favorites
    q-footer
      AudioFooter
    q-page-container
      router-view
</template>

<script>
import AudioFooter from 'components/AudioFooter'

export default {
  name: 'MainLayout',
  components: {
    AudioFooter
  },
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  computed: {
    drawerOpen: {
      get () {
        return this.$q.screen.gt.md ? true : this.leftDrawerOpen
      },
      set (value) {
        this.leftDrawerOpen = value
      }
    },
    isLoggedIn () { return this.$store.getters['system/isLoggedIn'] },
    userFullName () { return this.isLoggedIn ? this.$store.getters['system/userFullName'] : '' },
    userProfilePic () { return this.isLoggedIn ? this.$store.getters['system/userProfilePic'] : '' },
    userHasProfilePic () { return this.isLoggedIn ? this.$store.getters['system/userHasProfilePic'] : '' },
    userInitials () { return this.isLoggedIn ? this.$store.getters['system/userInitials'] : '' },
    userAdmin () { return this.isLoggedIn ? this.$store.getters['system/userAdmin'] : false }
  },
  methods: {
    logoutButton () {
      this.$store.dispatch('system/logoutAction').then(() => {
        this.$router.replace('/')
      })
    },
    goToUserSettings () {
      this.$router.push('/settings')
    },
    goToAdminPanel () {
      this.$router.push('/admin')
    },
    pathMatch (id) {
      if (id === 'explore') {
        return this.$route.fullPath.startsWith('/explore')
      } else if (id === 'my/album') {
        return this.$route.fullPath.startsWith('/my/album')
      } else if (id === 'my/songs') {
        return this.$route.fullPath.startsWith('/my/songs')
      } else return false
    }
  },
  mounted () {
  }
}
</script>

<style lang='scss' scoped>
  .profilePic {
    object-fit: cover;
  }
</style>
