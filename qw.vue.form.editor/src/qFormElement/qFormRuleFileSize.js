import { FormElement } from './formElement'

class QFormRuleFileSize extends FormElement {
  constructor({
    qFormElement, maxSize, message, invalidMessage
  }) {
    super(qFormElement)
    this.maxSize = maxSize
    this.message = message || ''
    this.invalidMessage = invalidMessage || 'file size invalid '
  }

  isValid() {
    return this.qFormElement.isValid()
  }

  toObject() {
    const json = this.qFormElement.toObject()
    return {
      ...json,
      rule: {
        change: [
          ...json.rule.change,
          {
            max_size: this.maxSize,
            message: this.message
          }
        ]
      }
    }
  }
}
export { QFormRuleFileSize }
export default QFormRuleFileSize
