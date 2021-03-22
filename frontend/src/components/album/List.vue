<template>
  <div>
    <Toolbar :handle-add="addHandler">
      <Breadcrumb :values="$route.meta.breadcrumb" slot="left" />
    </Toolbar>
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
import { ActionCell, Breadcrumb, Toolbar } from '../../common/components';
import ListMixin from '../../common/mixins/ListMixin';
const servicePrefix = 'Album';
const { getters, actions } = list(servicePrefix);

export default {
  name: 'AlbumList',
  servicePrefix,
  mixins: [ListMixin],
  components: {
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
          name: 'name',
          field: 'name',
          label: this.$t('Name'),
          sortable: true,
        },
        {
          name: 'artist',
          field: 'artist',
          label: this.$t('Artist'),
          sortable: true,
        },
        {
          name: 'releaseDate',
          field: 'releaseDate',
          label: this.$t('ReleaseDate'),
          format: val => this.formatDateTime(val, 'long'),
          sortable: true,
        },
        {
          name: 'albumArt',
          field: 'albumArt',
          label: this.$t('AlbumArt'),
        }
      ],
    };
  },

  computed: getters,
  methods: actions,
};
</script>
