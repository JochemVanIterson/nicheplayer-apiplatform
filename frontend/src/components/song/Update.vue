<template>
  <div>
    <Toolbar :handle-submit="onSendForm" :handle-reset="resetForm" :handle-delete="del">
      <Breadcrumb :values="$route.meta.breadcrumb" :item="item" slot="left" />
    </Toolbar>
    <SongForm
      ref="updateForm"
      v-if="item"
      :values="item"
      :errors="violations"
      :handle-submit="onSendForm"
    />
    <Loading :showing="isLoading || deleteLoading" />
  </div>
</template>

<script>
import { update } from '../../utils/vuexer';
import SongForm from './Form.vue';
import { Breadcrumb, Toolbar, Loading } from '../../common/components';
import UpdateMixin from '../../common/mixins/UpdateMixin';
const servicePrefix = 'Song';
const { getters, actions } = update(servicePrefix);

export default {
  name: 'SongUpdate',
  servicePrefix,
  mixins: [UpdateMixin],
  components: {
    SongForm,
    Breadcrumb,
    Toolbar,
    Loading,
  },

  computed: getters,
  methods: actions,
};
</script>
