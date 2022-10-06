import { FormElement } from './formElement'

class QFormOption extends FormElement {
  constructor({
    qFormElement, options, invalidMessage
  }) {
    super(qFormElement)
    this.options = options
    this.invalidMessage = invalidMessage || 'Please add at least one option'
  }

  isValid() {
    const err = this.qFormElement.isValid()
    if (this.options && this.options.length === 0) {
      err.push(this.invalidMessage)
    }
    return err
  }

  toObject() {
    const json = this.qFormElement.toObject()
    return {
      ...json,
      options: this.options,
      rule: {
        change: [
          ...json.rule.change,
        ]
      }
    }
  }
}

export {
  QFormOption
}
export default QFormOption
