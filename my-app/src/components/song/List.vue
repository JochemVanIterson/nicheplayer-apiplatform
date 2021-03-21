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
const servicePrefix = 'Song';
const { getters, actions } = list(servicePrefix);

export default {
  name: 'SongList',
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
          name: 'songArtist',
          field: 'songArtist',
          label: this.$t('SongArtist'),
},
        {
          name: 'file',
          field: 'file',
          label: this.$t('File'),
},
        {
          name: 'duration',
          field: 'duration',
          label: this.$t('Duration'),
          format: val => this.$t(val),
},
        {
          name: 'playHistory',
          field: 'playHistory',
          label: this.$t('PlayHistory'),
},
        {
          name: 'album',
          field: 'album',
          label: this.$t('Album'),
},
        {
          name: 'trackNumber',
          field: 'trackNumber',
          label: this.$t('TrackNumber'),
          format: val => this.$t(val),
          sortable: true,
},
      ],
    };
  },

  computed: getters,
  methods: actions,
};
</script>
