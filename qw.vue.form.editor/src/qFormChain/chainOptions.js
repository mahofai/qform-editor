import { Chain } from './chain'
import { QFormOption } from '../qFormElement/qFormOption'

class ChainOptions extends Chain {
  constructor(options) {
    const newOptions = options || {}
    super(newOptions)
    this.options = newOptions.options || []
  }

  async handleRequest(qFormElement) {
    const newObj = new QFormOption({
      qFormElement,
      options: this.options,
    })
    const result = await this.next(newObj)
    return result
  }
}

export { ChainOptions }
export default ChainOptions
