import { Chain } from './chain'

class ChainManager {
  constructor(chains, row, value) {
    this.list = []
    this.row = row
    this.value = value
    this.createChains(chains)
  }

  createChains(chains) {
    if (chains) {
      chains.forEach((chain) => {
        if (chain instanceof Chain) {
          if (this.list.length > 0) {
            this.list[this.list.length - 1].setSuccessor(chain)
          }
          this.list.push(chain)
        }
      })
    }
  }

  getRowName() {
    return (this.row && this.row.name) ? this.row.name : null
  }

  getValue() {
    return this.value
  }

  handleRequest() {
    if (this.row && this.list.length > 0) {
      const result = this.list[0].handleRequest({ row: this.row, value: this.value })
      return result
    }
    return []
  }

  setValue(value) {
    this.value = value
    return this
  }
}

export { ChainManager }
export default ChainManager
