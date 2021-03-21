<template lang="pug">
  q-layout(view="hHh Lpr fFf") <!-- Be sure to play with the Layout demo on docs -->
    q-header(elevated)
      q-toolbar
        q-btn(flat round dense icon="menu" @click="leftDrawer = !leftDrawer")
        q-toolbar-title
          | Configuration
        q-btn(flat stretch label="Go back" no-caps to="/")

    q-drawer(
      v-model="leftDrawer"
      side="left"
      bordered
      show-if-above)
      q-scroll-area(style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd")
        q-list(padding)
          q-item( clickable v-ripple to="/admin/albums" exact)
            q-item-section(avatar)
              q-icon( name="album")
            q-item-section Albums
          q-item( clickable v-ripple to="/admin/songs" exact)
            q-item-section(avatar)
              q-icon( name="music_note")
            q-item-section Songs
          q-item( clickable v-ripple to="/admin/media_objects" exact)
            q-item-section(avatar)
              q-icon( name="photo")
            q-item-section Media

      q-img(class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px")
        div(class="absolute-bottom bg-transparent")
          q-avatar(size="56px" class="q-mb-sm")
            img(src="https://cdn.quasar.dev/img/boy-avatar.png")
          div(class="text-weight-bold") Razvan Stoenescu
          div @rstoenescu


    q-page-container
      router-view
</template>

<script>
export default {
  // name: 'AdminLayout',

  data () {
    return {
      leftDrawer: true
    }
  }
}
</script>
