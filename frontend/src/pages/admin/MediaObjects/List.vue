<template lang="pug">
q-page.row(padding)
  .col
    q-table(
      title="Media",
      :data="data",
      :columns="columns",
      :grid="viewMode==='grid'"
      row-key="id"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      :selected.sync="selected"
      :filter="filter"
      flat bordered
      @row-click="openPreview"
      ref="mediaTable"
      :pagination="{rowsPerPage: 10}"
    )
      template(v-slot:top-right)
        .row.items-center.q-gutter-x-sm
          q-btn-toggle(
            no-caps rounded unelevated toggle-color="primary" color="white" text-color="primary" :style="'border: 1px solid '+buttonColor"
            v-model="viewMode" :options="[ {label: 'Grid', value: 'grid'}, {label: 'List', value: 'list'} ]")
          q-btn(icon="refresh" flat round @click="refresh")
          q-input(outlined dense debounce="300" v-model="filter" placeholder="Search")
            template(v-slot:append)
              q-icon(name="search")
          q-btn(icon="add" flat label="Create" no-caps @click="$router.push('/admin/media_objects/create')")
      template(v-slot:body-cell-actions="props")
        q-td(:props="props")
          q-btn(flat color="primary" icon="edit" label="Edit" no-caps @click.stop="editClicked(props.row.id)")
      template(v-slot:item="props")
        .q-pa-xs.col-xs-12.col-sm-6.col-md-4.col-lg-3.grid-style-transition(:style="props.selected ? 'transform: scale(0.80);' : ''")
          q-card(:class="props.selected ? 'bg-grey-2' : ''" @click="openPreview($event, props.row)")
            q-img.bg-grey-10(:src="getPreview(props.row)" :ratio="4/3" contain)
              template(v-slot:error)
                .absolute-full.flex.flex-center.bg-grey-10(v-if="getPreview(props.row) == 'audio'")
                  q-icon(name="music_note" size="lg")
                .absolute-full.flex.flex-center.bg-negative.text-white(v-else) Cannot load image
                .absolute-bottom
                  .text.ellipsis {{props.row.fileName}}
              .absolute-bottom
                .text.ellipsis {{props.row.fileName}}
  q-card.q-ml-sm.column#previewCard(flat bordered v-if="selected.length == 1" style="min-width:250px" :class="$q.screen.gt.xs?'col-3':'fixed-full'")
    q-card-section.col-auto.row.items-center
      .col.text.ellipsis {{selectedItm.fileName}}
      q-btn.col-auto(dense flat round icon="close" @click="selected=[]")
    q-scroll-area.col
      .q-gutter-y-md.q-px-md
        q-img.rounded-borders(v-if="selectedItm.type === 'image'" :src="selectedItm.contentUrl")
        audio(v-else-if="selectedItm.type === 'audio'" :src="selectedItm.contentUrl" controls style="width:100%")
        div(v-else) No Preview Available
        .text-caption Type
        .text {{selectedItm.type}}
        .text-caption Size
        .text {{formatFilesize(selectedItm.size)}}
        .text-caption Access
        .text {{selectedItm.access}}
        .text-caption Source
        .text {{selectedItm.source}}
        q-separator
        .text-caption Metadata
        q-markup-table(flat bordered wrap-cells)
          tbody
            tr.q-tr--no-hover(v-for="item, key in selectedItm.meta")
              q-td(auto-width class="text-left") {{key}}
              td( class="text-left") {{item}}
    q-card-actions.col-auto(align="right")
      q-btn(color="primary" no-caps @click="editClicked(selectedItm.id)") Edit
</template>

<script>
import { format, colors } from 'quasar'

export default {
  name: 'PageAdminMediaObjectsList',
  data () {
    return {
      filter: '',
      selected: [],
      columns: [
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'left',
          field: 'id',
          sortable: true
        },
        {
          name: 'fileName',
          align: 'left',
          label: 'File Name',
          field: 'fileName',
          sortable: true
        },
        {
          name: 'type',
          align: 'left',
          label: 'Type',
          field: 'type',
          sortable: true
        },
        {
          name: 'access',
          align: 'left',
          label: 'Access',
          field: 'access',
          sortable: true
        },
        {
          name: 'size',
          align: 'left',
          label: 'Size',
          field: (row) => this.formatFilesize(row.size),
          sortable: false
        },
        {
          name: 'source',
          align: 'left',
          label: 'Source',
          field: 'source',
          sortable: false
        }
        // {
        //   name: 'meta',
        //   align: 'left',
        //   label: 'Meta',
        //   field: 'meta',
        //   sortable: false
        // }
      ],
      viewMode: 'grid'
    }
  },
  computed: {
    data () {
      return this.$store.getters['cache/mediaObjects/getAll'].filter((e) => {
        return e !== undefined
      })
    },
    buttonColor () { return colors.getBrand('primary') },
    selectedItm () { return this.selected.length === 1 ? this.selected[0] : {} }
  },
  methods: {
    formatFilesize (value) { return format.humanStorageSize(value) },
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.data.length}`
    },
    rowClicked (evt, row, index) {
      this.$router.push(`/admin/media_objects/${row.id}/show`)
    },
    editClicked (id) {
      this.$router.push(`/admin/media_objects/${id}/edit`)
    },
    refresh () {
      this.$store.dispatch('cache/mediaObjects/getAllFromAPI')
    },
    getPreview (item) {
      if (item.type === 'image') return item.contentUrl
      if (item.type === 'audio') return 'audio'
      else return 'https://cdn.quasar.dev/img/parallax2.jpg'
    },
    openPreview (evt, row) {
      if (this.selected[0] == row) this.selected = []
      else this.selected = [row]
    }
  },
  mounted () {
    this.refresh()
  }
}
</script>

<style lang="scss" scoped>
  @media (max-width: $breakpoint-xs-max){
    #previewCard {
      right: 10px;
      top: 58px;
      bottom: 10px;
    }
  }
</style>