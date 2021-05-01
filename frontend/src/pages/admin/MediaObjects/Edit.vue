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
        .text-caption Metadata
        q-markup-table(flat bordered)
          thead
            tr
              th.text-left Key (* requered)
              th.text-left Value
              th
          tbody
            tr.q-tr--no-hover(v-for="item, key in meta" :key="'meta_'+key")
              q-td(auto-width)
                span {{key}}
                span(v-if="metaDefault.hasOwnProperty(key)") *
              td
                q-popup-edit(:value="showMetaItem(key)" @input="updateMetaItem($event, key)" buttons)
                  q-input(:value="showMetaItem(key)" @input="updateMetaItem($event, key)" dense autofocus counter)
                span {{item}}
              q-td(auto-width)
                q-btn(v-if="!metaDefault.hasOwnProperty(key)" @click="deleteMetaItem(key)" icon="delete" color="red" flat round dense)
        q-select(
          label="Source"
          filled
          v-model="source"
          :options="sources"
          option-value="@id"
          :option-label="(item) => item.name"
          emit-value
          map-options disable
          @filter="filterSources")
    q-card-actions(align="right")
      q-btn(flat color="red" icon="delete" padding="xs md" @click="deleteAction") Delete
      q-btn(:disabled="!savable" color="primary" icon="save" padding="xs md" @click="saveAction") Save
</template>

<script>
import _ from 'lodash'

const metaDefaultImage = {
  colors: [],
  dimensions: { width: null, height: null }
}
const metaDefaultAudio = {
  year: null,
  album: '',
  title: '',
  track: null,
  artist: '',
  duration: null,
  totaltracks: null
}

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
      get () { return _.defaultsDeep({}, (this.changedStore.meta === undefined ? this.oldStore.meta : this.changedStore.meta), this.metaDefault) },
      set (val) { this.$set(this.changedStore, 'meta', val) }
    },
    metaDefault () {
      if (this.type === 'image') return metaDefaultImage
      else if (this.type === 'audio') return metaDefaultAudio
      else return {}
    },
    source: {
      get () { return this.changedStore.source === undefined ? this.oldStore.source : this.changedStore.source },
      set (val) { this.$set(this.changedStore, 'source', val) }
    },

    savable () { return Object.keys(this.changedStore).length > 0 }
  },
  methods: {
    showMetaItem (key) {
      // if (_.isArray(this.meta[key])) return JSON.stringify(this.meta[key])
      if (_.isPlainObject(this.meta[key])) return JSON.stringify(this.meta[key])
      else return this.meta[key]
    },
    updateMetaItem (value, key) {
      if (!this.changedStore.meta) this.$set(this.changedStore, 'meta', _.clone(this.meta))

      const originObject = _.defaultsDeep({}, this.oldStore.meta, this.metaDefault)
      if (_.isString(value)) {
        if (_.isArray(originObject[key])) value = value.split(',')
        else if (_.isPlainObject(originObject[key])) value = JSON.parse(value)
      }

      console.log(value, key, this.changedStore)
      this.$set(this.changedStore.meta, key, value)
    },
    deleteMetaItem (key) {
      if (!this.changedStore.meta) this.$set(this.changedStore, 'meta', _.clone(this.meta))
      this.$delete(this.changedStore.meta, key)
    },
    filterSources (val, update, abort) {
      this.$store.dispatch('cache/sources/getAllFromAPI').then(() => {
        update()
      })
    },
    saveAction () {
      const newStore = {}
      _.merge(newStore, this.oldStore, this.changedStore)
      Object.keys(newStore.meta).forEach(key => [undefined, null, ''].includes(newStore.meta[key]) ? delete newStore.meta[key] : {});
      this.$store.dispatch('cache/mediaObjects/updateAPI', { id: this.id, payload: newStore }).then((res) => {
        console.log(res)
        this.$router.go(-1)
      })
    },
    deleteAction () {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Would you like to delete this item',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$store.dispatch('cache/mediaObjects/deleteAPI', this.id).then((res) => {
          console.log(res)
          this.$router.replace('/admin/media_objects')
        })
      })
    }
  },
  mounted () {
    this.$store.dispatch('cache/mediaObjects/getAllFromAPI')
  }
}
</script>
