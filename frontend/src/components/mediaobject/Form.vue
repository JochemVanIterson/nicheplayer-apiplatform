<template>
  <q-form class="q-pa-md q-col-gutter-y-md" @keydown.enter.prevent="handleSubmit">
    <div class="row q-gutter-md">
      <q-input
        v-model="item.meta"
        filled
        type="text"
        :label="$t('Meta')"
        lazy-rules
        :rules="[isInvalid('meta')]"
        class="col-12 col-md"
      >
        <template v-slot:append>
          <q-icon name="close" @click.prevent.stop="item.meta = ''" class="cursor-pointer" />
        </template>
      </q-input>
    
      <q-select
        v-model="item.source"
        filled
        :label="$t('Source')"
        lazy-rules
        :rules="[val => !!val || $t('Field is required'), isInvalid('source')]"
        @filter="sourceFilterFn"
        :options="sourceSelectItems"
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
          <q-icon name="close" @click.prevent.stop="item.source = ''" class="cursor-pointer" />
        </template>
      </q-select>
    </div>
    
    <div class="row q-gutter-md">
      <q-input
        v-model="item.contentUrl"
        filled
        type="text"
        :label="$t('ContentUrl')"
        lazy-rules
        :rules="[isInvalid('contentUrl')]"
        class="col-12 col-md"
      >
        <template v-slot:append>
          <q-icon name="close" @click.prevent.stop="item.contentUrl = ''" class="cursor-pointer" />
        </template>
      </q-input>
    
      <q-input
        v-model="item.mime"
        filled
        type="text"
        :label="$t('Mime')"
        lazy-rules
        :rules="[isInvalid('mime')]"
        class="col-12 col-md"
      >
        <template v-slot:append>
          <q-icon name="close" @click.prevent.stop="item.mime = ''" class="cursor-pointer" />
        </template>
      </q-input>
    </div>
    
    <div class="row q-gutter-md">
      <q-input
        v-model="item.type"
        filled
        type="text"
        :label="$t('Type')"
        lazy-rules
        :rules="[isInvalid('type')]"
        class="col-12 col-md"
      >
        <template v-slot:append>
          <q-icon name="close" @click.prevent.stop="item.type = ''" class="cursor-pointer" />
        </template>
      </q-input>
    
      <q-input
      v-model.number="item.size"
      filled
      type="number"
      :label="$t('Size')"
      lazy-rules
      :rules="[isInvalid('size')]"
      class="col-12 col-md"
      >
        <template v-slot:append>
          <q-icon name="close" @click.prevent.stop="item.size = ''" class="cursor-pointer" />
        </template>
      </q-input>
    </div>
    
    <div class="row q-gutter-md">
      <q-input
        v-model="item.fileName"
        filled
        type="text"
        :label="$t('FileName')"
        lazy-rules
        :rules="[isInvalid('fileName')]"
        class="col-12 col-md"
      >
        <template v-slot:append>
          <q-icon name="close" @click.prevent.stop="item.fileName = ''" class="cursor-pointer" />
        </template>
      </q-input>
    
      <div class="col-12 col-md"></div>
    </div>
    
  </q-form>
</template>

<script>
import { form } from '../../utils/vuexer';

const { getters, actions, mutations } = form([
  { name: 'source', module: 'Source' },
]);

export default {
  name: 'MediaObjectForm',

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

    sourceFilterFn(val, update /* , abort */) {
      const params = {
        'exists[source]': false,
      };
      const template = JSON.stringify(params);

      return this.sourceSelectItems !== null && this.sourceSelectItemsTemplate === template
        ? update()
        : this.sourceGetSelectItems({ params }).then(() => {
            this.sourceSetSelectItemsTemplate(template);
            update();
          });
    },
  },
};
</script>
