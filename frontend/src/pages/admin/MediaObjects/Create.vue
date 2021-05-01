<template lang="pug">
q-page(padding)
  q-card(flat bordered)
    q-card-section
      .q-gutter-y-md
        .text-h5 Upload media
        q-uploader.full-width(
          :url="uploaderURL"
          field-name="file"
          label="Upload files"
          color="primary"
          flat
          bordered
          hide-upload-btn
          ref="uploader"
          :form-fields="[{name: 'access', value: access}]"
          with-credentials
          @uploaded="uploadSuccess")
        q-select(filled v-model="access" :options="accessOptions" emit-value map-options label="Access")
    q-card-actions(align="right")
      q-btn(:disabled="!savable" color="primary" icon="save" padding="xs md" @click="saveAction") Upload
</template>

<script>
export default {
  name: 'PageAdminMediaObjectsCreate',
  data () {
    return {
      isPwd: true,
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
      ],
      newStore: {
        access: ''
      }
    }
  },
  computed: {
    uploaderURL () { return this.$store.getters['system/getApiURL']('/media_objects') },
    access: {
      get () { return this.newStore.access },
      set (val) { this.$set(this.newStore, 'access', val) }
    },

    savable () { return this.access !== '' }
  },
  methods: {
    saveAction () {
      this.$refs.uploader.upload()
    },
    uploadSuccess () {
      this.$router.go(-1)
    }
  },
  mounted () {
  }
}
</script>
