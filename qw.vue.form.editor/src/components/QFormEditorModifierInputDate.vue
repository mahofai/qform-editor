<template>
  <div
    class="q-form-editor-modifier-input-date"
  >
    <div>
      Type:
      <input
        v-model="dateType"
        type="radio"
        value="date"
        @change="change"
      >
      <div class="q-form-editor-modifier-input-date__label"> Date only </div>
      <input
        v-model="dateType"
        type="radio"
        value="datetime-local"
        @change="change"
      >
      <div class="q-form-editor-modifier-input-date__label"> Date Time </div>

      <div>
        <div class="q-form-editor-modifier-input-date__label"> Format: </div>
        <input
          v-model="format"
          @change="change"
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ChainDate } from '../qFormChain/chainDate'
import QFormRendererCSSMixin from '../mixins/QFormRendererCSSMixin'
import QFormRendererInputMixin from '../mixins/QFormRendererInputMixin'

export default {
  mixins: [QFormRendererCSSMixin, QFormRendererInputMixin],
  props: {
    rule: { type: Object, default: null }
  },
  inject: [],
  data() {
    return {
      dateType: '',
      format: 'YYYY/MM/DD'
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
    this.dateType = this.row.type || 'date'
    this.format = this.row.format || 'YYYY/MM/DD'
    this.change()
  },
  methods: {
    change() {
      const chain = new ChainDate({
        dateType: this.dateType,
        format: this.format
      })
      this.$emit('change', {
        chain,
        name: 'q-form-editor-modifier-input-date'
      })
    },
  }
}
</script>

<style lang="scss">
</style>
