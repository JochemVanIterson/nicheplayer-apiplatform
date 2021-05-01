<template lang="pug">
  q-field.col(:filled="filled" :stack-label="stackLabel" :label="label")
    template(v-slot:control)
      .text {{chosenFileName}}
    template(v-slot:append)
      q-btn(flat round dense icon="apps" @click.stop="openMediaChooser")
</template>

<script>
import MediaBrowser from 'components/MediaBrowser'

export default {
  name: 'MediaBrowser',
  props: {
    type: {
      default: 'All',
      type: String
    },
    value: String,
    label: String,
    filled: Boolean,
    stackLabel: Boolean
  },
  data () {
    return {
      
    }
  },
  computed: {
    chosenId () {
      console.log(this.value)
      if (!this.value) return -1
      else return parseInt(this.value.replace('/api/media_objects/', ''))
    },
    chosenFile () { return this.$store.getters['cache/mediaObjects/getObject'](this.chosenId) },
    chosenFileName () {
      if (!this.value) return 'None'
      if (!this.chosenFile) return 'None'
      return this.chosenFile.fileName
    },
  },
  methods: {
    openMediaChooser () {
      this.$q.dialog({
        component: MediaBrowser,
        parent: this,
        type: 'Audio',
        value: this.value
      }).onOk((mediaObject) => {
        this.$emit('input', mediaObject['@id'])
      })
    }
  },
  mounted () {
    this.$store.dispatch("cache/mediaObjects/getFromAPI", this.chosenId)
  }
}
</script>
