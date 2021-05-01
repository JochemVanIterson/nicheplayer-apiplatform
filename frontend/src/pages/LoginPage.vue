<template lang="pug">
  q-layout(view="lHh Lpr lFf")
    q-page-container
      q-page.flex.flex-center.column.bg-grey-4()
        q-img.bg-grey-4.window-height(src="background_image.jpg")
          div(class="absolute-full text-subtitle2 flex flex-center bg-transparent")
            q-card.q-mt-lg#loginCard
              q-card-section
                .text-h4 Login
              q-card-section.q-gutter-y-md
                q-input(bg-color="white" filled v-model="username" label="Username" @keydown.enter.prevent="attemptLogin")
                q-input(bg-color="white" filled v-model="password" label="Password" type="password" @keydown.enter.prevent="attemptLogin")
              q-card-actions(align="right")
                q-btn(color="primary" @click="$router.go(-1)") Go back
                q-btn(color="primary" @click="attemptLogin") Login
</template>

<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    toRoute () { return this.$route.query.to || 'explore' }
  },
  methods: {
    attemptLogin () {
      const payload = {
        username: this.username,
        password: this.password
      }
      function errorNotification (message) {
        return { type: 'negative', message, position: 'bottom', timeout: 4000 }
      }

      if (!this.username || !this.password) {
        this.$q.notify(errorNotification('Empty fields'))
        return false
      }

      this.$store.dispatch('system/attemptLogin', payload).then((status) => {
        if (status) this.$router.replace(this.toRoute)
        else {
          this.$q.notify(errorNotification('Login failed, wrong credentials'))
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  #loginCard {
    width: 100%;
    max-width: 400px;
    color: white;
    background-color: #222222A0;
  }
</style>
