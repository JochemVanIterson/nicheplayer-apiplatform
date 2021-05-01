<template lang="pug">
q-page(padding)
  q-card(flat bordered)
    q-card-section
      .q-gutter-y-md
        div
          .text-caption.text-weight-light Name
          .text {{data.name}}
        div
          .text-caption.text-weight-light Type
          .text {{data.type}}
        div
          .text-caption.text-weight-light Config
          .text {{data.config}}
    //- q-card-actions(align="right")
    //-   q-btn(color="primary" icon="edit" padding="xs md" @click="$router.push(`/admin/sources/${id}/edit`)") Edit

</template>

<script>
import { date } from 'quasar'

export default {
  name: 'PageAdminSourcesShow',
  data () {
    return {}
  },
  computed: {
    id () { return this.$route.params.id },
    data () { return this.$store.getters['cache/sources/getObjectJoined'](this.id) }
  },
  methods: {
    parseDuration (seconds) {
      const newDate = date.buildDate({ minutes: 0, seconds: seconds })
      return date.formatDate(newDate, 'mm:ss')
    }
  },
  mounted () {
    this.$store.dispatch('cache/sources/getAllFromAPI')
  }
}
</script>
