<template>
  <div
    class="q-form-editor-modifier-input-required"
  >
    <input
      v-model="required"
      type="checkbox"
      value="true"
      @change="change"
    >
    <div class="q-form-editor-modifier-input-required__label"> Required </div>
    <div v-if="required">
      <div class="q-form-editor-modifier-input-required__label"> Error message: </div>
      <input
        v-model="message"
        @change="change"
      >
    </div>
  </div>
</template>

<script>
import { ChainRequired } from '../qFormChain/chainRequired'
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
      required: false,
      message: 'required error message'
    }
  },
  created() {
    if (this.rule) {
      this.required = this.rule.required || false
      this.message = this.rule.message || ''
    }
    this.change()
  },
  methods: {
    change() {
      let chain = null
      if (this.required) {
        chain = new ChainRequired({
          required: this.required,
          message: this.message
        })
      }
      this.$emit('change', {
        chain,
        name: 'q-form-editor-modifier-input-required'
      })
    },
  }
}
</script>

<style lang="scss">
</style>
