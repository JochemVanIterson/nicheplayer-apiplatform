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
        v-model="item.artist"
        filled
        type="text"
        :label="$t('Artist')"
        lazy-rules
        :rules="[val => !!val || $t('Field is required'), isInvalid('artist')]"
        class="col-12 col-md"
      >
        <template v-slot:append>
          <q-icon name="close" @click.prevent.stop="item.artist = ''" class="cursor-pointer" />
        </template>
      </q-input>
    </div>

    <div class="row q-gutter-md">
      <InputDate
        readonly
        filled
        :value="item.releaseDate"
        :set="
          v => {
            item.releaseDate = new Date(v).toISOString();
          }
        "
        :label="$t('ReleaseDate')"
        class="col-12 col-md"
        kind="datetime"
        :rules="['datetime']"
      />

      <q-select
        v-model="item.albumArt"
        filled
        :label="$t('AlbumArt')"
        lazy-rules
        :rules="[isInvalid('albumArt')]"
        @filter="albumArtFilterFn"
        :options="albumArtSelectItems"
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
          <q-icon name="close" @click.prevent.stop="item.albumArt = ''" class="cursor-pointer" />
        </template>
      </q-select>
    </div>

    <div class="row q-gutter-md">
      <q-select
        v-model="item.songs"
        filled
        :label="$t('Songs')"
        lazy-rules
        :rules="[isInvalid('songs')]"
        @filter="songsFilterFn"
        :options="songsSelectItems"
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
          <q-icon name="close" @click.prevent.stop="item.songs = ''" class="cursor-pointer" />
        </template>
      </q-select>

      <div class="col-12 col-md"></div>
    </div>

  </q-form>
</template>

<script>
import { form } from '../../utils/vuexer'
import InputDate from '../../common/components/InputDate'

const { getters, actions, mutations } = form([
  { name: 'albumArt', module: 'MediaObject' },
  { name: 'songs', module: 'Song' }
])

export default {
  name: 'AlbumForm',

  components: {
    InputDate
  },

  props: {
    values: {
      type: Object,
      required: true
    },

    errors: {
      type: Object,
      default: () => {}
    },

    initialValues: {
      type: Object,
      default: () => {}
    },

    handleSubmit: {
      type: Function,
      required: true
    }
  },

  computed: {
    ...getters,

    // eslint-disable-next-line
    item () {
      return this.initialValues || this.values
    },

    violations () {
      return this.errors || {}
    }
  },

  methods: {
    ...actions,
    ...mutations,

    isInvalid (/* key */) {
      return true
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

    albumArtFilterFn (val, update /* , abort */) {
      const params = {
        'exists[albumArt]': false
      }
      const template = JSON.stringify(params)

      return this.albumArtSelectItems !== null && this.albumArtSelectItemsTemplate === template
        ? update()
        : this.albumArtGetSelectItems({ params }).then(() => {
          this.albumArtSetSelectItemsTemplate(template)
          update()
        })
    },
    songsFilterFn (val, update /* , abort */) {
      const params = {
        'exists[songs]': false
      }
      const template = JSON.stringify(params)

      return this.songsSelectItems !== null && this.songsSelectItemsTemplate === template
        ? update()
        : this.songsGetSelectItems({ params }).then(() => {
          this.songsSetSelectItemsTemplate(template)
          update()
        })
    }
  }
}
</script>
