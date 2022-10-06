class RuleNameFactory {
  static getName(rule) {
    if (rule) {
      if (rule.required) {
        return 'q-form-editor-modifier-input-required'
      } if (rule.min || rule.max) {
        return 'q-form-editor-modifier-input-min-max'
      } if (rule.min_age || rule.max_age) {
        return 'q-form-editor-modifier-input-age-range'
      } if (rule.min_date || rule.max_date) {
        return 'q-form-editor-modifier-input-date-range'
      } if (rule.min_options || rule.max_options) {
        return 'q-form-editor-modifier-input-options-min-max'
      } if (rule.min_value || rule.max_value) {
        return 'q-form-editor-modifier-input-value-min-max'
      } if (rule.format || rule.format_type) {
        return 'q-form-editor-modifier-input-format'
      } if (rule.max_size) {
        return 'q-form-editor-modifier-input-file-size'
      } if (rule.file_type) {
        return 'q-form-editor-modifier-input-file-type'
      }
    }
    return null
  }

  static getNames(rules) {
    const names = []
    if (rules && rules instanceof Array) {
      rules.forEach((rule) => {
        names.push(this.getName(rule))
      })
    }
    return names
  }
}

export { RuleNameFactory }
export default RuleNameFactory
