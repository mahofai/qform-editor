import { FormElement } from './formElement'

class QFormTitle extends FormElement {
  constructor({ qFormElement, title, invalidMessage }) {
    super(qFormElement)
    this.label = qFormElement.label
    this.title = title
    this.invalidMessage = invalidMessage || 'missing title'
  }

  isValid() {
    const err = this.qFormElement.isValid()

    if (!this.title) {
      err.push(this.invalidMessage)
    }
    return err
  }

  toObject() {
    const json = this.qFormElement.toObject()
    return {
      ...json,
      title: this.title,
      rule: {
        change: [
          ...json.rule.change,
        ]
      }
    }
  }
}

export {
  QFormTitle
}
export default QFormTitle
