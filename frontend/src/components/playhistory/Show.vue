<template>
  <div>
    <Toolbar :handle-delete="del">
      <Breadcrumb :values="$route.meta.breadcrumb" :item="item" slot="left" />
    </Toolbar>

    <div v-if="item" class="table-responsive">
      <q-markup-table>
        <thead>
          <tr>
            <th>{{ $t('Field') }}</th>
            <th>{{ $t('Value') }}</th>

            <th>{{ $t('Field') }}</th>
            <th>{{ $t('Value') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ $t('User') }}</td>
            <td>
                        {{ item['user'] && item['user'].name }}
            </td>

          
            <td>{{ $t('Song') }}</td>
            <td>
                        {{ item['song'] && item['song'].name }}
            </td>

          </tr>
          
          <tr>
            <td>{{ $t('Timestamp') }}</td>
            <td>
            {{ formatDateTime(item['timestamp'], 'long') }}            </td>

          
            <td>{{ $t('Duration') }}</td>
            <td>
            {{ $t(item['duration']) }}            </td>

          </tr>
          
        </tbody>
      </q-markup-table>
    </div>
    <Loading :showing="isLoading" />
  </div>
</template>

<script>
import { show } from '../../utils/vuexer';
import { Breadcrumb, Toolbar, Loading } from '../../common/components';
import ShowMixin from '../../common/mixins/ShowMixin';
const servicePrefix = 'PlayHistory';
const { getters, actions } = show(servicePrefix);

export default {
  name: 'PlayHistoryShow',
  servicePrefix,
  mixins: [ShowMixin],
  components: {
    Breadcrumb,
    Toolbar,
    Loading,
  },

  computed: getters,
  methods: actions,
};
</script>
