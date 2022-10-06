import { Chain } from './chain'
import { QFormRuleFormat } from '../qFormElement/qFormRuleFormat'

class ChainFormat extends Chain {
  constructor(options) {
    const newOptions = options || {}
    super(newOptions)
    this.format = newOptions.format
    this.formatType = newOptions.formatType
    this.message = newOptions.message || ''
  }

  async handleRequest(qFormElement) {
    const newObj = new QFormRuleFormat({
      qFormElement,
      format: this.format,
      formatType: this.formatType,
      message: this.message
    })
    const result = await this.next(newObj)
    return result
  }
}

export { ChainFormat }
export default ChainFormat
