import { Chain } from './chain'
import { QFormRuleValueMinMax } from '../qFormElement/qFormRuleValueMinMax'

class ChainValueMinMax extends Chain {
  constructor(options) {
    const newOptions = options || {}
    super(newOptions)
    this.minValue = newOptions.minValue
    this.maxValue = newOptions.maxValue
    this.message = newOptions.message
  }

  async handleRequest(qFormElement) {
    const newObj = new QFormRuleValueMinMax({
      qFormElement,
      minValue: this.minValue,
      maxValue: this.maxValue,
      message: this.message
    })
    const result = await this.next(newObj)
    return result
  }
}

export { ChainValueMinMax }
export default ChainValueMinMax
