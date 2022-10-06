<template>
  <div
    class="q-list"
    :class="cssBlock"
  >
    <q-list-header
      :headers="copyHeaders"
      :qSort="qSort"
      :sorter="sorter"
      :titles="titles"
      @onCheckAll="onCheckAll"
      @onListHeaderClick="onListHeaderClick"
    />
    <q-list-body
      :bulkAction="bulkAction"
      :headers="copyHeaders"
      :rows="rows"
      :selectedRows="selectedRows"
      @onCheck="onCheck"
      @click="click"
      @clearSelectedRows="clearSelectedRows"
    />
    <q-list-footer
      :footers="footers"
      :titles="titles"
    />
  </div>
</template>

<script>
import QListCSSMixin from '../mixins/QListCSSMixin'
import QListTitleMixin from '../mixins/QListTitleMixin'
import QListBody from './QListBody.vue'
import QListFooter from './QListFooter.vue'
import QListHeader from './QListHeader.vue'

export default {
  name: 'q-list',
  components: {
    QListBody,
    QListFooter,
    QListHeader
  },
  mixins: [QListCSSMixin, QListTitleMixin],
  props: {
    bulkAction: { type: Object, default: () => ({}) },
    footers: { type: Array, default: () => [] },
    headers: { type: Array, default: () => [] },
    qSort: { type: Object, default: () => ({}) },
    rows: { type: Array, default: () => [] },
    sorter: { type: Function, default: null },
  },
  data() {
    return {
      selectedRows: [],
    }
  },
  computed: {
    copyHeaders() {
      if (this.hasBulkActions) {
        return [
          {
            label: '',
            checkbox: true,
            customComponentName: 'q-list-body-row-cell-checkbox',
            css: { element: 'q-list-header__cell--checkbox' }
          },
          ...this.headers
        ]
      }
      return this.headers
    },
    hasBulkActions() {
      return this.bulkAction.actions && this.bulkAction.actions.length > 0
    }
  },
  watch: {
    rows() {
      this.clearSelectedRows()
    },
    selectedRows() {
      this.$emit('onChangeSelectedRows', this.selectedRows)
    }
  },
  methods: {
    click(obj) {
      this.$emit('click', obj)
    },
    onCheck(row) {
      let found = false
      this.selectedRows = this.selectedRows.filter((selectedRow) => {
        if (selectedRow === row) {
          found = true
        } else {
          return selectedRow
        }
      })
      if (!found) {
        this.selectedRows.push(row)
      }
    },
    onCheckAll(isChecked) {
      if (isChecked) {
        this.selectedRows = this.rows
      } else {
        this.selectedRows = []
      }
    },
    onListHeaderClick(obj) {
      this.$emit('onListHeaderClick', obj)
    },
    clearSelectedRows() {
      this.selectedRows = []
    }
  }
}
</script>

<style lang="scss">
@import '../styles/index';
</style>
