<template>
  <div class="q-form-editor-modifier" :class="cssBlock">
    <div
      v-if="!selectedType"
      class="q-form-editor-modifier__selection"
    >
      Component Type :
      <select
        id="componentTypes"
        v-model="selectedType"
        name="componentTypes"
      >
        <option
          v-for="(componentType) in componentTypes"
          :key="componentType.key"
          :value="componentType.value"
        >
          {{ componentType.key }}
        </option>
      </select>
    </div>
    <div
      v-for="(error,idx) in errorMessage"
      :key="idx"
      class="q-form-editor-modifier__error"
    >
      {{ error }}
    </div>
    <component
      :is="currentComponent(selectedType)"
      :componentName="selectedType"
      :chains="chains"
      :row="row"
      @change="change"
    ></component>
    <div class="q-form-editor-modifier__button" @click="confirm"> Confirm </div>
    <div class="q-form-editor-modifier__button" @click="back">Back</div>
  </div>
</template>

<script>
import { ChainManager } from '../qFormChain/chainManager'
import QFormEditorModifierInput from './QFormEditorModifierInput.vue'
import QFormEditorModifierHtml from './QFormEditorModifierHtml.vue'
import QFormEditorCSSMixin from '../mixins/QFormEditorCSSMixin'
import QFormRendererInputMixin from '../mixins/QFormRendererInputMixin'

export default {
  customComponentName: 'q-form-editor-modifier',
  components: {
    QFormEditorModifierInput,
    QFormEditorModifierHtml,
  },
  mixins: [QFormEditorCSSMixin, QFormRendererInputMixin],
  provide() {
    return {
    }
  },
  inject: [
    'modifyElement'
  ],
  props: {
    row: { type: Object, default: null },
  },
  data() {
    return {
      componentTypes: [
        { key: 'Text', value: 'q-form-renderer-input-text' },
        { key: 'Number', value: 'q-form-renderer-input-number' },
        { key: 'TextArea', value: 'q-form-renderer-input-text-area' },
        { key: 'Date', value: 'q-form-renderer-input-date' },
        { key: 'DateRange', value: 'q-form-renderer-input-date-range' },
        { key: 'Label', value: 'q-form-renderer-html' },
        { key: 'Checkbox', value: 'q-form-renderer-input-checkbox' },
        { key: 'Radio', value: 'q-form-renderer-input-radio' },
        { key: 'SelectOne', value: 'q-form-renderer-input-select-one' },
        { key: 'InputHTML', value: 'q-form-renderer-input-html' },
        { key: 'File', value: 'q-form-renderer-input-file' },

      ],
      selectedType: '',
      elementData: {},
      qFormElement: null,
      registry: {},
      rules: {},
      errorMessage: []
    }
  },
  computed: {
    chains() {
      switch (this.selectedType) {
        case 'q-form-renderer-input-checkbox':
          return [
            'q-form-editor-modifier-input-required',
            'q-form-editor-modifier-input-options',
            'q-form-editor-modifier-input-options-min-max'
          ]
        case 'q-form-renderer-input-date':
          return [
            'q-form-editor-modifier-input-required',
            'q-form-editor-modifier-input-date',
            'q-form-editor-modifier-input-date-range',
            'q-form-editor-modifier-input-age-range',
          ]
        case 'q-form-renderer-input-date-range':
          return [
            'q-form-editor-modifier-input-required',
            'q-form-editor-modifier-input-date',
            'q-form-editor-modifier-input-date-range',
          ]
        case 'q-form-renderer-input-file':
          return [
            'q-form-editor-modifier-input-file-type',
            'q-form-editor-modifier-input-required',
            'q-form-editor-modifier-input-file-size',
          ]
        case 'q-form-renderer-input-number':
          return [
            'q-form-editor-modifier-input-value-min-max',
            'q-form-editor-modifier-input-required',
          ]
        case 'q-form-renderer-input-radio':
          return [
            'q-form-editor-modifier-input-required',
            'q-form-editor-modifier-input-options'
          ]
        case 'q-form-renderer-input-select-one':
          return [
            'q-form-editor-modifier-input-required',
            'q-form-editor-modifier-input-options'
          ]
        case 'q-form-renderer-input-text':
          return [
            'q-form-editor-modifier-input-min-max',
            'q-form-editor-modifier-input-required'
          ]
        case 'q-form-renderer-input-text-area':
          return [
            'q-form-editor-modifier-input-min-max',
            'q-form-editor-modifier-input-title'
          ]
        default:
          return [
            'q-form-editor-modifier-input-required',
          ]
      }
    },
    customComponentName() {
      return this.row && this.row.customComponentName ? this.row.customComponentName : ''
    }
  },
  watch: {
  },
  created() {
    this.selectedType = this.customComponentName
  },
  mounted() {
  },
  updated() {
  },
  methods: {
    back() {
      this.$emit('switchView', {
        main: true,
        modifier: false,
        row: null
      })
    },
    currentComponent(componentName) {
      switch (componentName) {
        case 'q-form-renderer-input-text':
        case 'q-form-renderer-input-number':
        case 'q-form-renderer-input-text-area':
        case 'q-form-renderer-input-date':
        case 'q-form-renderer-input-checkbox':
        case 'q-form-renderer-input-radio':
        case 'q-form-renderer-input-select-one':
        case 'q-form-renderer-input-html':
        case 'q-form-renderer-input-file':
        case 'q-form-renderer-input-date-range':
          return 'q-form-editor-modifier-input'
        case 'q-form-renderer-html':
          return 'q-form-editor-modifier-html'
        default:
          return ''
      }
    },
    change({ qFormElement, rule }) {
      if (qFormElement) {
        this.qFormElement = qFormElement
      }
      if (rule) {
        this.registry[rule.name] = rule.chain
      }
    },
    async confirm() {
      const chainManager = new ChainManager()
      const chains = []
      Object.keys(this.registry).forEach((key) => {
        if (this.registry[key]) {
          chains.push(this.registry[key])
        }
      })
      chainManager.createChain(chains)
      const qFormElement = await chainManager.handleRequest(this.qFormElement)
      if (qFormElement) {
        this.errorMessage = qFormElement.isValid()
        if (this.errorMessage.length === 0) {
          this.modifyElement(qFormElement)
        }
      }
    },
  },
}
</script>

<style lang="scss">
@import '../styles/index';
</style>
