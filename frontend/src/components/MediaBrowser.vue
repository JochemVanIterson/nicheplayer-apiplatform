<template lang="pug">
q-dialog(ref="dialog" @hide="onDialogHide")
  q-card.q-dialog-plugin(style="width:1000px; max-width: 90vw")
    .row.items-center.q-pa-sm
      .col.text-h6 Media Chooser
      .col-auto
        q-btn(flat round icon="close" @click="hide")
    q-separator
    .row
      q-table.q-px-sm.col(
        v-if="$q.screen.gt.xs || selected.length==0"
        :data="data",
        :columns="columns",
        :grid="viewMode==='grid'"
        row-key="id"
        :selection="$q.screen.gt.xs?'single':'none'"
        :selected.sync="selected"
        :filter="filterString"
        flat
        @row-click="openPreview"
        :pagination="{rowsPerPage: 10}"
      )
        template(v-slot:top-right)
          .row.items-center.q-gutter-sm
            q-btn-toggle(
              no-caps rounded unelevated toggle-color="black" color="white" text-color="black" :style="'border: 1px solid black'"
              v-model="viewMode" :options="[ {value: 'grid', icon: 'apps'}, {value: 'list', icon: 'view_headline'} ]")
            q-input(outlined dense debounce="300" v-model="filterString" placeholder="Search")
              template(v-slot:append)
                q-icon(name="search")
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
      q-separator(vertical v-if="$q.screen.gt.xs")
      .column(v-if="$q.screen.gt.xs || selected.length>0" style="min-width:100px" :class="$q.screen.gt.xs?'col-3':'col'")
        .col-auto.row(v-if="$q.screen.lt.sm")
          q-btn.q-pa-sm(dense flat round icon="arrow_back" @click="selected=[]")
        q-scroll-area.col(v-if="selected.length == 1" style="min-height: 300px")
          .q-gutter-y-md.q-px-md.q-pt-md
            q-img.rounded-borders(v-if="selectedItm.type === 'image'" :src="selectedItm.contentUrl")
            audio(v-else-if="selectedItm.type === 'audio'" :src="selectedItm.contentUrl" controls style="width:100%")
            div(v-else) No Preview Available
            .text-caption File name
            .text.ellipsis {{selectedItm.fileName}}
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
        .col.q-pa-md.text-center(v-else) Empty
        q-card-actions.col-auto(align="right")
          q-btn(color="primary" no-caps @click="onOKClick" :disabled="selected.length != 1") Select
</template>

<script>
import { format } from 'quasar'

export default {
  name: 'MediaBrowser',
  props: {
    type: {
      default: 'All',
      type: String
    },
    value: String
  },
  data () {
    return {
      filterString: '',
      filterType: this.type,
      selected: this.$store.getters['cache/mediaObjects/getAll'].filter((e) => e['@id'] === this.value),
      columns: [
        {
          name: 'fileName',
          align: 'left',
          label: 'File Name',
          field: 'fileName',
          sortable: true
        },
        {
          name: 'size',
          align: 'left',
          label: 'Size',
          field: (row) => this.formatFilesize(row.size),
          sortable: false
        }
      ],
      viewMode: 'grid'
    }
  },
  computed: {
    data () {
      return this.$store.getters['cache/mediaObjects/getAll'].filter((e) => {
        if (e === undefined) return false
        if (this.filterType !== 'All' && e.type !== this.filterType.toLowerCase()) return false
        else return true
      })
    },
    selectedItm () { return this.selected.length === 1 ? this.selected[0] : {} }
  },
  methods: {
    show () {
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick () {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      // this.$emit('ok')
      this.$emit('ok', this.selected[0])

      // then hiding dialog
      this.hide()
    },

    onCancelClick () {
      // we just need to hide dialog
      this.hide()
    },

    formatFilesize (value) { return format.humanStorageSize(value) },
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.data.length}`
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
      if (this.selected[0] === row) this.selected = []
      else this.selected = [row]
    }
  },
  mounted () {
    this.refresh()
  }
}
</script>
