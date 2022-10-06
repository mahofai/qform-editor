import { Chain } from './chain'

class ChainMinMax extends Chain {
  constructor(settings = {}) {
    super()
    this.min = settings.min
    this.max = settings.max
    this.count_word = settings.count_word
    this.message = settings.message || `Please input ${this.min} to ${this.max} characters`
  }

  handleRequest(obj) {
    const result = this.next(obj)
    let count
    if (this.count_word) {
      count = (obj.value.trim().match(/\b\S+\b/g) || []).length
    } else {
      switch (obj.row.customComponentName) {
        case 'q-form-renderer-input-checkbox':
          count = Object.values(obj.value).filter(Boolean).length
          break
        case 'q-form-renderer-input-file':
          count = (obj.value) ? 1 : 0
          break
        default:
          count = (obj.value) ? obj.value.length : 0
      }
    }
    if (count < this.min || count > this.max) {
      result.push(this.message)
    }
    return result
  }
}

export { ChainMinMax }
export default ChainMinMax
