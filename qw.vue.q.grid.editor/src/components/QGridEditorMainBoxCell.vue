<template>
  <div :class="cssBlock">
    <q-grid-editor-main-box-item
      v-if="isItem"
      class="q-grid-editor-main-box-item"
      :class="cssElement(layout)"
      :layout="layout"
    ></q-grid-editor-main-box-item>
    <q-grid-editor-main-box-cell
      v-for="(cell, index) in cells"
      :key="index"
      class="q-grid-editor-main-box-cell"
      :class="cssElement(cell)"
      :layout="cell"
    ></q-grid-editor-main-box-cell>
  </div>
</template>

<script>
import QBoxMixin from '../mixins/QBoxMixin'
import QBoxCSSMixin from '../mixins/QBoxCSSMixin'
import QGridEditorMainBoxItem from './QGridEditorMainBoxItem.vue'

export default {
  name: 'q-grid-editor-main-box-cell',
  components: {
    QGridEditorMainBoxItem
  },
  mixins: [QBoxMixin, QBoxCSSMixin],
}
</script>

<style lang="scss">
</style>
