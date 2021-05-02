<template lang="pug">
  div(class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center")
    div
      div(style="font-size: 30vh")
        | 401

      div(class="text-h2" style="opacity:.4")
        | Oops. You are not allowed to go here...

      q-btn(
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        :to="toRoute"
        label="Go Back"
        no-caps)
</template>

<script>
export default {
  name: 'Error404',
  computed: {
    toRoute () { return this.$route.query.to || 'explore' }
  }
}
</script>
