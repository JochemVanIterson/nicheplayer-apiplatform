<template lang="pug">
  q-layout(view="lHh Lpr lFf")
    q-page-container
      q-page.flex.flex-center.column.bg-grey-4(padding)
        img( alt="Quasar logo" src="~assets/app-logo.svg" height="128px")
        q-btn(label="Login" noCaps color="primary" to="/login")
        q-btn(label="Register" noCaps color="primary" to="/register")
        //- q-card.q-mt-lg#loginCard
        //-   q-card-section
        //-     .text-h6 Login
        //-   q-card-section
        //-     q-input(v-model="username" label="Username" @keydown.enter.prevent="attemptLogin")
        //-     q-input(v-model="password" label="Password" type="password" @keydown.enter.prevent="attemptLogin")
        //-   q-card-actions(align="right")
        //-     q-btn(flat color="primary") Go back
        //-     q-btn(color="primary" @click="attemptLogin") Login
</template>

<script>
export default {
  // name: 'PageName',
}
</script>
