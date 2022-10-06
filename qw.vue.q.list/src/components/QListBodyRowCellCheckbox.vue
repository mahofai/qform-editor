<template>
  <div
    class="q-list-body-row-cell-checkbox"
    :class="cssBlock"
  >
    <input
      type="checkbox"
      :checked="isChecked"
      @click="click"
    >
  </div>
</template>

<script>
import QListBodyRowCellMixin from '../mixins/QListBodyRowCellMixin'
import QListCSSMixin from '../mixins/QListCSSMixin'

export default {
  mixins: [QListBodyRowCellMixin, QListCSSMixin],
  computed: {
    isChecked() {
      return this.selectedRows.filter((selectedRow) => {
        return selectedRow === this.row
      }).length > 0
    },
  },
  methods: {
    click(...obj) {
      if (typeof this.onCheck === 'function') {
        this.onCheck(...obj)
      }
    }
  }
}
</script>

<style lang="scss">
</style>
