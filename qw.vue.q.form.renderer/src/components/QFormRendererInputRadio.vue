<template>
  <div
    class="q-form-renderer-radio-input"
  >
    <div class="q-form-renderer-input-radio__input-group">
      {{ label }}
      <label
        v-for="(option, idx) in row.options"
        :key="idx"
        class="q-form-renderer-input-radio__item"
      >
        <input
          v-model="value"
          class="q-form-renderer-input-radio__input"
          type="radio"
          :disabled="option.disabled"
          :name="name"
          :value="option.value"
          @change="change"
        >
        {{ option.label }}
      </label>
      <button @click="clear">Clear</button>
      <i v-if="joinedErrMsg">{{ joinedErrMsg }}</i>
    </div>
  </div>
</template>

<script>
import QFormRendererCSSMixin from '../mixins/QFormRendererCSSMixin'
import QFormRendererInputMixin from '../mixins/QFormRendererInputMixin'

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
  },
  methods: {
    clear() {
      this.value = ''
      this.change()
    }
  }
}
</script>

<style lang="scss">
</style>
