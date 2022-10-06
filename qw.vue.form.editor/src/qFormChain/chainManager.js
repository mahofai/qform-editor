import { Chain } from './chain'

class ChainManager {
  constructor() {
    this.list = []
  }

  createChain(chains) {
    chains.forEach((chain) => {
      if (chain instanceof Chain) {
        if (this.list.length > 0) {
          this.list[this.list.length - 1].setSuccessor(chain)
        }
        this.list.push(chain)
      }
    })
  }

  async handleRequest(obj) {
    if (this.list.length > 0) {
      const result = await this.list[0].handleRequest(obj)
      return result
    }
    return obj
  }
}

export { ChainManager }
export default ChainManager
