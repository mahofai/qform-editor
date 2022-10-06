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
    <div class="q-form-editor-modifier-input-value-min-max__label"> Choice Limit </div>
    <div v-if="range">
      <input
        v-model="minOptions"
        type="number"
        @change="change"
      > to <input
        v-model="maxOptions"
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
import { ChainOptionsMinMax } from '../qFormChain/chainOptionsMinMax'
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
      minOptions: null,
      maxOptions: null,
      message: 'range error message'
    }
  },
  computed: {
    minNum() {
      return this.minOptions ? parseInt(this.minOptions, 10) : null
    },
    maxNum() {
      return this.maxOptions ? parseInt(this.maxOptions, 10) : null
    }
  },
  created() {
    if (this.rule && (this.rule.min_options || this.rule.max_options)) {
      this.range = true
      this.minOptions = this.rule.min_options
      this.maxOptions = this.rule.max_options
    }
    this.change()
  },
  methods: {
    change() {
      let chain
      if (this.range) {
        chain = new ChainOptionsMinMax({
          minOptions: this.minNum,
          maxOptions: this.maxNum
        })
      }
      this.$emit('change', {
        chain,
        name: 'q-form-editor-modifier-input-options-min-max'
      })
    },
  }
}
</script>

<style lang="scss">
</style>
