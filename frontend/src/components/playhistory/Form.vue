<template>
  <q-form class="q-pa-md q-col-gutter-y-md" @keydown.enter.prevent="handleSubmit">
    <div class="row q-gutter-md">
      <q-select
        v-model="item.user"
        filled
        :label="$t('User')"
        lazy-rules
        :rules="[isInvalid('user')]"
        @filter="userFilterFn"
        :options="userSelectItems"
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
          <q-icon name="close" @click.prevent.stop="item.user = ''" class="cursor-pointer" />
        </template>
      </q-select>
    
      <q-select
        v-model="item.song"
        filled
        :label="$t('Song')"
        lazy-rules
        :rules="[isInvalid('song')]"
        @filter="songFilterFn"
        :options="songSelectItems"
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
          <q-icon name="close" @click.prevent.stop="item.song = ''" class="cursor-pointer" />
        </template>
      </q-select>
    </div>
    
    <div class="row q-gutter-md">
      <InputDate
        readonly
        filled
        :value="item.timestamp"
        :set="
          v => {
            item.timestamp = new Date(v).toISOString();
          }
        "
        :label="$t('Timestamp')"
        class="col-12 col-md"
        kind="datetime"
        :rules="['datetime']"
      />
    
      <q-input
      v-model.number="item.duration"
      filled
      type="number"
      :label="$t('Duration')"
      lazy-rules
      :rules="[val => !!val || $t('Field is required'), isInvalid('duration')]"
      class="col-12 col-md"
      >
        <template v-slot:append>
          <q-icon name="close" @click.prevent.stop="item.duration = ''" class="cursor-pointer" />
        </template>
      </q-input>
    </div>
    
  </q-form>
</template>

<script>
import { form } from '../../utils/vuexer';
import InputDate from '../../common/components/InputDate';

const { getters, actions, mutations } = form([
  { name: 'user', module: 'User' },
  { name: 'song', module: 'Song' },
]);

export default {
  name: 'PlayHistoryForm',

  components: {
    InputDate,
  },

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

    userFilterFn(val, update /* , abort */) {
      const params = {
        'exists[user]': false,
      };
      const template = JSON.stringify(params);

      return this.userSelectItems !== null && this.userSelectItemsTemplate === template
        ? update()
        : this.userGetSelectItems({ params }).then(() => {
            this.userSetSelectItemsTemplate(template);
            update();
          });
    },
    songFilterFn(val, update /* , abort */) {
      const params = {
        'exists[song]': false,
      };
      const template = JSON.stringify(params);

      return this.songSelectItems !== null && this.songSelectItemsTemplate === template
        ? update()
        : this.songGetSelectItems({ params }).then(() => {
            this.songSetSelectItemsTemplate(template);
            update();
          });
    },
  },
};
</script>
