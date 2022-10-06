import { Chain } from './chain'
import { QFormRuleAgeRange } from '../qFormElement/qFormRuleAgeRange'

class ChainAgeRange extends Chain {
  constructor(options) {
    const newOptions = options || {}
    super(newOptions)
    this.minAge = newOptions.minAge
    this.maxAge = newOptions.maxAge
    this.refDate = newOptions.refDate
    this.message = newOptions.message
  }

  async handleRequest(qFormElement) {
    const newObj = new QFormRuleAgeRange({
      qFormElement,
      minAge: this.minAge,
      maxAge: this.maxAge,
      refDate: this.refDate,
      message: this.message
    })
    const result = await this.next(newObj)
    return result
  }
}

export { ChainAgeRange }
export default ChainAgeRange
