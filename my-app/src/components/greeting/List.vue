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
import { list } from '../../utils/vuexer'
import { ActionCell, Breadcrumb, Toolbar } from '../../common/components'
import ListMixin from '../../common/mixins/ListMixin'
const servicePrefix = 'Greeting'
const { getters, actions } = list(servicePrefix)

export default {
  name: 'GreetingList',
  servicePrefix,
  mixins: [ListMixin],
  components: {
    Breadcrumb,
    ActionCell,
    Toolbar
  },

  data () {
    return {
      columns: [
        { name: 'action' },
        { name: 'id', field: '@id', label: this.$t('id') },
        {
          name: 'name',
          field: 'name',
          label: this.$t('Name')
        }
      ]
    }
  },

  computed: getters,
  methods: actions
}
</script>
