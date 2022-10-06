<template>
  <div
    class="q-list-body-row"
    :class="cssBlock"
  >
    <q-list-body-row-cell
      v-for="(header, idx) in headers"
      :key="idx"
      :css="header.css"
      :header="header"
      :onCheck="onCheck"
      :row="row"
      :selectedRows="selectedRows"
      @click="click"
    />
  </div>
</template>

<script>
import QListCSSMixin from '../mixins/QListCSSMixin'
import QListBodyRowCell from './QListBodyRowCell.vue'

export default {
  components: {
    QListBodyRowCell
  },
  mixins: [QListCSSMixin],
  props: {
    headers: { type: Array, default: () => [] },
    onCheck: { type: Function, default: null },
    row: { type: Object, default: () => ({}) },
    selectedRows: { type: Array, default: () => [] },
  },
  methods: {
    click(obj) {
      this.$emit('click', obj)
    },
  }
}
</script>

<style lang="scss">
</style>
