import { ChainManager } from '../qFormChain/chainManager'

export default {
  props: {
    chainManager: { type: Object, default: () => ({}) },
    row: { type: Object, default: () => ({}) },
    formData: { type: Object, default: () => ({}) },
    executeHook: { type: Function, default: null },
    err: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      value: ''
    }
  },
  computed: {
    count() {
      if (this.counterType === 'Word') {
        return (this.value.trim().match(/\b\S+\b/g) || []).length
      }
      if (this.counterType === 'Character') {
        return this.value.length
      }
      return null
    },
    counterType() {
      let type = null
      this.chainManager.list.forEach((chain) => {
        if ((chain.min > 5 || chain.max > 5) && chain.count_word) {
          type = 'Word'
        } else if (chain.min > 5 || chain.max > 5) {
          type = 'Character'
        }
      })
      return type
    },
    disabled() {
      return this.row && typeof this.row.disabled === 'boolean' ? this.row.disabled : false
    },
    joinedErrMsg() {
      if (this.err[this.name]) {
        return this.err[this.name].join('; ')
      }
      return null
    },
    label() {
      return this.row && this.row.label ? (this.row.label || '') : ''
    },
    name() {
      return this.row && this.row.name ? (this.row.name || '') : ''
    },
    placeholder() {
      return this.row && this.row.placeholder ? (this.row.placeholder || '') : ''
    },
    title() {
      return this.row && this.row.title ? (this.row.title || '') : ''
    },
  },
  watch: {
    formData: {
      handler() {
        this.value = this.formData[this.name] || ''
        if (this.chainManager instanceof ChainManager) {
          this.chainManager.setValue(this.value)
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    change() {
      this.chainManager.setValue(this.value)
      this.$emit('validate', this.chainManager)
    }
  }
}
