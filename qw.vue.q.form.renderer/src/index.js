'use strict'

import QFormRendererCSSMixin from './mixins/QFormRendererCSSMixin'
import QFormRenderer from './components/QFormRenderer.vue'

function install(Vue, options) {
  if (options && options.css) {
    QFormRendererCSSMixin.props.css.default = () => options.css
  }
  Vue.component(QFormRenderer.name, QFormRenderer)
}

QFormRenderer.install = install

export { QFormRenderer }
export default QFormRenderer
