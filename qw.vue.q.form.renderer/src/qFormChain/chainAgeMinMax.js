import { Chain } from './chain'

class ChainAgeMinMax extends Chain {
  constructor(settings = {}) {
    super()
    this.min_age = settings.min_age
    this.max_age = settings.max_age
    this.reference_date = new Date(settings.reference_date || Date.now())
    this.message = settings.message || `Age must be from ${this.min_age} to ${this.max_age}`
  }

  handleRequest(obj) {
    const result = this.next(obj)
    const age = new Date(this.reference_date - obj.value).getUTCFullYear() - 1970
    if (age < this.min_age || age > this.max_age) {
      result.push(this.message)
    }
    return result
  }
}

export { ChainAgeMinMax }
export default ChainAgeMinMax
