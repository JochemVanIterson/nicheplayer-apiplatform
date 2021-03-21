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
            <td>{{ $t('Name') }}</td>
            <td>
                        {{ item['name'] }}
            </td>

          
            <td>{{ $t('Artist') }}</td>
            <td>
                        {{ item['artist'] }}
            </td>

          </tr>
          
          <tr>
            <td>{{ $t('ReleaseDate') }}</td>
            <td>
            {{ formatDateTime(item['releaseDate'], 'long') }}            </td>

          
            <td>{{ $t('AlbumArt') }}</td>
            <td>
                        {{ item['albumArt'] && item['albumArt'].name }}
            </td>

          </tr>
          
          <tr>
            <td>{{ $t('Songs') }}</td>
            <td>
                        {{ item['songs'] && item['songs'].name }}
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
const servicePrefix = 'Album';
const { getters, actions } = show(servicePrefix);

export default {
  name: 'AlbumShow',
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
