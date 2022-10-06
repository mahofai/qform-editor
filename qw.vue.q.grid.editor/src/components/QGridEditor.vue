<template>
  <div class="q-grid-editor" :class="cssBlock">
    <q-grid-editor-main
      v-if="pages['main']"
      :outputLayout="outputLayout"
      @undo="undo"
    ></q-grid-editor-main>
    <q-grid-editor-form
      v-if="pages['element']"
      @switchView="switchView"
      @confirm="confirm"
    ></q-grid-editor-form>
    <q-grid-editor-split
      v-if="pages['split']"
      @switchView="switchView"
      @confirm="confirm"
    ></q-grid-editor-split>
  </div>
</template>

<script>
import QGridEditorCSSMixin from '../mixins/QGridEditorCSSMixin'
import QGridEditorForm from './QGridEditorForm.vue'
import QGridEditorMain from './QGridEditorMain.vue'
import QGridEditorSplit from './QGridEditorSplit.vue'

export default {
  name: 'q-grid-editor',
  components: {
    QGridEditorForm,
    QGridEditorMain,
    QGridEditorSplit,
  },
  mixins: [QGridEditorCSSMixin],
  props: {
    label: { type: Object, default: () => ({}) },
    layout: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      defaultLabel: {
        content: 'Set content',
        split: 'Split cell',
        contentName: 'Property name',
        contentType: 'Content type',
        lazyImageHint: 'https://YourPlaceholderImage.com/placeholder.jpg'
      },
      pages: {
        main: true,
        element: false,
        split: false
      },
      undoStack: [],
      outputLayout: JSON.parse(JSON.stringify(this.layout)),
      currentCell: this.outputLayout
    }
  },
  provide() {
    return {
      label: this.mergedLabel,
      onClick: this.onClick
    }
  },
  computed: {
    mergedLabel() {
      return {
        ...this.defaultLabel,
        ...this.label
      }
    }
  },
  methods: {
    switchView(obj) {
      this.pages.main = obj.main
      this.pages.element = obj.element
      this.pages.split = obj.split
    },
    confirm(obj) {
      this.undoStack.push(JSON.parse(JSON.stringify(this.outputLayout)))
      Object.keys(this.currentCell).forEach((key) => {
        delete this.currentCell[key]
      })
      Object.keys(obj).forEach((key) => {
        this.currentCell[key] = obj[key]
      })
      this.switchView({
        main: true,
        element: false,
        split: false,
      })
    },
    onClick(obj) {
      this.switchView(obj)
      this.currentCell = obj.currentCell
    },
    undo() {
      if (this.undoStack.length > 0) {
        this.outputLayout = this.undoStack.pop()
      }
    }
  },
}
</script>

<style lang="scss">
@import '../styles/index';
</style>
