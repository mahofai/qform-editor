<template>
  <div
    class="q-form-editor-modifier-input-value-min-max"
  >
    <input
      v-model="range"
      type="checkbox"
      value="true"
      @change="change"
    >
    <div class="q-form-editor-modifier-input-value-min-max__label"> Range </div>
    <div v-if="range">
      <input
        v-model="min_value"
        type="number"
        @change="change"
      > to <input
        v-model="max_value"
        type="number"
        @change="change"
      >
      Error message:
      <input
        v-model="message"
        @change="change"
      >
    </div>
  </div>
</template>

<script>
import { ChainValueMinMax } from '../qFormChain/chainValueMinMax'
import QFormRendererCSSMixin from '../mixins/QFormRendererCSSMixin'
import QFormRendererInputMixin from '../mixins/QFormRendererInputMixin'

export default {
  mixins: [QFormRendererCSSMixin, QFormRendererInputMixin],
  props: {
    rule: { type: Object, default: null }
  },
  inject: [
  ],
  data() {
    return {
      range: false,
      min_value: null,
      max_value: null,
      message: 'range error message'
    }
  },
  computed: {
    minNum() {
      return this.min_value ? parseInt(this.min_value, 10) : null
    },
    maxNum() {
      return this.max_value ? parseInt(this.max_value, 10) : null
    }
  },
  created() {
    if (this.rule && (this.rule.min_value || this.rule.max_value)) {
      this.range = true
      this.min_value = this.rule.min_value
      this.max_value = this.rule.max_value
    }
    this.change()
  },
  methods: {
    change() {
      let chain
      if (this.range) {
        chain = new ChainValueMinMax({
          minValue: this.minNum,
          maxValue: this.maxNum
        })
      }
      this.$emit('change', {
        chain,
        name: 'q-form-editor-modifier-input-value-min-max'
      })
    },
  }
}
</script>

<style lang="scss">
</style>
