'use strict'

export default {
  props: {
    header: { type: Object, default: () => ({}) },
    onCheck: { type: Function, default: null },
    row: { type: Object, default: () => ({}) },
    selectedRows: { type: Array, default: () => [] },
  },
  computed: {

  },
  methods: {

  }
}
