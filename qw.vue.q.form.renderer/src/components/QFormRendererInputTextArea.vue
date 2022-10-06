<template>
  <div
    class="q-form-renderer-input-text-area"
  >
    <label>{{ label }}
      <textarea
        v-model="value"
        class="q-form-renderer-input-text-area__input"
        :disabled="disabled"
        :name="name"
        :placeholder="placeholder"
        :title="title"
        @change="change"
        @blur="change"
      />
    </label>
    <label v-if="counterType">{{ counterType }} count: {{ count }}</label>
    <i v-if="joinedErrMsg" class="q-form-renderer-input-text-area__error input-error">{{ joinedErrMsg }}</i>
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
  }
}
</script>

<style lang="scss">
</style>
