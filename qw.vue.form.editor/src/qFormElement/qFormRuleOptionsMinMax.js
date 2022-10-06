import { FormElement } from './formElement'

class QFormRuleOptionsMinMax extends FormElement {
  constructor({
    qFormElement, minOptions, maxOptions, message, invalidMessage
  }) {
    super(qFormElement)
    this.minOptions = minOptions
    this.maxOptions = maxOptions
    this.message = message || ' range error message'
    this.invalidMessage = invalidMessage || 'invalid range'
  }

  isValid() {
    const err = this.qFormElement.isValid()
    if (!this.minOptions && !this.maxOptions) {
      err.push(this.invalidMessage)
    } else if (this.minOptions && this.maxOptions && this.minOptions > this.maxOptions) {
      err.push(this.invalidMessage)
    } else if ((this.qFormElement && this.qFormElement.options)
          && (this.minOptions > this.qFormElement.options.length || this.maxOptions > this.qFormElement.options.length)) {
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
            min_options: this.minOptions,
            max_options: this.maxOptions,
            message: this.message
          }
        ]
      }
    }
  }
}

export { QFormRuleOptionsMinMax }
export default QFormRuleOptionsMinMax
