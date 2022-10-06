'use strict'

export default {
  props: {
    status: { type: Object, default: () => ({}) }
  },
  methods: {
    getStatusProperty(property) {
      return this.status && this.status[property] ? this.status[property] : undefined
    }
  },
}
