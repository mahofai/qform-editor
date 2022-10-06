import { Chain } from './chain'

class ChainValueMinMax extends Chain {
  constructor(settings = {}) {
    super()
    this.min_value = settings.min_value
    this.max_value = settings.max_value
    this.message = settings.message || `Out of range ${this.min_value} to ${this.max_value}`
  }

  handleRequest(obj) {
    const result = this.next(obj)
    if (obj.value < this.min_value || obj.value > this.max_value) {
      result.push(this.message)
    }
    return result
  }
}

export { ChainValueMinMax }
export default ChainValueMinMax
