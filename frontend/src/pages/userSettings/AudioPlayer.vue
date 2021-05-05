<template lang="pug">
  q-page(padding)
    q-card(flat bordered)
      q-list
        q-item-label(header) Audio effects
        q-item(tag="label" v-ripple)
          q-item-section
            q-item-label Enable WebAudio
            q-item-label(caption) WebAudio is required to use the audio effects, but causes the music to be loaded slower. Changing this will reset the player.
          q-item-section(side top)
            q-toggle(color="primary" v-model="enableWebAudio")
</template>

<script>
export default {
  name: 'SettingsAudioPlayerPage',
  computed: {
    enableWebAudio: {
      get () { return this.$store.state.system.enableWebAudio },
      set (val) {
        this.$store.dispatch('audioplayer/setIsPlaying', false)
        this.$store.dispatch('audioplayer/clearPlaylist')
        this.$store.commit('system/setWebAudio', val)
      }
    }
  }
}
</script>
