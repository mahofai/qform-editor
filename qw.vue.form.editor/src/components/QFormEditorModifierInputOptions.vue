<template>
  <div
    class="q-form-editor-modifier-input-options"
  >
    <div>
      <div
        class="q-form-editor-modifier-input-options__button"
        @click="addOption"
      >
        Add Options
      </div>
      <div
        v-for="(option,index) in options"
        :key="index"
      >
        <div>
          Input Options {{ index + 1 }} label:
          <input v-model="option.label" @change="change">
        </div>
        <div>
          Input Options {{ index + 1 }} value:
          <input v-model="option.value" @change="change">
        </div>
        <div
          v-if="!disableArray[index]"
          class="q-form-editor-modifier-input-options__button"
          @click="disableOption(index)"
        >
          Disable
        </div>
        <div
          v-if="disableArray[index]"
          class="q-form-editor-modifier-input-options__button"
          @click="enableOption(index)"
        >
          Enable
        </div>
        <div
          class="q-form-editor-modifier-input-options__button"
          @click="deleteOption(index)"
        >
          Delete
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ChainOptions } from '../qFormChain/chainOptions'
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
      options: [],
      disableArray: [],
    }
  },
  created() {
    if (this.row.options) {
      this.options = JSON.parse(JSON.stringify(this.row.options))
      this.row.options.forEach((option, index) => {
        this.disableArray[index] = option.disabled
      })
      this.change()
    } else {
      this.options = []
      this.change()
    }
  },
  methods: {
    deleteOption(index) {
      this.options.splice(index, 1)
      this.disableArray[index] = true
      this.change()
    },
    disableOption(index) {
      this.$set(this.options[index], 'disabled', 'true')
      this.disableArray[index] = true
      this.change()
    },
    enableOption(index) {
      this.$delete(this.options[index], 'disabled')
      this.disableArray[index] = false
      this.change()
    },
    addOption() {
      const currentIndex = this.options.length
      this.options.push({ label: `option${currentIndex}`, value: `value${currentIndex}` })
      this.change()
    },
    change() {
      const chain = new ChainOptions({
        options: this.options,
      })

      this.$emit('change', {
        chain,
        name: 'q-form-editor-modifier-input-options'
      })
    },
  }
}
</script>

<style lang="scss">
</style>
