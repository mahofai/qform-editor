import { Chain } from './chain'

function getTimestamp(date) {
  return new Date(date).getTime()
}

class ChainDateMinMax extends Chain {
  constructor(settings = {}) {
    super()
    this.min_timestamp = getTimestamp(settings.min_date)
    this.max_timestamp = getTimestamp(settings.max_date)
    this.message = settings.message || `Out of range ${settings.min_date} to ${settings.max_date}`
  }

  handleRequest(obj) {
    const result = this.next(obj)
    if (obj.value instanceof Array) {
      if (obj.value[0] < this.min_timestamp || obj.value[1] > this.max_timestamp) {
        result.push(this.message)
      }
    } else if (obj.value < this.min_timestamp || obj.value > this.max_timestamp) {
      result.push(this.message)
    }
    return result
  }
}

export { ChainDateMinMax }
export default ChainDateMinMax
