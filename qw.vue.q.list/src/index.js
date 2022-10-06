'use strict'

import QList from './components/QList.vue'
import QListCSSMixin from './mixins/QListCSSMixin'

function install(Vue, options) {
  if (options && options.css) {
    QListCSSMixin.props.css.default = () => options.css
  }
  Vue.component(QList.name, QList)
}

QList.install = install

export default QList
