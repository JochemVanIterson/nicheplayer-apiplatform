<template lang="pug">
  q-layout(view="lHh Lpr lFf")
    q-page-container
      q-page.flex.flex-center.column.bg-grey-4(padding)
        q-card.q-mt-lg#registerCard
          q-card-section
            .text-h4 Register
          q-card-section.q-gutter-y-md
            .row.q-col-gutter-x-sm
              q-input.col(outlined v-model="firstname" label="First name")
              q-input.col(outlined v-model="lastname" label="Last name")
            q-input(outlined v-model="username" label="Username")
            q-input(outlined v-model="email" label="Email" type="email")
            q-input(outlined v-model="password" label="Password" type="password")
          q-card-actions(align="right")
            q-btn(flat color="primary") Go back
            q-btn(color="primary" @click="registerAction") Register
</template>

<script>
export default {
  name: 'RegisterPage',
  data() {
    return {
      username: 'bleh',
      email: 'bleh@example.com',
      firstname: 'Bleh',
      lastname: 'Bleh',
      password: 'bleh'
    }
  },
  computed: {
    toRoute() { return this.$route.query.to || "explore" }
  },
  methods: {
    registerAction() {
      const payload = {
        username: this.username,
        email: this.email,
        firstname: this.firstname,
        lastname: this.lastname,
        roles: ['ROLE_USER'],
        password: this.password
      }
      function errorNotification(message) {
        return { type: 'negative', message, position: 'bottom', timeout: 4000 }
      }

      if (!this.username || !this.email || !this.firstname || !this.lastname || !this.password) {
        this.$q.notify(errorNotification(`Empty fields`))
        return false
      }

      this.$store.dispatch("system/apiRequest", { path: "users", payload, method: "POST", nojwt: true }).then((status) => {
        if (status) {
          this.$store.dispatch("system/attemptLogin", { username: this.username, password: this.passwordZ }).then((loginStatus) => {
            if (loginStatus) this.$router.replace(this.toRoute)
            else {
              this.$q.notify(errorNotification(`Login failed, wrong credentials`))
            }
          })
        } else {
          this.$q.notify(errorNotification(`Registration failed`))
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  #registerCard {
    width: 100%;
    max-width: 600px;
  }
</style>