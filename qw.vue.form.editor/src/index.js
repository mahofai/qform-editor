'use strict'

import QFormEditorCSSMixin from './mixins/QFormEditorCSSMixin'
import QFormEditor from './components/QFormEditor.vue'

function install(Vue, options) {
  if (options && options.css) {
    QFormEditorCSSMixin.props.css.default = () => options.css
  }
  Vue.component(QFormEditor.name, QFormEditor)
}

QFormEditor.install = install

export { QFormEditor }
export default QFormEditor
