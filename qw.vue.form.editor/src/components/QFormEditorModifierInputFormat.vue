<template>
  <div
    class="q-form-editor-modifier-input-format"
  >
    <div>
      <input
        v-model="haveFormat"
        type="checkbox"
        value="true"
        @change="change"
      > Format
    </div>

    <div v-if="haveFormat">
      Choose a format:
      <select v-model="selectedFormat" @change="change">
        <option
          v-for="(format,idx) in formats"
          :key="idx"
          :value="format"
        >
          {{ format.formatType }}
        </option>
      </select>
      <div v-if="otherFormat">
        <div>^{{ regexParts }}$</div>
        Other specific format name:
        <input
          v-model="inputFormatType"
          @change="change"
        >
        Or define a RegExp:
        <div
          class="q-form-editor-modifier-input-format__button"
          @click="addPart"
        >
          Add regex part
        </div>
        <div v-if="regexParts.length > 0" class="q-form-editor-modifier-input-format__hint">
          <div>Hint: For each part,</div>
          <div>1. Input matching characters (e.g. a-z/A-Z/0-8/a,b,c)</div>
          <div>2. Input "min" and "max" for the charatcer length in this part</div>
        </div>

        <div
          v-for="(part,index) in regexParts"
          :key="index"
        >
          <div>
            Input part {{ index + 1 }} match :
            <input v-model="part.match" @change="change">
          </div>
          <div>
            Input part {{ index + 1 }} min number:
            <input
              v-model="part.min"
              type="number"
              @change="change"
            >
          </div>
          <div>
            Input part {{ index + 1 }} max number:
            <input
              v-model="part.max"
              type="number"
              @change="change"
            >
          </div>
          <div
            class="q-form-editor-modifier-input-format__button"
            @click="deletePart(index)"
          >
            Delete
          </div>
        </div>
      </div>
      <div class="q-form-editor-modifier-input-format__label"> Error message: </div>
      <input
        v-model="message"
        @change="change"
      >
    </div>
  </div>
</template>

<script>
import { ChainFormat } from '../qFormChain/chainFormat'
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
      haveFormat: false,
      formats: [
        { formatType: '', regex: '' },
        { formatType: 'HKID', regex: '(^[A-Z]{1,2})(\\d{6})\\(([A\\d])\\)$' },
        { formatType: 'HK passport', regex: '^[K|k]\\d{8}$' },
        { formatType: 'Email', regex: '^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$' },
        { formatType: 'Other' },
      ],
      inputFormatType: '',
      regexParts: [],
      selectedFormat: null,
      message: 'haveFormat error message'
    }
  },
  computed: {
    otherFormat() {
      return (this.selectedFormat) ? this.selectedFormat.formatType === 'Other' : false
    }
  },
  watch: {
    regexParts: {
      handler() {
        if (this.regexParts.length > 0) {
          let string = ''
          this.regexParts.forEach((part) => {
            if (part.match && (part.min || part.max)) {
              string += `[${part.match}]{${part.min},${part.max}}`
            }
          })
          string = `^${string}$`
          this.selectedFormat.regex = string
        }
      },
      immediate: true,
      deep: true,
    }
  },
  created() {
    if (this.rule && this.rule.format_type) {
      this.haveFormat = true
      this.message = this.rule.message || ''
      const formatTypes = this.formats.map((format) => format.formatType)
      if (formatTypes.includes(this.rule.format_type) && this.rule.format_type !== 'Other') {
        this.selectedFormat = { formatType: this.rule.format_type, regex: this.rule.format }
      } else {
        this.selectedFormat = { formatType: 'Other' }
        this.inputFormatType = this.rule.format_type
        if (this.rule.format) {
          const parts = this.rule.format.match(/(\[[^\]]*\])(\{[^}]*\})/g)
          parts.forEach((part) => {
            const matchString = part.match(/(\[[^\]]*\])/)[0].slice(1, -1)
            const minMaxString = part.match(/(\{[^}]*\})/)[0].slice(1, -1)
            const minString = minMaxString.split(',')[0]
            const maxString = minMaxString.split(',')[1]
            this.regexParts.push({ match: matchString, min: minString, max: maxString })
          })
        }
      }
    }
    this.change()
  },
  methods: {
    addPart() {
      this.regexParts.push({ match: '', min: 1, max: 1 })
      this.change()
    },
    deletePart(index) {
      this.regexParts.splice(index, 1)
      this.change()
    },
    change() {
      let chain
      if (this.haveFormat) {
        let outputFormatType = ''
        if (this.inputFormatType) {
          outputFormatType = this.inputFormatType
        }
        if (this.selectedFormat) {
          outputFormatType = this.selectedFormat.formatType
        }
        chain = new ChainFormat({
          format: (this.selectedFormat) ? this.selectedFormat.regex : '',
          formatType: outputFormatType,
          message: this.message
        })
      }
      this.$emit('change', {
        chain,
        name: 'q-form-editor-modifier-input-format'
      })
    },
  }
}
</script>

<style lang="scss">
</style>
