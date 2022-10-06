<template>
  <div
    class="q-form-renderer-input-date-range"
  >
    <label>{{ label }}
      <date-picker
        v-model="value"
        class="q-form-renderer-input-date-range__input"
        :disabled="disabled"
        :format="format"
        :placeholder="placeholder"
        :range="true"
        :type="type"
        value-type="timestamp"
        @change="onChange"
        @blur="onChange"
      ></date-picker>
    </label>
    <i v-if="joinedErrMsg">{{ joinedErrMsg }}</i>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
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
      return this.row.type ? this.row.type : null
    },
    format() {
      return this.row.format ? this.row.format : null
    },
  },
  watch: {
  },
  created() {
  },
  methods: {
    onChange() {
      if (this.type === 'date') {
        const newDate = new Date(this.value[1])
        newDate.setHours(23, 59, 59)
        this.value[1] = newDate.getTime()
      }
      this.change()
    }
  }
}
</script>

<style lang="scss">
</style>
