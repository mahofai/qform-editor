import { Chain } from './chain'
import { QFormRuleDate } from '../qFormElement/qFormRuleDate'

class ChainDate extends Chain {
  constructor(options) {
    const newOptions = options || {}
    super(newOptions)
    this.dateType = newOptions.dateType
    this.format = newOptions.format
  }

  async handleRequest(qFormElement) {
    const newObj = new QFormRuleDate({
      qFormElement,
      dateType: this.dateType,
      format: this.format
    })
    const result = await this.next(newObj)
    return result
  }
}

export { ChainDate }
export default ChainDate
