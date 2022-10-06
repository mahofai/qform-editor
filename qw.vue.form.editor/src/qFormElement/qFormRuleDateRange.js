import { FormElement } from './formElement'

class QFormRuleDateRange extends FormElement {
  constructor({
    qFormElement, minDate, maxDate, invalidMessage

  }) {
    super(qFormElement)
    this.minDate = minDate
    this.maxDate = maxDate
    this.invalidMessage = invalidMessage || 'invalid date range'
  }

  isValid() {
    const err = this.qFormElement.isValid()
    if (!this.minDate && !this.maxDate) {
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
            min_date: this.minDate,
            max_date: this.maxDate
          }
        ]
      }
    }
  }
}

export { QFormRuleDateRange }
export default QFormRuleDateRange
