<template>
  <div
    class="q-form-editor-main-renderer"
    :class="cssBlock"
  >
    <div
      v-for="(row, index) in rows"
      :key="index"
      class="q-form-editor-main-renderer__componentBox"
    >
      <div> Component {{ index + 1 }}: {{ row.customComponentName }} </div>
      <div> Name: {{ row.name }} </div>
      <div v-if="row.rule && row.rule.change.length"> Rule: {{ row.rule.change }} </div>
      <div class="q-form-editor-main-renderer__button" @click="modify(index, row)"> Modify </div>
      <div class="q-form-editor-main-renderer__button" @click="deleteComponent(index)"> Delete </div>
      <div
        class="q-form-editor-main-renderer__upButton"
        :class="[index === 0?'disable':'']"
        @click="switchUp(index)"
      >
        &#8593;
      </div>
      <div
        class="q-form-editor-main-renderer__downButton"
        :class="[index+1 === rows.length?'disable':'']"
        @click="switchDown(index)"
      >
        &#8595;
      </div>
    </div>
  </div>
</template>

<script>

import { QFormInput } from '../qFormElement/qFormInput'
import QFormRendererCSSMixin from '../mixins/QFormRendererCSSMixin'
import QFormRendererInputMixin from '../mixins/QFormRendererInputMixin'

export default {
  customComponentName: 'q-form-editor-main-renderer',
  components: {
  },
  mixins: [QFormRendererCSSMixin, QFormRendererInputMixin],
  props: {
    formRenderer: { type: Object, default: () => ({}) },
  },
  inject: [
    'switchView',
    'deleteField',
    'moveUp',
    'moveDown'
  ],
  data() {
    return {
      qFormElement: null
    }
  },
  computed: {
    rows() {
      return this.formRenderer && this.formRenderer.rows ? (this.formRenderer.rows || []) : []
    },
  },
  created() {
    this.qFormElement = new QFormInput({
      ...this.row,
      customComponentName: this.componentName
    })
  },
  methods: {
    switchUp(index) {
      if (index > 0) {
        this.moveUp(index)
      }
    },
    switchDown(index) {
      if (index + 1 < this.rows.length) {
        this.moveDown(index)
      }
    },
    deleteComponent(index) {
      this.deleteField(index)
    },
    modify(index, row) {
      this.switchView({
        main: false,
        modifier: true,
        currentRow: index,
        row
      })
    },
  }
}
</script>

<style lang="scss">
@import '../styles/index';
</style>
