<template>
  <div>
    <div class="row q-col-gutter-x-md">
      <q-input
        v-model="item.type"
        filled
        type="text"
        :label="$t('Type')"
        class="col-12 col-md"
      >
        <template v-slot:append>
          <q-icon name="close" @click.prevent.stop="item.type = ''" class="cursor-pointer" />
        </template>
      </q-input>
    
      <div class="col-12 col-md"></div>
    </div>
    
  </div>
</template>

<script>

export default {
  props: {
    values: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    // eslint-disable-next-line
    item() {
      return this.initialValues || this.values;
    }
  },
  methods: {
  }
};
</script>
