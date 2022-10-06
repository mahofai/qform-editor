import { FormElement } from './formElement'

class QFormRuleFileType extends FormElement {
  constructor({
    qFormElement, fileType, message, invalidMessage
  }) {
    super(qFormElement)
    this.fileType = fileType
    this.message = message || ''
    this.invalidMessage = invalidMessage || 'file type invalid '
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
            file_type: this.fileType,
            message: this.message
          }
        ]
      }
    }
  }
}
export { QFormRuleFileType }
export default QFormRuleFileType
