'use strict'

export default {
  props: {
    css: { type: [Object, String], default: () => ({}) }
  },
  computed: {
    cssBlock() {
      return this.css ? (this.css.block || this.css || '') : ''
    }
  },
  methods: {
    cssElement(item) {
      return item.css ? (item.css.element || item.css || '') : ''
    }
  },
}
