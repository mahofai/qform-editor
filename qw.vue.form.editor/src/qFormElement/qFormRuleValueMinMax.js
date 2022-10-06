import { FormElement } from './formElement'

class QFormRuleValueMinMax extends FormElement {
  constructor({
    qFormElement, minValue, maxValue, message, invalidMessage
  }) {
    super(qFormElement)
    this.minValue = minValue
    this.maxValue = maxValue
    this.message = message || 'range error message'
    this.invalidMessage = invalidMessage || 'invalid range'
  }

  isValid() {
    const err = this.qFormElement.isValid()
    if (!this.minValue && !this.maxValue) {
      err.push(this.invalidMessage)
    } else if (this.minValue && this.maxValue && this.minValue > this.maxValue) {
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
            min_value: this.minValue,
            max_value: this.maxValue,
            message: this.message
          }
        ]
      }
    }
  }
}

export {
  QFormRuleValueMinMax
}
export default QFormRuleValueMinMax
