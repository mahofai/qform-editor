<template>
  <div
    v-if="isRenderForm"
    class="q-form-renderer"
    :class="cssBlock"
  >
    <component
      :is="currentComponent(row)"
      v-for="(row, idx) in mergedRows"
      :key="idx"
      class="q-form-renderer__component"
      :chainManager="chainManagerRegistry[row.name]"
      :err="err"
      :executeHook="executeHook"
      :formData="formData"
      :row="row"
      @onFormReset="onFormReset"
      @onSubmit="onSubmit"
      @validate="validate"
    >
    </component>
    <div>
      Form Data:
      <div
        v-for="(value, key) in formData"
        :key="key"
      >
        {{ key }}: {{ value }} <label v-if="value.name"> File name: {{ value.name }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import QFormRendererButton from './QFormRendererButton.vue'
import QFormRendererHtml from './QFormRendererHtml.vue'
import QFormRendererInputCheckbox from './QFormRendererInputCheckbox.vue'
import QFormRendererInputDate from './QFormRendererInputDate.vue'
import QFormRendererInputDateRange from './QFormRendererInputDateRange.vue'
import QFormRendererInputFile from './QFormRendererInputFile.vue'
import QFormRendererInputHtml from './QFormRendererInputHtml.vue'
import QFormRendererInputNumber from './QFormRendererInputNumber.vue'
import QFormRendererInputRadio from './QFormRendererInputRadio.vue'
import QFormRendererInputSelectOne from './QFormRendererInputSelectOne.vue'
import QFormRendererInputText from './QFormRendererInputText.vue'
import QFormRendererInputTextArea from './QFormRendererInputTextArea.vue'

import { ChainManagerFactory } from '../qFormChain/chainManagerFactory'

import QFormRendererCSSMixin from '../mixins/QFormRendererCSSMixin'

export default {
  name: 'q-form-renderer',
  components: {
    QFormRendererButton,
    QFormRendererHtml,
    QFormRendererInputCheckbox,
    QFormRendererInputDate,
    QFormRendererInputDateRange,
    QFormRendererInputFile,
    QFormRendererInputHtml,
    QFormRendererInputNumber,
    QFormRendererInputRadio,
    QFormRendererInputSelectOne,
    QFormRendererInputText,
    QFormRendererInputTextArea,
  },
  mixins: [QFormRendererCSSMixin],
  props: {
    afterInputChange: { type: Function, default: null },
    afterReset: { type: Function, default: null },
    afterSubmit: { type: Function, default: null },
    beforeRender: { type: Function, default: null },
    formData: { type: Object, default: () => ({}) },
    formRenderer: { type: Object, default: () => ({}) },
    onChange: { type: Function, default: null },
    onReset: { type: Function, default: null },
  },
  data() {
    return {
      isRenderForm: true,
      chainManagerRegistry: {},
      err: {}
    }
  },
  computed: {
    mergedRows() {
      const mergedRows = [...this.rows]
      if (this.submitLabel) {
        mergedRows.push({
          customComponentName: 'q-form-renderer-button',
          label: this.submitLabel,
          methodName: 'onSubmit'
        })
      }
      if (this.resetLabel) {
        mergedRows.push({
          customComponentName: 'q-form-renderer-button',
          label: this.resetLabel,
          methodName: 'onFormReset'
        })
      }
      return mergedRows
    },
    resetLabel() {
      return this.formRenderer && this.formRenderer.resetLabel ? (this.formRenderer.resetLabel || null) : null
    },
    rows() {
      return this.formRenderer && this.formRenderer.rows ? (this.formRenderer.rows || []) : []
    },
    submitLabel() {
      return this.formRenderer && this.formRenderer.submitLabel ? (this.formRenderer.submitLabel || null) : null
    },
  },
  created() {
    if (typeof this.beforeRender === 'function') {
      this.beforeRender({ component: this, onSuccess: this.commitStatus, onError: this.destroyForm })
    }
    this.rows.forEach((row) => {
      if (row.rule && row.rule.change) {
        const chainManager = ChainManagerFactory.create(row, this.formData[row.name])
        this.chainManagerRegistry[row.name] = chainManager
      }
    })
  },
  methods: {
    commitStatus(obj) {
      this.status = obj
    },
    destroyForm() {
      this.isRenderForm = false
    },
    currentComponent(obj, defaultComponent) {
      if (obj.customComponent) {
        return obj.customComponent
      }
      if (obj.customComponentName) {
        return obj.customComponentName
      }
      if (obj.content) {
        return 'q-form-renderer-html'
      }
      return defaultComponent || 'q-form-renderer-input-text'
    },
    executeHook(methodName, obj) {
      if (typeof this[methodName] === 'function') {
        this[methodName](obj, this)
      }
    },
    onFormReset() {
      this.executeHook('onReset')
      this.executeHook('afterReset')
    },
    onSubmit() {
      this.validateAll()
      if (Object.values(this.err).every((error) => error === null || error.length === 0)) {
        this.executeHook('afterSubmit')
      }
    },
    validateAll() {
      Object.keys(this.chainManagerRegistry).forEach((key) => {
        const chainManager = this.chainManagerRegistry[key]
        this.validate(chainManager)
      })
    },
    validate(chainManager) {
      const errMsgs = chainManager.handleRequest()
      const name = chainManager.getRowName()
      if (errMsgs.length === 0) {
        this.executeHook('onChange', { name, value: chainManager.getValue() })
      }
      this.$set(this.err, name, errMsgs)
    }
  }
}
</script>

<style lang="scss">
@import '../styles/index';
</style>
