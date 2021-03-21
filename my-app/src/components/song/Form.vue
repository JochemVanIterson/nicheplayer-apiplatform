<template>
  <q-form class="q-pa-md q-col-gutter-y-md" @keydown.enter.prevent="handleSubmit">
    <div class="row q-gutter-md">
      <q-input
        v-model="item.name"
        filled
        type="text"
        :label="$t('Name')"
        lazy-rules
        :rules="[val => !!val || $t('Field is required'), isInvalid('name')]"
        class="col-12 col-md"
      >
        <template v-slot:append>
          <q-icon name="close" @click.prevent.stop="item.name = ''" class="cursor-pointer" />
        </template>
      </q-input>
    
      <q-input
        v-model="item.songArtist"
        filled
        type="text"
        :label="$t('SongArtist')"
        lazy-rules
        :rules="[isInvalid('songArtist')]"
        class="col-12 col-md"
      >
        <template v-slot:append>
          <q-icon name="close" @click.prevent.stop="item.songArtist = ''" class="cursor-pointer" />
        </template>
      </q-input>
    </div>
    
    <div class="row q-gutter-md">
      <q-select
        v-model="item.file"
        filled
        :label="$t('File')"
        lazy-rules
        :rules="[val => !!val || $t('Field is required'), isInvalid('file')]"
        @filter="fileFilterFn"
        :options="fileSelectItems"
        option-value="@id"
        option-label="name"
        class="col-12 col-md"
        emit-value
        map-options
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">{{ $t('No results') }}</q-item-section>
          </q-item>
        </template>
        <template v-slot:append>
          <q-icon name="close" @click.prevent.stop="item.file = ''" class="cursor-pointer" />
        </template>
      </q-select>
    
      <q-input
      v-model.number="item.duration"
      filled
      type="number"
      :label="$t('Duration')"
      lazy-rules
      :rules="[isInvalid('duration')]"
      class="col-12 col-md"
      >
        <template v-slot:append>
          <q-icon name="close" @click.prevent.stop="item.duration = ''" class="cursor-pointer" />
        </template>
      </q-input>
    </div>
    
    <div class="row q-gutter-md">
      <q-select
        v-model="item.playHistory"
        filled
        :label="$t('PlayHistory')"
        lazy-rules
        :rules="[isInvalid('playHistory')]"
        @filter="playHistoryFilterFn"
        :options="playHistorySelectItems"
        option-value="@id"
        option-label="name"
        class="col-12 col-md"
        emit-value
        map-options
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">{{ $t('No results') }}</q-item-section>
          </q-item>
        </template>
        <template v-slot:append>
          <q-icon name="close" @click.prevent.stop="item.playHistory = ''" class="cursor-pointer" />
        </template>
      </q-select>
    
      <q-select
        v-model="item.album"
        filled
        :label="$t('Album')"
        lazy-rules
        :rules="[isInvalid('album')]"
        @filter="albumFilterFn"
        :options="albumSelectItems"
        option-value="@id"
        option-label="name"
        class="col-12 col-md"
        emit-value
        map-options
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">{{ $t('No results') }}</q-item-section>
          </q-item>
        </template>
        <template v-slot:append>
          <q-icon name="close" @click.prevent.stop="item.album = ''" class="cursor-pointer" />
        </template>
      </q-select>
    </div>
    
    <div class="row q-gutter-md">
      <q-input
      v-model.number="item.trackNumber"
      filled
      type="number"
      :label="$t('TrackNumber')"
      lazy-rules
      :rules="[isInvalid('trackNumber')]"
      class="col-12 col-md"
      >
        <template v-slot:append>
          <q-icon name="close" @click.prevent.stop="item.trackNumber = ''" class="cursor-pointer" />
        </template>
      </q-input>
    
      <div class="col-12 col-md"></div>
    </div>
    
  </q-form>
</template>

<script>
import { form } from '../../utils/vuexer';

const { getters, actions, mutations } = form([
  { name: 'file', module: 'MediaObject' },
  { name: 'playHistory', module: 'PlayHistory' },
  { name: 'album', module: 'Album' },
]);

export default {
  name: 'SongForm',

  props: {
    values: {
      type: Object,
      required: true,
    },

    errors: {
      type: Object,
      default: () => {},
    },

    initialValues: {
      type: Object,
      default: () => {},
    },

    handleSubmit: {
      type: Function,
      required: true
    }
  },

  computed: {
    ...getters,

    // eslint-disable-next-line
    item() {
      return this.initialValues || this.values;
    },

    violations() {
      return this.errors || {};
    },
  },

  methods: {
    ...actions,
    ...mutations,

    isInvalid(/* key */) {
      return true;
      // return val => {
      //   if (typeof val == 'number') {
      //     if (val > 0) {
      //       return true;
      //     } else {
      //       return this.$t('Please, insert a value bigger than zero!');
      //     }
      //   }
      //   if (!(val && val.length > 0)) return this.$t('Please type something');
      //   return Object.keys(this.violations).length === 0 && !this.violations[key];
      // };
    },

    fileFilterFn(val, update /* , abort */) {
      const params = {
        'exists[file]': false,
      };
      const template = JSON.stringify(params);

      return this.fileSelectItems !== null && this.fileSelectItemsTemplate === template
        ? update()
        : this.fileGetSelectItems({ params }).then(() => {
            this.fileSetSelectItemsTemplate(template);
            update();
          });
    },
    playHistoryFilterFn(val, update /* , abort */) {
      const params = {
        'exists[playHistory]': false,
      };
      const template = JSON.stringify(params);

      return this.playHistorySelectItems !== null && this.playHistorySelectItemsTemplate === template
        ? update()
        : this.playHistoryGetSelectItems({ params }).then(() => {
            this.playHistorySetSelectItemsTemplate(template);
            update();
          });
    },
    albumFilterFn(val, update /* , abort */) {
      const params = {
        'exists[album]': false,
      };
      const template = JSON.stringify(params);

      return this.albumSelectItems !== null && this.albumSelectItemsTemplate === template
        ? update()
        : this.albumGetSelectItems({ params }).then(() => {
            this.albumSetSelectItemsTemplate(template);
            update();
          });
    },
  },
};
</script>
