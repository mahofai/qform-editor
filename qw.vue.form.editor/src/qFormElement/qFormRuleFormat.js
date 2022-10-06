import { FormElement } from './formElement'

class QFormRuleFormat extends FormElement {
  constructor({
    qFormElement, format, formatType, message, invalidMessage
  }) {
    super(qFormElement)
    this.format = format || null
    this.format_type = formatType || null
    this.message = message || 'format error message'
    this.invalidMessage = invalidMessage || 'Please set the error message.'
  }

  isValid() {
    const err = this.qFormElement.isValid()
    if (this.format && !this.message) {
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
            format: this.format,
            format_type: this.format_type,
            message: this.message
          }
        ]
      }
    }
  }
}

export {
  QFormRuleFormat
}
export default QFormRuleFormat
