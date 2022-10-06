<template>
  <component
    :is="currentComponent(header)"
    class="q-list-body-row-cell"
    :class="cssElement(header)"
    :header="header"
    :onCheck="onCheck"
    :row="row"
    :selectedRows="selectedRows"
    @click="click"
  />
</template>

<script>
import QListBodyRowCellAction from './QListBodyRowCellAction.vue'
import QListBodyRowCellCheckbox from './QListBodyRowCellCheckbox.vue'
import QListBodyRowCellContainer from './QListBodyRowCellContainer.vue'
import QListBodyRowCellImage from './QListBodyRowCellImage.vue'
import QListBodyRowCellText from './QListBodyRowCellText.vue'
import QListBodyRowCellMixin from '../mixins/QListBodyRowCellMixin'
import QListCSSMixin from '../mixins/QListCSSMixin'

export default {
  components: {
    QListBodyRowCellAction,
    QListBodyRowCellCheckbox,
    QListBodyRowCellContainer,
    QListBodyRowCellImage,
    QListBodyRowCellText
  },
  mixins: [QListBodyRowCellMixin, QListCSSMixin],
  methods: {
    click(obj) {
      this.$emit('click', obj)
    },
    currentComponent(obj, defaultComponent) {
      if (obj.customComponent) {
        return obj.customComponent
      }
      if (obj.customComponentName) {
        return obj.customComponentName
      }
      return defaultComponent || 'q-list-body-row-cell-text'
    }
  }
}

</script>

<style lang="scss">
</style>
