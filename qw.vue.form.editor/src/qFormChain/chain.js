class Chain {
  constructor(options) {
    const newOptions = options || {}
    this.options = newOptions
    this.successor = null
  }

  async next(obj) {
    if (this.successor) {
      const newObj = await this.successor.handleRequest(obj)
      return newObj
    }
    return obj
  }

  setSuccessor(successor) {
    this.successor = successor
    return this
  }
}

export { Chain }
export default Chain
