<template lang="pug">
  q-layout(view="lHh Lpr lFf")
    q-page-container
      q-page
        q-img.bg-grey-4.window-height(src="http://mbp.audioware.nl/api/media/6061bc0b83806_IMG_20180720_074013.jpg")
          div(class="absolute-full text-subtitle2 flex flex-center bg-transparent")
            q-card#homeCard
              img.q-my-md(alt="Quasar logo" src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" height="128px")
              q-card-section
                | PLACEHOLDER
              .row.q-pa-sm.q-gutter-x-sm
                q-btn.col(v-if="isLoggedIn" label="Explore" noCaps color="primary" to="/explore")
                q-btn.col(v-if="!isLoggedIn" label="Register" noCaps color="primary" to="/register")
                q-btn.col(v-if="!isLoggedIn" label="Login" noCaps color="primary" to="/login")

        .flex.flex-center.q-pa-xl.bg-grey-4(style="min-height:300px")
          | PLACEHOLDER
        q-toolbar.text-white.fixed-top#toolbar
          q-toolbar-title NichePlayer
          q-btn(v-if="!isLoggedIn" stretch flat label="Register" to="/register" no-caps)
          q-btn(v-if="!isLoggedIn" stretch flat label="Login" to="/login" no-caps)
          q-btn(v-if="isLoggedIn"  stretch flat label="Explore" to="/explore" no-caps)
          
</template>

<script>
export default {
  // name: 'PageName',
  computed: {
    isLoggedIn() { return this.$store.getters["system/isLoggedIn"] }
  }
}
</script>

<style lang="scss" scoped>
  #toolbar {
    background-color: #000000A0;
  }
  #homeCard {
    width: 100%;
    max-width: 400px;
    color: white;
    background-color: #222222A0;
  }
</style>