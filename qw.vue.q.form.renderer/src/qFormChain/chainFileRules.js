import { Chain } from './chain'

function stringToByte(value) {
  const number = value.slice(0, value.search(/[a-zA-Z]/))
  const unit = value.replace(number, '')
  const units = ['B', 'KB', 'MB', 'GB']
  return number * 1024 ** (units.indexOf(unit))
}

function validFileType(file, fileType) {
  if (!fileType) {
    return true
  }
  let bool = false
  fileType.forEach((type) => {
    if (file.name.split('.').pop().toUpperCase() === type.toUpperCase()) {
      bool = true
    }
  })
  return bool
}

class ChainFileRules extends Chain {
  constructor(settings = {}) {
    super()
    this.file_type = settings.file_type
    if (this.file_type && !Array.isArray(this.file_type)) {
      this.file_type = [this.file_type]
    }
    this.max_size = typeof settings.max_size === 'string' ? stringToByte(settings.max_size) : settings.max_size
    this.message = settings.message || 'Improper file'
  }

  handleRequest(obj) {
    const result = this.next(obj)
    if (obj.value && !validFileType(obj.value, this.file_type)) {
      result.push(this.message)
    }
    if (obj.value && this.max_size && obj.value.size > this.max_size) {
      result.push(this.message)
    }
    return result
  }
}

export { ChainFileRules }
export default ChainFileRules
