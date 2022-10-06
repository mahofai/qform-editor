<template>
  <div
    class="q-form-renderer-button"
  >
    <div
      @click="click"
    >
      {{ label }}
    </div>
  </div>
</template>

<script>
import QFormRendererCSSMixin from '../mixins/QFormRendererCSSMixin'

export default {
  mixins: [QFormRendererCSSMixin],
  props: {
    row: { type: Object, default: () => ({}) },
  },
  data() {
    return {
    }
  },
  computed: {
    label() {
      return this.row && this.row.label ? (this.row.label || '') : ''
    },
    methodName() {
      return this.row && this.row.methodName ? (this.row.methodName || null) : null
    }
  },
  methods: {
    click(e) {
      e.preventDefault()
      if (this.methodName && typeof this.methodName === 'string') {
        this.$emit(this.methodName)
      }
    }
  }
}
</script>

<style lang="scss">
</style>
