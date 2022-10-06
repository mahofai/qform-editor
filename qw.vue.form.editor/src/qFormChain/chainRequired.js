import { Chain } from './chain'
import { QFormRuleRequired } from '../qFormElement/qFormRuleRequired'

class ChainRequired extends Chain {
  constructor(options) {
    const newOptions = options || {}
    super(newOptions)
    this.required = newOptions.required || false
    this.message = newOptions.message || ''
  }

  async handleRequest(qFormElement) {
    const newObj = new QFormRuleRequired({
      qFormElement,
      required: this.required,
      message: this.message
    })
    const result = await this.next(newObj)
    return result
  }
}

export { ChainRequired }
export default ChainRequired
