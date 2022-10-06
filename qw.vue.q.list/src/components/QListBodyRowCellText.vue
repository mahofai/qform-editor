<template>
  <div
    class="q-list-body-row-cell-text"
    :class="cssBlock"
    :title="title"
  >{{ text }}</div>
</template>

<script>
import QListBodyRowCellMixin from '../mixins/QListBodyRowCellMixin'
import QListCSSMixin from '../mixins/QListCSSMixin'

export default {
  mixins: [QListBodyRowCellMixin, QListCSSMixin],
  computed: {
    text() {
      if (this.title && this.header.maxLength && this.header.maxLength > 3 && this.title.length > this.header.maxLength) {
        return `${this.title.slice(0, this.header.maxLength - 3)}...`
      }
      return this.title
    },
    title() {
      if (!!this.row && this.header.build) {
        return this.header.build(this.row)
      }
      if (!!this.row && this.header.key) {
        return this.row[this.header.key]
      }
      return this.header.text || ''
    }
  },
}
</script>

<style lang="scss">
</style>
