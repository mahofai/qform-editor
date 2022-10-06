'use strict'

import QGridEditorCSSMixin from './mixins/QGridEditorCSSMixin'
import QGridEditor from './components/QGridEditor.vue'

function install(Vue, options) {
  if (options && options.css) {
    QGridEditorCSSMixin.props.css.default = () => options.css
  }
  Vue.component(QGridEditor.name, QGridEditor)
}

QGridEditor.install = install

export { QGridEditor }
export default QGridEditor
