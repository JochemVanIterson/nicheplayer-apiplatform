<template>
  <q-expansion-item icon="search" :label="$t('Filters')" v-model="filtersExpanded">
    <q-card>
      <q-card-section @keydown.enter.prevent="handleFilter">
        <slot name="filter"></slot>
      </q-card-section>
      <q-card-section>
        <q-btn :label="$t('Filter')" color="primary" @click="handleFilter" />
        <q-btn :label="$t('Reset')" color="primary" flat class="q-ml-sm" @click="handleReset" />
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script>
export default {
  name: 'DataFilter',
  props: {
    handleReset: {
      type: Function,
      required: true
    },
    handleFilter: {
      type: Function,
      required: true
    },
    expanded: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      filtersExpanded: false
    }
  },
  watch: {
    expanded (val) {
      this.filtersExpanded = this.expanded
    }
  }
}
</script>
