<template>
  <div
    class="q-form-editor-modifier-input-age-range"
  >
    Age Range
    <input
      v-model="haveRange"
      type="checkbox"
      value="true"
      @change="change"
    >
    <div v-if="haveRange">
      MinAge:
      <input
        v-model="minAge"
        type="number"
        @change="change"
      >
      MaxAge:
      <input
        v-model="maxAge"
        type="number"
        @change="change"
      >
      Reference Date:
      <date-picker
        v-model="refDate"
        type="datetime"
        @change="change"
      ></date-picker>
      Error Message:
      <input
        v-model="message"
        @change="change"
      >
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import { ChainAgeRange } from '../qFormChain/chainAgeRange'
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
      minAge: null,
      maxAge: null,
      refDate: null,
      message: 'age range error message'
    }
  },
  computed: {
    intMinAge() {
      return this.minAge ? parseInt(this.minAge, 10) : null
    },
    intMaxAge() {
      return this.maxAge ? parseInt(this.maxAge, 10) : null
    }
  },
  watch: {
  },
  created() {
    if (this.rule && (this.rule.min_age || this.rule.max_age)) {
      this.haveRange = true
      this.minAge = this.rule.min_age
      this.maxAge = this.rule.max_age
      this.refDate = this.rule.reference_date
      this.message = this.rule.message
    }
    this.change()
  },
  methods: {
    change() {
      let chain
      if (this.haveRange) {
        chain = new ChainAgeRange({
          minAge: this.intMinAge,
          maxAge: this.intMaxAge,
          refDate: this.refDate,
          message: this.message,
        })
      }
      this.$emit('change', {
        chain,
        name: 'q-form-editor-modifier-input-age-range'
      })
    },
  }
}
</script>

<style lang="scss">
</style>
