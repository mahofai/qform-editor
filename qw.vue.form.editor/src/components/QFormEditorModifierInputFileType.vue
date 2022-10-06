<template>
  <div
    class="q-form-editor-modifier-input-file-type"
  >
    <input
      v-model="haveType"
      type="checkbox"
      value="true"
      @change="change"
    >
    <div class="q-form-editor-modifier-input-file-type__label"> FileType </div>

    <div v-if="haveType">
      <div v-for="(fileType, index) in fileTypes" :key="index">
        <input
          v-model="selectedType"
          type="radio"
          :value="fileType"
          @change="change"
        >
        <div class="q-form-editor-modifier-input-file-type__label">
          {{ fileType }}
        </div>
      </div>

      <div class="q-form-editor-modifier-input-file-type__label"> Error message: </div>
      <input
        v-model="message"
        @change="change"
      >
    </div>
  </div>
</template>

<script>
import { ChainFileType } from '../qFormChain/chainFileType'
import QFormRendererCSSMixin from '../mixins/QFormRendererCSSMixin'
import QFormRendererInputMixin from '../mixins/QFormRendererInputMixin'

export default {
  mixins: [QFormRendererCSSMixin, QFormRendererInputMixin],
  props: {
    rule: { type: Object, default: null }
  },
  inject: [
  ],
  data() {
    return {
      haveType: false,
      fileTypes: ['jpg', 'txt', 'mp4', 'xsl'],
      selectedType: 'txt',
      message: 'invalid file type',
    }
  },
  computed: {
  },
  created() {
    if (this.rule && this.rule.file_type) {
      this.haveType = true
      this.selectedType = this.rule.file_type
      this.message = this.rule.message
    }
    this.change()
  },
  methods: {
    change() {
      let chain
      if (this.haveType) {
        chain = new ChainFileType({
          fileType: this.selectedType,
          message: this.message
        })
      }
      this.$emit('change', {
        chain,
        name: 'q-form-editor-modifier-input-file-type'
      })
    },
  }
}
</script>

<style lang="scss">
</style>
