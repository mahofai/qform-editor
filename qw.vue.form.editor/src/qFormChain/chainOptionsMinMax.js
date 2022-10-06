import { Chain } from './chain'
import { QFormRuleOptionsMinMax } from '../qFormElement/qFormRuleOptionsMinMax'

class ChainOptionsMinMax extends Chain {
  constructor(options) {
    const newOptions = options || {}
    super(newOptions)
    this.minOptions = newOptions.minOptions
    this.maxOptions = newOptions.maxOptions
    this.message = newOptions.message
  }

  async handleRequest(qFormElement) {
    const newObj = new QFormRuleOptionsMinMax({
      qFormElement,
      minOptions: this.minOptions,
      maxOptions: this.maxOptions,
      message: this.message
    })
    const result = await this.next(newObj)
    return result
  }
}

export { ChainOptionsMinMax }
export default ChainOptionsMinMax
