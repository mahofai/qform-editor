<template>
  <div
    class="q-form-editor-modifier-input-title"
  >
    <div>
      input title of textarea:
      <div>
        <input
          v-model="inputTitle"
          @change="change"
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ChainTitle } from '../qFormChain/chainTitle'
import QFormRendererCSSMixin from '../mixins/QFormRendererCSSMixin'
import QFormRendererInputMixin from '../mixins/QFormRendererInputMixin'

export default {
  mixins: [QFormRendererCSSMixin, QFormRendererInputMixin],
  props: {
  },
  inject: [
  ],
  data() {
    return {
      inputTitle: '',
    }
  },
  created() {
    this.inputTitle = this.row.title || 'title'
    this.change()
  },
  methods: {
    change() {
      const chain = new ChainTitle({
        title: this.inputTitle,
      })
      this.$emit('change', {
        chain,
        name: 'q-form-editor-modifier-input-title'
      })
    },
  }
}
</script>

<style lang="scss">
</style>
