<template>
  <div
    class="q-form-renderer-input-date"
  >
    <label>{{ label }}
      <date-picker
        v-model="value"
        class="q-form-renderer-input-date__input"
        :disabled="disabled"
        :format="format"
        :placeholder="placeholder"
        :type="type"
        value-type="timestamp"
        @change="change"
        @blur="change"
      ></date-picker>
    </label>
    <i v-if="joinedErrMsg">{{ joinedErrMsg }}</i>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import QFormRendererCSSMixin from '../mixins/QFormRendererCSSMixin'
import QFormRendererInputMixin from '../mixins/QFormRendererInputMixin'

export default {
  components: {
    DatePicker,
  },
  mixins: [QFormRendererCSSMixin, QFormRendererInputMixin],
  props: {
  },
  data() {
    return {
    }
  },
  computed: {
    type() {
      return this.row.type ? this.row.type : 'date'
    },
    format() {
      return this.row.format ? this.row.format : 'YYYY-MM-DD'
    },
  },
  watch: {
  },
  created() {
  },
  methods: {
  }
}
</script>

<style lang="scss">
</style>
