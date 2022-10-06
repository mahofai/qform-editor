import { Chain } from './chain'
import { QFormRuleFileSize } from '../qFormElement/qFormRuleFileSize'

class ChainFileSize extends Chain {
  constructor(options) {
    const newOptions = options || {}
    super(newOptions)
    this.maxSize = newOptions.maxSize || '0KB'
    this.message = newOptions.message || 'file too large'
  }

  async handleRequest(qFormElement) {
    const newObj = new QFormRuleFileSize({
      qFormElement,
      maxSize: this.maxSize,
      message: this.message
    })
    const result = await this.next(newObj)
    return result
  }
}
export { ChainFileSize }
export default ChainFileSize
