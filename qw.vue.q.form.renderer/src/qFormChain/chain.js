class Chain {
  constructor() {
    this.successor = null
  }

  next(obj) {
    if (this.successor) {
      const newObj = this.successor.handleRequest(obj)
      return newObj
    }
    return []
  }

  setSuccessor(successor) {
    this.successor = successor
    return this
  }

  setValue(value) {
    this.value = value
    return this
  }
}

export { Chain }
export default Chain
