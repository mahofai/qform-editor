<template>
  <div
    class="q-form-editor-modifier-input-date-range"
  >
    Date Range
    <input
      v-model="haveRange"
      type="checkbox"
      value="true"
      @change="change"
    >
    <date-picker
      v-if="haveRange"
      v-model="range"
      type="datetime"
      valueType="timestamp"
      range
      @change="change"
    ></date-picker>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import { ChainDateRange } from '../qFormChain/chainDateRange'
import QFormRendererCSSMixin from '../mixins/QFormRendererCSSMixin'
import QFormRendererInputMixin from '../mixins/QFormRendererInputMixin'

export default {
  components: {
    DatePicker
  },
  mixins: [QFormRendererCSSMixin, QFormRendererInputMixin],
  props: {
    rule: { type: Object, default: null }
  },
  inject: [],
  data() {
    return {
      haveRange: false,
      range: []
    }
  },
  computed: {
    minDate() {
      if (this.range) {
        return this.range[0]
      }
      return null
    },
    maxDate() {
      if (this.range) {
        return this.range[1]
      }
      return null
    }
  },
  watch: {
  },
  created() {
    if (this.rule && (this.rule.min_date || this.rule.max_date)) {
      this.haveRange = true
      this.range.push(this.rule.min_date)
      this.range.push(this.rule.max_date)
    }
    this.change()
  },
  methods: {
    change() {
      let chain
      if (this.haveRange) {
        chain = new ChainDateRange({
          minDate: this.minDate,
          maxDate: this.maxDate
        })
      }
      this.$emit('change', {
        chain,
        name: 'q-form-editor-modifier-input-date-range'
      })
    },
  }
}
</script>

<style lang="scss">
</style>
