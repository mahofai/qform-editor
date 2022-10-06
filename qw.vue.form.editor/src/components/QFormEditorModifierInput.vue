<template>
  <div class="q-form-editor-modifier-input">
    <div>
      Please input label:
      <input
        v-model="qFormElement.label"
        @change="update"
      >
    </div>
    <div>
      Please input name:
      <input
        v-model="qFormElement.name"
        @change="update"
      >
    </div>
    <div v-if="hasPlaceholder">
      Please input placeholder:
      <input
        v-model="qFormElement.placeholder"
        @change="update"
      >
    </div>
    <div>
      <input
        v-model="qFormElement.disabled"
        type="checkbox"
        @change="update"
      >
      Disabled
    </div>
    <div
      v-for="(chain, idx) in chains"
      :key="idx"
    >
      <component
        :is="chain"
        :row="row"
        :rule="getRule(chain)"
        @change="change"
      ></component>
    </div>
  </div>
</template>

<script>
import { QFormInput } from '../qFormElement/qFormInput'

import QFormEditorModifierInputAgeRange from './QFormEditorModifierInputAgeRange.vue'
import QFormEditorModifierInputFormat from './QFormEditorModifierInputFormat.vue'
import QFormEditorModifierInputMinMax from './QFormEditorModifierInputMinMax.vue'
import QFormEditorModifierInputValueMinMax from './QFormEditorModifierInputValueMinMax.vue'
import QFormEditorModifierInputRequired from './QFormEditorModifierInputRequired.vue'
import QFormEditorModifierInputTitle from './QFormEditorModifierInputTitle.vue'
import QFormEditorModifierInputOptions from './QFormEditorModifierInputOptions.vue'
import QFormEditorModifierInputOptionsMinMax from './QFormEditorModifierInputOptionsMinMax.vue'
import QFormEditorModifierInputDate from './QFormEditorModifierInputDate.vue'
import QFormEditorModifierInputDateRange from './QFormEditorModifierInputDateRange.vue'
import QFormEditorModifierInputFileSize from './QFormEditorModifierInputFileSize.vue'
import QFormEditorModifierInputFileType from './QFormEditorModifierInputFileType.vue'

import { RuleNameFactory } from '../qFormChain/ruleNameFactory'

import QFormRendererCSSMixin from '../mixins/QFormRendererCSSMixin'
import QFormRendererInputMixin from '../mixins/QFormRendererInputMixin'

export default {
  components: {
    QFormEditorModifierInputAgeRange,
    QFormEditorModifierInputFormat,
    QFormEditorModifierInputMinMax,
    QFormEditorModifierInputValueMinMax,
    QFormEditorModifierInputRequired,
    QFormEditorModifierInputTitle,
    QFormEditorModifierInputOptions,
    QFormEditorModifierInputOptionsMinMax,
    QFormEditorModifierInputDate,
    QFormEditorModifierInputDateRange,
    QFormEditorModifierInputFileSize,
    QFormEditorModifierInputFileType
  },
  mixins: [QFormRendererCSSMixin, QFormRendererInputMixin],
  props: {
    chains: { type: Array, default: () => ([]) },
    componentName: { type: String, default: '' },
  },
  inject: [
    'outputLayout'
  ],
  data() {
    return {
      qFormElement: null,
      rule: null,
    }
  },
  computed: {
    rules() {
      if (this.row) {
        return this.row.rule ? this.row.rule.change || [] : []
      }
      return []
    },
    hasPlaceholder() {
      const components = ['q-form-renderer-input-checkbox', 'q-form-renderer-input-radio', 'q-form-renderer-input-select-one', 'q-form-renderer-input-file']
      return !components.includes(this.componentName)
    }
  },
  created() {
    this.qFormElement = new QFormInput({
      row: this.row,
      outputLayout: this.outputLayout,
      customComponentName: this.componentName
    })
    this.$emit('change', {
      qFormElement: this.qFormElement
    })
  },
  methods: {
    currentComponent() {
      return this.componentName.replace('renderer', 'editor-modifier')
    },
    change(rule) {
      this.$emit('change', {
        rule
      })
      this.rule = rule.chain
    },
    getRule(chain) {
      let returnRule = null
      this.rules.forEach((rule) => {
        if (RuleNameFactory.getName(rule) === chain) {
          returnRule = rule
        }
      })
      return returnRule
    },
    update() {
      this.$emit('change', {
        qFormElement: this.qFormElement
      })
    }
  }
}
</script>

<style lang="scss">
</style>
