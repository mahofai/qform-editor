'use strict'

export default {
  props: {
    layout: { type: Object, default: () => ({}) },
    model: { type: Object, default: () => ({}) }
  },
  computed: {
    cells() {
      return this.layout.cells || []
    },
    isItem() {
      return (this.cells.length === 0)
    }
  }
}

