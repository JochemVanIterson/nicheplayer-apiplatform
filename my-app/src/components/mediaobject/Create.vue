<template>
  <div>
    <Toolbar :handle-submit="onSendForm" :handle-reset="resetForm">
      <Breadcrumb :values="$route.meta.breadcrumb" slot="left" />
    </Toolbar>
    <MediaObjectForm
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
import MediaObjectForm from './Form';
import { Breadcrumb, Toolbar, Loading } from '../../common/components';
import CreateMixin from '../../common/mixins/CreateMixin';
const servicePrefix = 'MediaObject';
const { getters, actions } = create(servicePrefix);

export default {
  name: 'MediaObjectCreate',
  servicePrefix,
  mixins: [CreateMixin],
  components: {
    MediaObjectForm,
    Breadcrumb,
    Toolbar,
    Loading,
  },

  data() {
    return {
      item: {
      },
    };
  },

  computed: getters,
  methods: actions,
};
</script>
