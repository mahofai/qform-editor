<template>
  <div
    class="q-form-editor-modifier-input-min-max"
  >
    <input
      v-model="range"
      type="checkbox"
      value="true"
      @change="change"
    >
    <div class="q-form-editor-modifier-input-min-max__label"> Length Limit </div>
    <div v-if="range">
      <div>
        Range: <input
          v-model="inputMin"
          type="number"
          @change="change"
        > to <input
          v-model="inputMax"
          type="number"
          @change="change"
        >
        <input
          v-model="countWord"
          type="radio"
          :value="false"
          @change="change"
        > Count character
        <input
          v-model="countWord"
          type="radio"
          :value="true"
          @change="change"
        > Count word
      </div>
      Error message:
      <input
        v-model="message"
        @change="change"
      >
    </div>
  </div>
</template>

<script>
import { ChainMinMax } from '../qFormChain/chainMinMax'
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
      inputMin: null,
      inputMax: null,
      countWord: false,
      message: 'range error message'
    }
  },
  computed: {
    min() {
      return this.inputMin ? parseInt(this.inputMin, 10) : null
    },
    max() {
      return this.inputMax ? parseInt(this.inputMax, 10) : null
    }
  },
  created() {
    if (this.rule && (this.rule.min || this.rule.max)) {
      this.range = true
      this.inputMin = this.rule.min
      this.inputMax = this.rule.max
      this.countWord = this.rule.count_word || false
    }
    this.change()
  },
  methods: {
    change() {
      let chain
      if (this.range) {
        chain = new ChainMinMax({
          min: this.min,
          max: this.max,
          countWord: this.countWord
        })
      }
      this.$emit('change', {
        chain,
        name: 'q-form-editor-modifier-input-min-max'
      })
    },
  }
}
</script>

<style lang="scss">
</style>
