<template lang="pug">
  q-layout.bg-grey-2(view="hHh LpR fFf")

    q-header(elevated class="bg-primary text-white")
      q-toolbar
        q-btn(dense flat round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen"  v-if="$q.screen.lt.lg")
        q-toolbar-title {{$route.meta.title}}

    q-drawer(show-if-above v-model="leftDrawerOpen" side="left" bordered)
      q-list(class="rounded-borders")
        q-item(clickable v-ripple to="/admin/dashboard" exact)
          q-item-section(avatar)
            q-icon(name="dashboard")
          q-item-section Dashboard
        q-item(clickable v-ripple to="/admin/users" exact)
          q-item-section(avatar)
            q-icon(name="people")
          q-item-section Users

        q-item(clickable v-ripple to="/admin/albums" exact)
          q-item-section(avatar)
            q-icon(name="album")
          q-item-section Albums
        q-item(clickable v-ripple to="/admin/songs" exact)
          q-item-section(avatar)
            q-icon(name="music_note")
          q-item-section Songs

        q-item(clickable v-ripple to="/admin/media" exact)
          q-item-section(avatar)
            q-icon(name="photo")
          q-item-section Media
        q-item(clickable v-ripple to="/admin/sources" exact)
          q-item-section(avatar)
            q-icon(name="account_balance")
          q-item-section Sources
        q-item(clickable v-ripple to="/admin/payments" exact)
          q-item-section(avatar)
            q-icon(name="credit_card")
          q-item-section Payments
        q-item(clickable v-ripple to="/admin/play_history" exact)
          q-item-section(avatar)
            q-icon(name="assessment")
          q-item-section Play History

    q-page-container
      router-view
</template>

<script>
export default {
  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>
