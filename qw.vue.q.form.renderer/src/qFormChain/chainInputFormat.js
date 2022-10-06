import { Chain } from './chain'

function validHKID(value) {
  const regexResults = /(^[A-Z]{1,2})(\d{6})\(([A\d])\)$/.exec(value)
  if (!regexResults) {
    return false
  }
  const digits = regexResults.slice(1, 4)
  let checkSum = 0
  if (digits[0].length > 1) {
    checkSum += 9 * (digits[0].charCodeAt(0) - 55) + 8 * (digits[0].charCodeAt(1) - 55)
  } else {
    checkSum += 9 * 36 + 8 * (digits[0].charCodeAt(0) - 55)
  }
  digits[1].split('').forEach((digit, idx) => {
    checkSum += (7 - idx) * digit
  })
  const checkDigit = Number.isNaN(parseInt(digits[2], 10)) ? 1 : 11 - parseInt(digits[2], 10)
  return checkSum % 11 === checkDigit
}

class ChainInputFormat extends Chain {
  constructor(settings = {}) {
    super()
    this.format = new RegExp(settings.format || '')
    this.format_type = settings.format_type
    this.message = settings.message || 'Invalid input'
  }

  handleRequest(obj) {
    const result = this.next(obj)
    if (this.format_type === 'hkid' && !validHKID(obj.value)) {
      result.push(this.message)
    } else if (!this.hkid && !this.format.test(obj.value)) {
      result.push(this.message)
    }
    return result
  }
}

export { ChainInputFormat }
export default ChainInputFormat
