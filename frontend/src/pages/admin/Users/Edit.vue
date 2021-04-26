<template lang="pug">
q-page(padding)
  q-card(flat bordered)
    q-card-section
      .q-gutter-y-md
        .text-h5 Edit user
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
      q-btn(flat color="red" icon="delete" padding="xs md") Delete
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
      changedStore: {}
    }
  },
  computed: {
    id () { return this.$route.params.id },
    oldStore () { return this.$store.getters['cache/users/getObjectJoined'](this.id) },

    username: {
      get () { return this.changedStore.username === undefined ? this.oldStore.username : this.changedStore.username },
      set (val) { this.$set(this.changedStore, 'username', val) }
    },
    email: {
      get () { return this.changedStore.email === undefined ? this.oldStore.email : this.changedStore.email },
      set (val) { this.$set(this.changedStore, 'email', val) }
    },
    firstname: {
      get () { return this.changedStore.firstname === undefined ? this.oldStore.firstname : this.changedStore.firstname },
      set (val) { this.$set(this.changedStore, 'firstname', val) }
    },
    lastname: {
      get () { return this.changedStore.lastname === undefined ? this.oldStore.lastname : this.changedStore.lastname },
      set (val) { this.$set(this.changedStore, 'lastname', val) }
    },
    password: {
      get () { return this.changedStore.password === undefined ? this.oldStore.password : this.changedStore.password },
      set (val) { this.$set(this.changedStore, 'password', val) }
    },
    roles: {
      get () { return this.changedStore.roles === undefined ? this.oldStore.roles : this.changedStore.roles },
      set (val) { this.$set(this.changedStore, 'roles', val) }
    },
    profilePic: {
      get () { return this.changedStore.profilePic === undefined ? this.oldStore.profilePic : this.changedStore.profilePic },
      set (val) { this.$set(this.changedStore, 'profilePic', val) }
    },

    savable () { return Object.keys(this.changedStore).length > 0 }
  },
  methods: {
  },
  mounted () {
    this.$store.dispatch('cache/users/getAllFromAPI')
  }
}
</script>
