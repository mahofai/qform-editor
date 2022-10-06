<template>
  <div
    class="q-form-renderer-input-file"
  >
    <label>{{ label }}
      <input
        ref="fileInput"
        type="file"
        :disabled="row.disabled"
        :name="name"
        :title="title"
        @change="changeFile"
      >
    </label>
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
    changeFile() {
      [this.value] = this.$refs.fileInput.files
      this.change()
    }
  }
}
</script>

<style lang="scss">
</style>
