<template>
  <div
    class="q-form-renderer-html"
    v-html="content"
  ></div>
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
    content() {
      return this.row && this.row.content ? (this.row.content || '') : ''
    }
  },
}
</script>

<style lang="scss">
</style>
