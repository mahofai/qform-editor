<template>
  <div
    class="q-form-renderer-input-select-one"
  >
    <label>{{ label }}
      <select
        v-model="value"
        class="q-form-renderer-input-select-one__input"
        :class="cssElement()"
        :disabled="disabled"
        :name="name"
        :title="title"
        @change="change"
        @blur="change"
      >
        <option value=""></option>
        <option
          v-for="(option, index) in row.options"
          :key="index"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </label>
    <i v-if="joinedErrMsg" class="q-form-renderer-input-select-one__error input-error">{{ joinedErrMsg }}</i>
  </div>
</template>

<script>
import QFormRendererCSSMixin from '../mixins/QFormRendererCSSMixin'
import QFormRendererInputMixin from '../mixins/QFormRendererInputMixin'
import QFormRendererStatusMixin from '../mixins/QFormRendererStatusMixin'

export default {
  mixins: [QFormRendererCSSMixin, QFormRendererInputMixin, QFormRendererStatusMixin],
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
