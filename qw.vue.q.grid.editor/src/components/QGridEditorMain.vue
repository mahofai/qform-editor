<template>
  <div class="q-grid-editor-main" :class="cssBlock">
    <q-grid-editor-main-box
      :outputLayout="outputLayout"
    ></q-grid-editor-main-box>
    <div class="q-grid-editor-main__button" @click="undo">Undo</div>
    <div>Output layout object:</div>
    <div>{{ outputLayout }}</div>
  </div>
</template>

<script>
import QGridEditorCSSMixin from '../mixins/QGridEditorCSSMixin'
import QGridEditorMainBox from './QGridEditorMainBox.vue'

export default {
  name: 'q-grid-editor-main',
  components: {
    QGridEditorMainBox,
  },
  mixins: [QGridEditorCSSMixin],
  props: {
    outputLayout: { type: Object, default: () => ({}) }
  },
  methods: {
    undo() {
      this.$emit('undo')
    }
  }
}
</script>

<style lang="scss">
@import '../styles/index';
</style>
