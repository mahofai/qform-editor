<template>
  <div
    class="q-form-renderer-input-number"
  >
    <label>
      {{ label }}
      <input
        v-model="value"
        :disabled="row.disabled"
        :name="name"
        :placeholder="placeholder"
        :title="row.title"
        type="number"
        @change="change"
        @blur="change"
      >
    </label>
    <label v-if="counterType">{{ counterType }} count: {{ count }}</label>
    <i v-if="joinedErrMsg">{{ joinedErrMsg }}</i>
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
