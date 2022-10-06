<template>
  <div
    class="q-list-body"
    :class="cssBlock"
  >
    <q-list-body-action
      v-if="showAction"
      :bulkAction="bulkAction"
      :selectedRows="selectedRows"
      @clearSelectedRows="clearSelectedRows"
    />
    <q-list-body-row
      v-for="(row, idx) in rows"
      :key="idx"
      :css="rowCss(row)"
      :headers="headers"
      :onCheck="onCheck(row)"
      :row="row"
      :selectedRows="selectedRows"
      @click="click"
    />
  </div>
</template>

<script>
import QListCSSMixin from '../mixins/QListCSSMixin'
import QListBodyAction from './QListBodyAction.vue'
import QListBodyRow from './QListBodyRow.vue'

export default {
  components: {
    QListBodyAction,
    QListBodyRow
  },
  mixins: [QListCSSMixin],
  props: {
    bulkAction: { type: Object, default: () => ({}) },
    headers: { type: Array, default: () => [] },
    rows: { type: Array, default: () => [] },
    selectedRows: { type: Array, default: () => [] },
  },
  computed: {
    actions() {
      return this.bulkAction.actions || []
    },
    bulkActionLabel() {
      return this.bulkAction.label || {}
    },
    showAction() {
      return !!this.actions.length > 0 && (this.selectedRows.length > 0)
    },
    selectedLabel() {
      return this.bulkActionLabel.selected || ''
    },
    taskLabel() {
      return this.bulkActionLabel.task || ''
    }
  },
  methods: {
    click(obj) {
      this.$emit('click', obj)
    },
    onCheck(row) {
      return () => {
        this.$emit('onCheck', row)
      }
    },
    clearSelectedRows() {
      this.$emit('clearSelectedRows')
    },
    rowCss(row) {
      if (typeof row.cssBuild === 'function' && typeof row.cssBuild(row) === 'object') {
        return row.cssBuild(row)
      }
      return this.css || {}
    }
  }
}
</script>

<style lang="scss">
</style>
