import { FormElement } from './formElement'

class QFormInput extends FormElement {
  constructor(qFormElement) {
    super(qFormElement)
    this.row = qFormElement.row

    if (qFormElement.row) {
      this.label = qFormElement.row.label
      this.name = qFormElement.row.name
      this.placeholder = qFormElement.row.placeholder
      this.disabled = qFormElement.row.disabled
    }
    this.customComponentName = qFormElement.customComponentName
    this.outputLayout = qFormElement.outputLayout
  }

  isValid() {
    const errorMessage = []
    if (!this.customComponentName) {
      errorMessage.push('invalid component')
    }
    if (!this.label) {
      errorMessage.push('label is missing')
    }
    if (!this.name) {
      errorMessage.push('name is missing')
    }
    if (this.name) {
      const { rows } = this.outputLayout
      rows.forEach((row) => {
        if (row.name === this.name && row !== this.row) {
          errorMessage.push('name is duplicated')
        }
      })
    }
    return errorMessage
  }

  toObject() {
    return {
      customComponentName: this.customComponentName,
      label: this.label,
      name: this.name,
      placeholder: this.placeholder,
      disabled: this.disabled,
      rule: {
        change: []
      },
    }
  }
}

export {
  QFormInput
}
export default QFormInput
