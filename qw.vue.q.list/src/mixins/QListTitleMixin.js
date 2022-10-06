'use strict'

export default {
  props: {
    titles: { type: Array, default: () => ([]) }
  },
  methods: {
    filterTitle({
      pos = 'external'
    } = {}) {
      let result
      this.filteredTitles.forEach((title) => {
        if (!title.pos || title.pos === pos) {
          result = title
        }
      })
      return result
    }
  },
  computed: {
    internalTitle() {
      return this.filterTitle({ pos: 'internal' })
    },
    externalTitle() {
      return this.filterTitle()
    }
  }
}
