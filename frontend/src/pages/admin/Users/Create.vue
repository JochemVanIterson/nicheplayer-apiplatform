<template lang="pug">
q-page(padding)
  q-card(flat bordered)
    q-card-section
      .q-gutter-y-md
        .text-h5 Create new user
        q-input(filled v-model="username" label="Username")
        q-input(filled v-model="email" label="Email")
        q-input(filled v-model="firstname" label="Firstname")
        q-input(filled v-model="lastname" label="Lastname")
        q-input(filled v-model="password" label="Password" :type="isPwd ? 'password' : 'text'")
          template(v-slot:append)
            q-icon(
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd")
        q-select(filled v-model="roles" :options="roleOptions" multiple emit-value map-options use-chips label="Roles")
        q-input(filled v-model="profilePic" label="Profile Picture")
    q-card-actions(align="right")
      q-btn(:disabled="!savable" color="primary" icon="save" padding="xs md") Save
</template>

<script>
export default {
  name: 'PageAdminUsersCreate',
  data () {
    return {
      isPwd: true,
      roleOptions: [
        {
          label: 'Admin',
          value: 'ROLE_ADMIN'
        },
        {
          label: 'User',
          value: 'ROLE_USER'
        }
      ],
      newStore: {
        username: '',
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        roles: null,
        profilePic: null
      }
    }
  },
  computed: {
    username: {
      get () { return this.newStore.username },
      set (val) { this.$set(this.newStore, 'username', val) }
    },
    email: {
      get () { return this.newStore.email },
      set (val) { this.$set(this.newStore, 'email', val) }
    },
    firstname: {
      get () { return this.newStore.firstname },
      set (val) { this.$set(this.newStore, 'firstname', val) }
    },
    lastname: {
      get () { return this.newStore.lastname },
      set (val) { this.$set(this.newStore, 'lastname', val) }
    },
    password: {
      get () { return this.newStore.password },
      set (val) { this.$set(this.newStore, 'password', val) }
    },
    roles: {
      get () { return this.newStore.roles },
      set (val) { this.$set(this.newStore, 'roles', val) }
    },
    profilePic: {
      get () { return this.newStore.profilePic },
      set (val) { this.$set(this.newStore, 'profilePic', val) }
    },
    savable () { return this.username !== '' && this.email !== '' && this.firstname !== '' && this.lastname !== '' && this.password !== '' }
  },
  methods: {
  },
  mounted () {
  }
}
</script>
