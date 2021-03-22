<template>
  <div>
    <Toolbar :handle-submit="onSendForm" :handle-reset="resetForm">
      <Breadcrumb :values="$route.meta.breadcrumb" slot="left" />
    </Toolbar>
    <AlbumForm
      ref="createForm"
      :values="item"
      :errors="violations"
      :handle-submit="onSendForm"
    />
    <Loading :showing="isLoading" />
  </div>
</template>

<script>
import { create } from '../../utils/vuexer';
import AlbumForm from './Form';
import { Breadcrumb, Toolbar, Loading } from '../../common/components';
import CreateMixin from '../../common/mixins/CreateMixin';
const servicePrefix = 'Album';
const { getters, actions } = create(servicePrefix);

export default {
  name: 'AlbumCreate',
  servicePrefix,
  mixins: [CreateMixin],
  components: {
    AlbumForm,
    Breadcrumb,
    Toolbar,
    Loading,
  },

  data() {
    return {
      item: {
        releaseDate: new Date().toISOString(),
      },
    };
  },

  computed: getters,
  methods: actions,
};
</script>
