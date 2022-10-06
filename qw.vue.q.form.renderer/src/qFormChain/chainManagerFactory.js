import {
  ChainMinMax, ChainAgeMinMax, ChainDateMinMax, ChainValueMinMax, ChainInputFormat, ChainFileRules, ChainManager
} from './index'

class ChainManagerFactory {
  static create(row, value) {
    const chains = []
    if (row.rule && row.rule.change) {
      row.rule.change.forEach((rule) => {
        if (rule.required) {
          chains.push(new ChainMinMax({
            min: 1,
            message: rule.message
          }))
        } else if (rule.min || rule.max) {
          chains.push(new ChainMinMax({
            min: rule.min,
            max: rule.max,
            count_word: rule.count_word,
            message: rule.message
          }))
        } else if (rule.min_age || rule.max_age) {
          chains.push(new ChainAgeMinMax({
            min_age: rule.min_age,
            max_age: rule.max_age,
            reference_date: rule.reference_date,
            message: rule.message
          }))
        } else if (rule.min_date || rule.max_date) {
          chains.push(new ChainDateMinMax({
            min_date: rule.min_date,
            max_date: rule.max_date,
            message: rule.message
          }))
        } else if (rule.min_value || rule.max_value) {
          chains.push(new ChainValueMinMax({
            min_value: rule.min_value,
            max_value: rule.max_value,
            message: rule.message
          }))
        } else if (rule.format || rule.format_type) {
          chains.push(new ChainInputFormat({
            format: rule.format,
            format_type: rule.format_type,
            message: rule.message
          }))
        } else if (rule.file_type || rule.max_size) {
          chains.push(new ChainFileRules({
            file_type: rule.file_type,
            max_size: rule.max_size,
            message: rule.message
          }))
        }
      })
    }
    return new ChainManager(chains, row, value)
  }
}

export { ChainManagerFactory }
export default ChainManagerFactory
