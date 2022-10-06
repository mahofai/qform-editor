import { FormElement } from './formElement'

class QFormHtml extends FormElement {
  constructor(qFormElement) {
    super(qFormElement)
    this.customComponentName = qFormElement.customComponentName
    this.name = qFormElement.name
    this.content = qFormElement.content
  }

  isValid() {
    const errorMessage = []
    if (!this.customComponentName) {
      // throw new Error('invalid component')
      errorMessage.push('invalid component')
    }
    if (!this.name) {
      // throw new Error('name is missing')
      errorMessage.push('label is missing')
    }
    if (!this.content) {
      // throw new Error('content is missing')
      errorMessage.push('content is missing')
    }
    return errorMessage
  }

  toObject() {
    return {
      customComponentName: this.customComponentName,
      name: this.name,
      content: this.content
    }
  }
}

export {
  QFormHtml
}
export default QFormHtml
