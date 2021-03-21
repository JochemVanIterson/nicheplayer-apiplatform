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
            <td>{{ $t('Meta') }}</td>
            <td>
                        {{ item['meta'] }}
            </td>

          
            <td>{{ $t('Source') }}</td>
            <td>
                        {{ item['source'] && item['source'].name }}
            </td>

          </tr>
          
          <tr>
            <td>{{ $t('ContentUrl') }}</td>
            <td>
                        {{ item['contentUrl'] }}
            </td>

          
            <td>{{ $t('Mime') }}</td>
            <td>
                        {{ item['mime'] }}
            </td>

          </tr>
          
          <tr>
            <td>{{ $t('Type') }}</td>
            <td>
                        {{ item['type'] }}
            </td>

          
            <td>{{ $t('Size') }}</td>
            <td>
            {{ $t(item['size']) }}            </td>

          </tr>
          
          <tr>
            <td>{{ $t('FileName') }}</td>
            <td>
                        {{ item['fileName'] }}
            </td>

          
            <td></td>
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
const servicePrefix = 'MediaObject';
const { getters, actions } = show(servicePrefix);

export default {
  name: 'MediaObjectShow',
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
