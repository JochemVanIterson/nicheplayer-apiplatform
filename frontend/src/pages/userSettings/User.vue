<template lang="pug">
q-page(padding)
  q-card(flat bordered)
    q-card-section.column.items-center
      div(style="width:100%; max-width:300px")
        q-responsive(:ratio="1")
          q-avatar(color="grey-6" )
            img.profilePic(v-if="profilepicURL" :src="profilepicURL")
            q-icon(v-else name="person" color="white")
      .text-h3.q-pt-md {{firstname}} {{lastname}}
    q-card-section
      q-markup-table(flat bordered)
        tbody
          tr.q-tr--no-hover
            q-td(auto-width) Username
            td
              q-input(dense filled v-model="username" disable)
          tr.q-tr--no-hover
            td Email
            td
              q-input(dense filled v-model="email")
          tr.q-tr--no-hover
            td Firstname
            td
              q-input(dense filled v-model="firstname")
          tr.q-tr--no-hover
            td Lastname
            td
              q-input(dense filled v-model="lastname")
          tr.q-tr--no-hover
            td Password
            td
              q-input(dense filled v-model="password" placeholder="Password (Unchanged)" :type="isPwd ? 'password' : 'text'"
                :rules="[val => val.charAt(0)!=='$' || 'Password cant start with a $']" hide-bottom-space
              )
                template(v-slot:append)
                  q-icon(
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd")
    q-card-actions(align="right")
      q-btn(:disabled="!savable" color="primary" icon="save" padding="xs md" @click="saveAction") Save
</template>

<script>
import _ from 'lodash'

export default {
  name: 'SettingsUserPage',
  data () {
    return {
      isPwd: true,
      changedStore: {}
    }
  },
  computed: {
    id () { return this.$store.getters['system/userData'].id },
    oldStore () { return this.$store.getters['cache/users/getObjectJoined'](this.id) },

    files () {
      return this.$store.getters['cache/mediaObjects/getAll'].filter((e) => {
        return e.type === 'image'
      })
    },

    username() { return this.oldStore.username },
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
    profilepic: {
      get () {
        if (this.oldStore.profilepic || this.changedStore.profilepic) {
          return this.changedStore.profilepic === undefined ? this.oldStore.profilepic['@id'] : this.changedStore.profilepic
        } else return undefined
      },
      set (val) { this.$set(this.changedStore, 'profilepic', val) }
    },
    profilepicURL () {
      const image = this.$store.getters['cache/mediaObjects/getObject'](this.profilepic ? this.profilepic.replace('/api/media_objects/', '') : -1)
      return this.profilepic ? image.contentUrl : undefined
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
  },
  mounted() {
    this.$store.dispatch('cache/users/getFromAPI', { id: this.id })
  }
}
</script>

<style lang='scss' scoped>
  .profilePic {
    object-fit: cover;
  }
</style>