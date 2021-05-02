<template lang="pug">
q-page(padding)
  q-card(flat bordered)
    q-card-section
      .q-gutter-y-md
        .text-h5 Edit user
        q-input(filled v-model="username" label="Username" disable)
        q-input(filled v-model="email" label="Email")
        q-input(filled v-model="firstname" label="Firstname")
        q-input(filled v-model="lastname" label="Lastname")
        q-input(filled v-model="password" :label="password ? 'Password' : 'Password (Unchanged)'" :type="isPwd ? 'password' : 'text'"
          :rules="[val => val.charAt(0)!=='$' || 'Password cant start with a $']" hide-bottom-space)
          template(v-slot:append)
            q-icon(
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd")
        q-select(filled v-model="roles" :options="roleOptions" multiple emit-value map-options use-chips label="Roles")
        MediaField(v-model="profilepic" type="Image" filled stack-label label="Profile Picture")
    q-card-actions(align="right")
      q-btn(flat color="red" icon="delete" padding="xs md" @click="deleteAction") Delete
      q-btn(:disabled="!savable" color="primary" icon="save" padding="xs md" @click="saveAction") Save
</template>

<script>
import _ from 'lodash'
import MediaField from 'components/MediaField'
export default {
  name: 'PageAdminUsersCreate',
  components: {
    MediaField
  },
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

    files () {
      return this.$store.getters['cache/mediaObjects/getAll'].filter((e) => {
        return e.type === 'image'
      })
    },

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
    profilepic: {
      get () {
        if (this.oldStore.profilepic || this.changedStore.profilepic) {
          return this.changedStore.profilepic === undefined ? this.oldStore.profilepic['@id'] : this.changedStore.profilepic
        } else return undefined
      },
      set (val) { this.$set(this.changedStore, 'profilepic', val) }
    },

    savable () { return Object.keys(this.changedStore).length > 0 }
  },
  methods: {
    filterFiles (val, update, abort) {
      this.$store.dispatch('cache/mediaObjects/getAllFromAPI').then(() => {
        update()
      })
    },
    saveAction () {
      const newStore = {}
      _.merge(newStore, this.oldStore, this.changedStore)
      this.$store.dispatch('cache/users/updateAPI', { id: this.id, payload: newStore }).then((res) => {
        console.log(res)
        this.$router.go(-1)
      })
    },
    deleteAction () {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Would you like to delete this user',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$store.dispatch('cache/users/deleteAPI', this.id).then((res) => {
          console.log(res)
          this.$router.replace('/admin/users')
        })
      })
    }
  },
  mounted () {
    this.$store.dispatch('cache/users/getAllFromAPI')
  }
}
</script>
