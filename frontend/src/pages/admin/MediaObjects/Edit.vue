<template lang="pug">
q-page(padding)
  q-card(flat bordered)
    q-card-section
      .q-gutter-y-md
        .text-h5 Media
        a(:href="contentUrl") {{fileName}}
        q-input(filled v-model="contentUrl" disable label="Content Url")
        q-select(filled v-model="type" :options="typeOptions" emit-value map-options label="Type")
        q-select(filled v-model="access" :options="accessOptions" emit-value map-options label="Access")
        q-input(filled v-model="meta" label="Meta")
        q-select(
          label="Source"
          filled
          v-model="source"
          :options="sources"
          option-value="@id"
          :option-label="(item) => item.name"
          emit-value
          map-options
          @filter="filterSources")
    q-card-actions(align="right")
      q-btn(flat color="red" icon="delete" padding="xs md") Delete
      q-btn(:disabled="!savable" color="primary" icon="save" padding="xs md") Save
</template>

<script>
export default {
  name: 'PageAdminMediaObjectsCreate',
  data () {
    return {
      changedStore: {},
      typeOptions: [
        {
          label: 'Image',
          value: 'image'
        },
        {
          label: 'Audio',
          value: 'audio'
        }
      ],
      accessOptions: [
        {
          label: 'World',
          value: 'world'
        },
        {
          label: 'Login',
          value: 'login'
        },
        {
          label: 'Owner',
          value: 'owner'
        }
      ]
    }
  },
  computed: {
    id () { return this.$route.params.id },
    oldStore () { return this.$store.getters['cache/mediaObjects/getObjectJoined'](this.id) },

    sources () { return this.$store.getters['cache/sources/getAll'] },

    contentUrl: {
      get () { return this.changedStore.contentUrl === undefined ? this.oldStore.contentUrl : this.changedStore.contentUrl },
      set (val) { this.$set(this.changedStore, 'contentUrl', val) }
    },
    fileName: {
      get () { return this.changedStore.fileName === undefined ? this.oldStore.fileName : this.changedStore.fileName },
      set (val) { this.$set(this.changedStore, 'fileName', val) }
    },
    type: {
      get () { return this.changedStore.type === undefined ? this.oldStore.type : this.changedStore.type },
      set (val) { this.$set(this.changedStore, 'type', val) }
    },
    access: {
      get () { return this.changedStore.access === undefined ? this.oldStore.access : this.changedStore.access },
      set (val) { this.$set(this.changedStore, 'access', val) }
    },
    meta: {
      get () { return this.changedStore.meta === undefined ? this.oldStore.meta : this.changedStore.meta },
      set (val) { this.$set(this.changedStore, 'meta', val) }
    },
    source: {
      get () { return this.changedStore.source === undefined ? this.oldStore.source : this.changedStore.source },
      set (val) { this.$set(this.changedStore, 'source', val) }
    },

    savable () { return Object.keys(this.changedStore).length > 0 }
  },
  methods: {
    filterSources (val, update, abort) {
      this.$store.dispatch('cache/sources/getAllFromAPI').then(() => {
        update()
      })
    }
  },
  mounted () {
    this.$store.dispatch('cache/mediaObjects/getAllFromAPI')
  }
}
</script>
