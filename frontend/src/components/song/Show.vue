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

          
            <td>{{ $t('SongArtist') }}</td>
            <td>
                        {{ item['songArtist'] }}
            </td>

          </tr>
          
          <tr>
            <td>{{ $t('File') }}</td>
            <td>
                        {{ item['file'] && item['file'].name }}
            </td>

          
            <td>{{ $t('Duration') }}</td>
            <td>
            {{ $t(item['duration']) }}            </td>

          </tr>
          
          <tr>
            <td>{{ $t('PlayHistory') }}</td>
            <td>
                        {{ item['playHistory'] && item['playHistory'].name }}
            </td>

          
            <td>{{ $t('Album') }}</td>
            <td>
                        {{ item['album'] && item['album'].name }}
            </td>

          </tr>
          
          <tr>
            <td>{{ $t('TrackNumber') }}</td>
            <td>
            {{ $t(item['trackNumber']) }}            </td>

          
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
const servicePrefix = 'Song';
const { getters, actions } = show(servicePrefix);

export default {
  name: 'SongShow',
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
