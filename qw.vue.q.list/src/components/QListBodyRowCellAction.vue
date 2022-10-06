<template>
  <div
    class="q-list-body-row-cell-action"
    :class="cssBlock"
  >
    <!--
      display a list of buttons/ links based on actions
    -->
    <div
      v-for="(action, idx) in actions"
      :key="idx"
      class="q-list-body-row-cell-action__button"
      :class="cssElement(action)"
      @click="click(action)"
    >
      <i
        v-if="!!action.icon"
        class="q-list-body-row-cell-action__button-icon"
        :class="action.icon"
      ></i>
      <div
        :title="action.title"
        class="q-list-body-row-cell-action__button-label"
      >
        {{ action.label }}
      </div>
    </div>
  </div>
</template>

<script>
import QListBodyRowCellMixin from '../mixins/QListBodyRowCellMixin'
import QListCSSMixin from '../mixins/QListCSSMixin'

export default {
  mixins: [QListBodyRowCellMixin, QListCSSMixin],
  computed: {
    /**
     * get the return array of actions by header.actionBuilder
     */
    actions() {
      if (!!this.row && this.header.actionBuilder) {
        return (this.header.actionBuilder(this.row, this.header)).map(this.setTitle(this.header.maxLength))
      }
      return []
    },
  },
  methods: {
    click(action) {
      if (typeof action.onClick === 'function') {
        action.onClick({
          action,
          row: this.row
        })
      } else {
        this.$emit('click', {
          action,
          row: this.row
        })
      }
    },
    setTitle(maxLength = 0) {
      if (maxLength > 3) {
        return (item) => {
          const newItem = item
          newItem.title = item.label
          newItem.label = newItem.label.length > maxLength ? `${item.label.slice(0, maxLength - 3)}...` : newItem.label
          return newItem
        }
      }
      return (item) => {
        const newItem = item
        newItem.title = item.label
        return newItem
      }
    },
  }
}
</script>

<style lang="scss">
</style>
