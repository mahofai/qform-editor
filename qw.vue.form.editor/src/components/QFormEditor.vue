<template>
  <div class="q-form-editor" :class="cssBlock">
    <q-form-editor-main
      v-if="pages.main"
      :outputLayout="outputLayout"
      :reset="reset"
      @addField="addField"
      @addReset="addReset"
    ></q-form-editor-main>

    <q-form-editor-modifier
      v-if="pages.modifier"
      :row="row"
      @switchView="switchView"
    ></q-form-editor-modifier>
  </div>
</template>

<script>
import QFormEditorCSSMixin from '../mixins/QFormEditorCSSMixin'
import QFormEditorMain from './QFormEditorMain.vue'
import QFormEditorModifier from './QFormEditorModifier.vue'

export default {
  name: 'q-form-editor',
  components: {
    QFormEditorMain,
    QFormEditorModifier
  },
  mixins: [QFormEditorCSSMixin],
  provide() {
    return {
      outputLayout: this.outputLayout,
      switchView: this.switchView,
      deleteField: this.deleteField,
      modifyElement: this.modifyElement,
      moveUp: this.moveUp,
      moveDown: this.moveDown
    }
  },
  inject: [
  ],
  props: {
    layout: { type: Object, default: () => ({ rows: [] }) }
  },
  data() {
    return {
      pages: {
        main: true,
        modifier: false
      },
      currentRow: 0,
      outputLayout: JSON.parse(JSON.stringify(this.layout)),
      reset: !!this.layout.resetLabel,
      row: null,
      submit: !!this.layout.submitLabel
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
  },
  mounted() {
    if (!this.submit) {
      this.$set(this.outputLayout, 'submitLabel', 'Submit')
    }
  },
  updated() {
  },
  methods: {
    moveUp(index) {
      const target = this.outputLayout.rows[index - 1]
      const source = this.outputLayout.rows[index]
      this.outputLayout.rows.splice(index - 1, 1, source)
      this.outputLayout.rows.splice(index, 1, target)
    },
    moveDown(index) {
      const target = this.outputLayout.rows[index + 1]
      const source = this.outputLayout.rows[index]
      this.outputLayout.rows.splice(index + 1, 1, source)
      this.outputLayout.rows.splice(index, 1, target)
    },
    switchView(obj) {
      this.pages.main = obj.main
      this.pages.modifier = obj.modifier
      this.currentRow = obj.currentRow
      this.row = obj.row
    },
    deleteField(index) {
      const newRows = JSON.parse(JSON.stringify(this.outputLayout.rows))
      newRows.splice(index, 1)
      this.outputLayout.rows = newRows
    },
    addField() {
      if (!this.outputLayout.rows) {
        this.$set(this.outputLayout, 'rows', [])
      }
      const currentRow = this.outputLayout.rows.length
      const row = {
        label: `label${currentRow + 1}`, name: `name${currentRow + 1}`, placeholder: 'please input ... here', disabled: false
      }
      this.switchView({
        main: false,
        modifier: true,
        currentRow,
        row
      })
    },
    addReset(bool) {
      if (bool) {
        this.$set(this.outputLayout, 'resetLabel', 'Reset')
      } else {
        this.$delete(this.outputLayout, 'resetLabel')
      }
      this.reset = !this.reset
    },
    modifyElement(qFormElement) {
      this.outputLayout.rows[this.currentRow] = qFormElement.toObject()
      this.$emit('onChange', this.outputLayout)
      this.switchView({
        main: true,
        modifier: false,
      })
    }
  },
}
</script>

<style lang="scss">
@import '../styles/index';
</style>
