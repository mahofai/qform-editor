import { Chain } from './chain'
import { QFormRuleMinMax } from '../qFormElement/qFormRuleMinMax'

class ChainMinMax extends Chain {
  constructor(options) {
    const newOptions = options || {}
    super(newOptions)
    this.min = newOptions.min
    this.max = newOptions.max
    this.countWord = newOptions.countWord
    this.message = newOptions.message
  }

  async handleRequest(qFormElement) {
    const newObj = new QFormRuleMinMax({
      qFormElement,
      min: this.min,
      max: this.max,
      countWord: this.countWord,
      message: this.message
    })
    const result = await this.next(newObj)
    return result
  }
}

export { ChainMinMax }
export default ChainMinMax
