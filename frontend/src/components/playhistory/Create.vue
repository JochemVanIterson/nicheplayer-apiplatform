<template>
  <div>
    <Toolbar :handle-submit="onSendForm" :handle-reset="resetForm">
      <Breadcrumb :values="$route.meta.breadcrumb" slot="left" />
    </Toolbar>
    <PlayHistoryForm
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
import PlayHistoryForm from './Form';
import { Breadcrumb, Toolbar, Loading } from '../../common/components';
import CreateMixin from '../../common/mixins/CreateMixin';
const servicePrefix = 'PlayHistory';
const { getters, actions } = create(servicePrefix);

export default {
  name: 'PlayHistoryCreate',
  servicePrefix,
  mixins: [CreateMixin],
  components: {
    PlayHistoryForm,
    Breadcrumb,
    Toolbar,
    Loading,
  },

  data() {
    return {
      item: {
        timestamp: new Date().toISOString(),
      },
    };
  },

  computed: getters,
  methods: actions,
};
</script>
