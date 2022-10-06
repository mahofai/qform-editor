import { FormElement } from './formElement'

class QFormRuleRequired extends FormElement {
  constructor({
    qFormElement, required, message, invalidMessage
  }) {
    super(qFormElement)
    this.required = required || false
    this.message = message || 'required error message'
    this.invalidMessage = invalidMessage || 'Please set the error message.'
  }

  isValid() {
    const err = this.qFormElement.isValid()
    if (this.required && !this.message) {
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
            required: this.required,
            message: this.message
          }
        ]
      }
    }
  }
}

export {
  QFormRuleRequired
}
export default QFormRuleRequired
