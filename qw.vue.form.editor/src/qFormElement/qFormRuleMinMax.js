import { FormElement } from './formElement'

class QFormRuleMinMax extends FormElement {
  constructor({
    qFormElement, min, max, countWord, message, invalidMessage
  }) {
    super(qFormElement)
    this.min = min
    this.max = max
    this.countWord = countWord
    this.message = message || ' range error message'
    this.invalidMessage = invalidMessage || 'invalid range'
  }

  isValid() {
    const err = this.qFormElement.isValid()
    if (!this.min && !this.max) {
      err.push(this.invalidMessage)
    } else if (this.min && this.max && this.min > this.max) {
      err.push(this.invalidMessage)
    }
    return err
  }

  toObject() {
    const json = this.qFormElement.toObject()
    return {
      ...json,
      rule: {
        change: [
          ...json.rule.change,
          {
            min: this.min,
            max: this.max,
            count_word: this.countWord,
            message: this.message
          }
        ]
      }
    }
  }
}

export {
  QFormRuleMinMax
}
export default QFormRuleMinMax
