import { Chain } from './chain'
import { QFormRuleDateRange } from '../qFormElement/qFormRuleDateRange'

class ChainDateRange extends Chain {
  constructor(options) {
    const newOptions = options || {}
    super(newOptions)
    this.minDate = newOptions.minDate
    this.maxDate = newOptions.maxDate
  }

  async handleRequest(qFormElement) {
    const newObj = new QFormRuleDateRange({
      qFormElement,
      minDate: this.minDate,
      maxDate: this.maxDate
    })
    const result = await this.next(newObj)
    return result
  }
}

export { ChainDateRange }
export default ChainDateRange
