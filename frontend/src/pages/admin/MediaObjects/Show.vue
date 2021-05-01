<template lang="pug">
q-page(padding)
  q-card(flat bordered)
    q-card-section
      .q-gutter-y-md
        div
          .text-caption.text-weight-light File
          a(:href="data.contentUrl") {{data.fileName}}
        div
          .text-caption.text-weight-light Type
          .text {{data.type}}
        div
          .text-caption.text-weight-light Access
          .text {{data.access}}
        div
          .text-caption.text-weight-light Size
          .text {{parseSize(data.size)}}
        div
          .text-caption.text-weight-light Preview
          div(v-if="data.type === 'image'")
            q-img(:src="data.contentUrl" style="max-width: 300px")
          div(v-else-if="data.type === 'audio'")
            audio(controls :src="data.contentUrl")
          div(v-else) {{data.contentUrl}}
        div
          .text-caption.text-weight-light Metadate
          q-markup-table(flat bordered)
            tbody
              tr.q-tr--no-hover(v-for="item, key in data.meta" :key="'meta_'+key")
                td {{key}}
                td {{item}}
        div
          .text-caption.text-weight-light Source
          .text {{data.source}}
    q-card-actions(align="right")
      q-btn(color="primary" icon="edit" padding="xs md" @click="$router.push(`/admin/media_objects/${id}/edit`)") Edit

</template>

<script>
import { format } from 'quasar'

export default {
  name: 'PageAdminMediaObjectsShow',
  data () {
    return {}
  },
  computed: {
    id () { return this.$route.params.id },
    data () { return this.$store.getters['cache/mediaObjects/getObjectJoined'](this.id) },
    songs () { return this.data.songs.map((e) => { return this.$store.getters['cache/songs/getObject'](e.replace('/api/songs/', '')) }) }
  },
  methods: {
    parseSize (value = 0) {
      return format.humanStorageSize(value)
    }
  },
  mounted () {
    this.$store.dispatch('cache/mediaObjects/getAllFromAPI')
  }
}
</script>
