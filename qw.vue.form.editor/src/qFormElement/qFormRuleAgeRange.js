import { FormElement } from './formElement'

class QFormRuleAgeRange extends FormElement {
  constructor({
    qFormElement, minAge, refDate, maxAge, message, invalidMessage
  }) {
    super(qFormElement)
    this.minAge = minAge
    this.maxAge = maxAge
    this.refDate = refDate
    this.message = message || 'age range error message'
    this.invalidMessage = invalidMessage || 'invalid age range'
  }

  isValid() {
    const err = this.qFormElement.isValid()
    if (!this.minAge && !this.maxAge) {
      err.push(this.invalidMessage)
    } else if (this.minAge && this.maxAge && this.minAge > this.maxAge) {
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
            min_age: this.minAge,
            max_age: this.maxAge,
            reference_date: this.refDate,
            message: this.message
          }
        ]
      }
    }
  }
}

export {
  QFormRuleAgeRange
}
export default QFormRuleAgeRange
