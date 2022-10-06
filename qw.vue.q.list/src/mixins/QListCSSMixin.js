'use strict'

export default {
  props: {
    css: { type: Object,
      default: () => ({
        block: '',
        element: '',
      })
    }
  },
  computed: {
    cssBlock() {
      return this.css.block || ''
    }
  },
  methods: {
    cssElement(elem) {
      if (!!elem && !!elem.css) {
        return (elem.css.element) ? ` ${elem.css.element}` : ''
      }
      return ''
    }
  }
}
