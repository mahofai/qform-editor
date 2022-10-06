import { Chain } from './chain'
import { QFormRuleFileType } from '../qFormElement/qFormRuleFileType'

class ChainFileType extends Chain {
  constructor(options) {
    const newOptions = options || {}
    super(newOptions)
    this.fileType = newOptions.fileType || 'txt'
    this.message = newOptions.message || 'incorrect file type'
  }

  async handleRequest(qFormElement) {
    const newObj = new QFormRuleFileType({
      qFormElement,
      fileType: this.fileType,
      message: this.message
    })
    const result = await this.next(newObj)
    return result
  }
}
export { ChainFileType }
export default ChainFileType
