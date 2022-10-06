<template>
  <div
    class="q-list-body-row-cell-image"
    :class="cssBlock"
  >
    <img
      v-if="!!src"
      class="q-list-body-row-cell-image__img"
      :alt="alt"
      :src="src"
      :title="alt"
    >
  </div>
</template>

<script>
import QListBodyRowCellMixin from '../mixins/QListBodyRowCellMixin'
import QListCSSMixin from '../mixins/QListCSSMixin'

export default {
  mixins: [QListBodyRowCellMixin, QListCSSMixin],
  computed: {
    alt() {
      return this.row.imgalt || ''
    },
    src() {
      if (!!this.row && this.header.build) {
        return this.header.build(this.row)
      }
      return this.row[this.header.key] || this.header.imgsrc || null
    }
  },
}
</script>

<style lang="scss">
</style>
