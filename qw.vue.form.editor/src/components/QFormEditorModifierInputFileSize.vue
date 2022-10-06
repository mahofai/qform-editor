<template>
  <div
    class="q-form-editor-modifier-input-file-size"
  >
    <input
      v-model="haveSize"
      type="checkbox"
      value="true"
      @change="change"
    >
    <div class="q-form-editor-modifier-input-file-size__label"> FileSize </div>
    <div v-if="haveSize">
      <div class="q-form-editor-modifier-input-file-size__label"> maxSize: </div>
      <input
        v-model="number"
        type="number"
        @change="change"
      >
      <select v-model="unit" @change="change">
        <option>B</option>
        <option>KB</option>
        <option>MB</option>
        <option>GB</option>
      </select>
      <div class="q-form-editor-modifier-input-file-size__label"> Error message: </div>
      <input
        v-model="message"
        @change="change"
      >
    </div>
  </div>
</template>

<script>
import { ChainFileSize } from '../qFormChain/chainFileSize'
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
      unit: 'KB',
      haveSize: false,
      message: 'file too large',
      number: 0,
    }
  },
  computed: {
    maxSize() {
      let size = ''
      size = `${this.number.toString()}${this.unit}`
      return size
    }
  },
  created() {
    if (this.rule && this.rule.max_size) {
      this.haveSize = true
      this.number = this.rule.max_size.slice(0, this.rule.max_size.search(/[a-zA-Z]/)) || 0
      this.unit = this.rule.max_size.slice(this.rule.max_size.search(/[a-zA-Z]/)) || 'KB'
      this.message = this.rule.message
    }
    this.change()
  },
  methods: {
    change() {
      let chain
      if (this.haveSize) {
        chain = new ChainFileSize({
          maxSize: this.maxSize,
          message: this.message
        })
      }
      this.$emit('change', {
        chain,
        name: 'q-form-editor-modifier-input-file-size'
      })
    },
  }
}
</script>

<style lang="scss">
</style>
