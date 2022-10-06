import { Chain } from './chain'
import { QFormTitle } from '../qFormElement/qFormTitle'

class ChainTitle extends Chain {
  constructor(options) {
    const newOptions = options || {}
    super(newOptions)
    this.title = newOptions.title
  }

  async handleRequest(qFormElement) {
    const newObj = new QFormTitle({
      qFormElement,
      title: this.title,
    })
    const result = await this.next(newObj)
    return result
  }
}

export { ChainTitle }
export default ChainTitle
