<template>
  <div
    class="q-grid-editor-main-box"
    :class="cssBlock"
  >
    <q-grid-editor-main-box-cell
      class="q-grid-editor-main-box-cell"
      :class="cssElement(outputLayout)"
      :layout="outputLayout"
    ></q-grid-editor-main-box-cell>
  </div>
</template>

<script>
import QGridEditorMainBoxCell from './QGridEditorMainBoxCell.vue'
import QBoxCSSMixin from '../mixins/QBoxCSSMixin'

export default {
  name: 'q-grid-editor-main-box',
  components: {
    QGridEditorMainBoxCell
  },
  mixins: [QBoxCSSMixin],
  props: {
    outputLayout: { type: Object, default: () => ({}) },
  },
  methods: {
  }
}
</script>

<style lang="scss">
@import "../styles/index.scss";
</style>
