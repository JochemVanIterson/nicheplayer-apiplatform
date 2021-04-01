<template lang="pug">
  q-layout(view="lHh Lpr lFf")
    q-page-container
      q-page.flex.flex-center.column.bg-grey-9(padding)        
        q-card.q-mt-lg#homeCard
          img( alt="Quasar logo" src="~assets/app-logo.svg" height="128px")
          //- q-card-section
          //-   .text-h6 Login
          q-card-section
            .text PLACEHOLDER
          q-card-actions(v-if="!isLoggedIn" align="around")
            q-btn(label="Login" noCaps color="primary" to="/login")
            q-btn(label="Register" noCaps color="primary" to="/register")
          q-card-actions(v-else align="center")
            q-btn.full-width(label="Open" noCaps color="primary" to="/explore")
          
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
  #homeCard {
    width: 100%;
    max-width: 400px;
  }
</style>