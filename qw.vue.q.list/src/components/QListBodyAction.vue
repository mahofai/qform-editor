<template>
  <div
    class="q-list-body-action"
    :class="cssBlock"
  >
    <div class="q-list-body-action__item q-list-body-action__selected-label">
      {{ selectedLabel }}
    </div>
    <div class="q-list-body-action__item q-list-body-action__count">
      {{ count }}
    </div>
    <div class="q-list-body-action__item q-list-body-action__task-label">
      {{ taskLabel }}
    </div>
    <div class="q-list-body-action__item q-list-body-action__actions">
      <div
        v-for="(action, idx) in actions"
        :key="idx"
        class="q-list-body-action__button"
        :class="cssElement(action)"
        @click="click(action)"
      >
        <i
          v-if="!!action.icon"
          class="q-list-body-action__button-icon"
          :class="action.icon"
        ></i>
        <div class="q-list-body-action__button-label">{{ action.label }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import QListCSSMixin from '../mixins/QListCSSMixin'

export default {
  components: {
  },
  mixins: [QListCSSMixin],
  props: {
    bulkAction: { type: Object, default: () => ({}) },
    selectedRows: { type: Array, default: () => [] },
  },
  computed: {
    count() {
      return this.selectedRows.length
    },
    actions() {
      return this.bulkAction.actions || []
    },
    bulkActionLabel() {
      return this.bulkAction.label || {}
    },
    selectedLabel() {
      return this.bulkActionLabel.selected || 'Selected:'
    },
    taskLabel() {
      return this.bulkActionLabel.task || 'Tasks:'
    }
  },
  methods: {
    click(action) {
      if (typeof action.onClick === 'function') {
        action.onClick({
          selectedRows: this.selectedRows
        })
        this.$emit('clearSelectedRows')
      }
    }
  }
}
</script>

<style lang="scss">
</style>
