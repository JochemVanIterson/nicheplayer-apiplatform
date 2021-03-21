<template>
  <div>
    <Toolbar :handle-add="addHandler">
      <Breadcrumb :values="$route.meta.breadcrumb" slot="left" />
    </Toolbar>
    <DataFilter
      :handle-filter="onSendFilter"
      :handle-reset="resetFilter"
      :expanded="expandedFilter"
    ><MediaObjectFilterForm ref="filterForm" :values="filtration" slot="filter" /></DataFilter>
    <q-table
      :data="items"
      :columns="columns"
      :pagination.sync="pagination"
      @request="onRequest"
      row-key="id"
      :no-data-label="$t('Data unavailable')"
      :no-results-label="$t('No results')"
      :loading-label="$t('Loading...')"
      :rows-per-page-label="$t('Records per page:')"
      flat
      :loading="isLoading"
    >
      <ActionCell
        slot="body-cell-action"
        slot-scope="props"
        :handle-show="() => showHandler(props.row)"
        :handle-edit="() => editHandler(props.row)"
        :handle-delete="() => deleteHandler(props.row)"
      />
    </q-table>
  </div>
</template>

<script>
import { list } from '../../utils/vuexer';
import MediaObjectFilterForm from './Filter';
import { ActionCell, Breadcrumb, Toolbar, DataFilter } from '../../common/components';
import ListMixin from '../../common/mixins/ListMixin';
const servicePrefix = 'MediaObject';
const { getters, actions } = list(servicePrefix);

export default {
  name: 'MediaObjectList',
  servicePrefix,
  mixins: [ListMixin],
  components: {
    MediaObjectFilterForm,
    DataFilter,
    Breadcrumb,
    ActionCell,
    Toolbar,
  },

  data() {
    return {
      columns: [
        { name: 'action' },
        { name: 'id', field: '@id', label: this.$t('id') },
        {
          name: 'meta',
          field: 'meta',
          label: this.$t('Meta'),
        },
        {
          name: 'source',
          field: 'source',
          label: this.$t('Source'),
        },
        {
          name: 'mime',
          field: 'mime',
          label: this.$t('Mime'),
        },
        {
          name: 'type',
          field: 'type',
          label: this.$t('Type'),
          sortable: true,
        },
        {
          name: 'size',
          field: 'size',
          label: this.$t('Size'),
          format: val => this.$t(val),
          sortable: true,
        },
        {
          name: 'fileName',
          field: 'fileName',
          label: this.$t('FileName'),
          sortable: true,
        },
      ],
    };
  },

  computed: getters,
  methods: actions,
};
</script>
