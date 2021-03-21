<template lang="pug">
  q-layout(view="lHh Lpr lFf")
    q-header(elevated)
      q-toolbar
        //- q-btn(flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen")

        q-toolbar-title
          | Quasar App

        q-btn(v-if="!isLoggedIn" stretch flat label="Login" to="/login" no-caps)
        q-btn-dropdown(v-else stretch flat no-caps)
          template(v-slot:label)
            div(class="row items-center no-wrap")
              q-avatar.q-mr-sm
                img.profilePic(:src="userProfilePic")
              div(class="text-center") {{userFullName}}

          q-list
            q-item(clickable v-close-popup tabindex="0" @click="goToAdminPanel")
              q-item-section
                q-item-label Admin panel
            q-item(clickable v-close-popup tabindex="0" to="/admin")
              q-item-section
                q-item-label Configuration
            q-item-label(header) Folders
            q-item(v-for="n in 3" :key="`x.${n}`" clickable v-close-popup tabindex="0")
              q-item-section
                q-item-label Photos
                q-item-label(caption) February 22, 2016
              q-item-section(side)
                q-icon(name="info")  
            q-separator(spaced)
            q-item(clickable v-close-popup tabindex="0" @click="logoutButton")
              q-item-section
                q-item-label Logout

    //- q-drawer(
    //-   v-model="leftDrawerOpen"
    //-   show-if-above
    //-   bordered
    //-   content-class="bg-grey-1")
    //-   q-list
    //-     q-item-label(header class="text-grey-8") Essential Links

    q-page-container
      router-view
</template>

<script>
import { ENTRYPOINT } from "../config/1314272676_entrypoint";

export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
    }
  },
  computed: {
    isLoggedIn() { return this.$store.getters["system/isLoggedIn"] },
    userFullName() { return this.$store.getters["system/userFullName"] },
    userProfilePic() { return this.$store.getters["system/userProfilePic"] }
  },
  methods: {
    logoutButton() {
      this.$store.dispatch("system/logoutAction")
    },
    goToAdminPanel() {
      window.location = `${ENTRYPOINT}/admin`
    }
  }
}
</script>

<style lang="scss" scoped>
  .profilePic {
    object-fit: cover;
  }
</style>