<template>
  <div
    class="q-form-renderer-input-checkbox"
  >
    <div class="q-form-renderer-input-checkbox__input-group">
      {{ label }}
      <label
        v-for="(option, idx) in row.options"
        :key="idx"
        class="q-form-renderer-input-checkbox__item"
      >
        <input
          v-model="value[option.value]"
          class="q-form-renderer-input-checkbox__input"
          type="checkbox"
          :disabled="option.disabled"
          :name="name"
          :value="option.value"
          @change="changeOption"
        >
        {{ option.label }}
      </label>
      <i v-if="joinedErrMsg" class="q-form-renderer-input-text__error input-error">{{ joinedErrMsg }}</i>
    </div>
  </div>
</template>

<script>
import QFormRendererCSSMixin from '../mixins/QFormRendererCSSMixin'
import QFormRendererInputMixin from '../mixins/QFormRendererInputMixin'
import { ChainManager } from '../qFormChain/chainManager'

export default {
  mixins: [QFormRendererCSSMixin, QFormRendererInputMixin],
  props: {
  },
  data() {
    return {
    }
  },
  computed: {
  },
  watch: {
    formData: {
      handler() {
        this.value = { ...this.formData[this.name] }
        if (this.chain instanceof ChainManager) {
          this.chain.setValue(this.value)
        }
      },
      immediate: true,
      deep: true
    }
  },
  created() {
  },
  methods: {
    changeOption() {
      Object.keys(this.value).forEach((key) => {
        if (!this.value[key]) delete this.value[key]
      })
      this.change()
    }
  }
}
</script>

<style lang="scss">
</style>
