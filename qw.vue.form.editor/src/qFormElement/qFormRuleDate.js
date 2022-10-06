import { FormElement } from './formElement'

class QFormRuleDate extends FormElement {
  constructor({
    qFormElement, dateType, format
  }) {
    super(qFormElement)
    this.dateType = dateType
    this.format = format
  }

  isValid() {
    return this.qFormElement.isValid()
  }

  toObject() {
    const json = this.qFormElement.toObject()
    return {
      ...json,
      type: this.dateType,
      format: this.format,
      rule: {
        change: [
          ...json.rule.change,
        ]
      }
    }
  }
}

export {
  QFormRuleDate
}
export default QFormRuleDate
