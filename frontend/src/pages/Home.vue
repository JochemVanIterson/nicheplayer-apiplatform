<template lang="pug">
  q-layout(view="lHh Lpr lFf")
    q-page-container
      q-page
        q-img.bg-grey-4.window-height(src="http://mbp.audioware.nl/api/media/6061bc0b83806_IMG_20180720_074013.jpg")
          div(class="absolute-full text-subtitle2 flex flex-center bg-transparent")
            q-card#homeCard
              img( alt="Quasar logo" src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" height="128px")
              q-card-section
                .text PLACEHOLDER
              q-card-actions(v-if="isLoggedIn" align="center")
                q-btn.full-width(label="Open" noCaps color="primary" to="/explore")
        q-toolbar.text-white.fixed-top#toolbar
          q-avatar
            img(src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg")
          q-toolbar-title Nicheplayer
          q-btn(v-if="!isLoggedIn" stretch flat label="Register" to="/register" no-caps)
          q-btn(v-if="!isLoggedIn" stretch flat label="Login" to="/login" no-caps)
          q-btn(v-if="isLoggedIn"  stretch flat label="Open" to="/explore" no-caps)
          
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
    color: black;
  }
</style>