<template>
  <div
    class="q-list-body-row-cell-action-container"
    :class="cssBlock"
  >
    <component
      :is="currentComponent(container)"
      v-for="(container, idx) in containers"
      :key="idx"
      :css="container.css"
      :disabled="container.disabled"
      :dropdownOptions="container.dropdownOptions"
      :fileInputName="container.fileInputName"
      :isBlock="container.isBlock"
      :isActive="container.isActive"
      :icon="container.icon"
      :label="container.label"
      :labelTemplate="container.labelTemplate"
      :ladda="container.ladda"
      :name="container.name"
      :options="container.options"
      :onlyOnce="container.onlyOnce"
      :onClick="onClick(container)"
      :size="container.size"
      :title="container.title"
      @download="download"
    ></component>
  </div>
</template>

<script>
import QListBodyRowCellMixin from '../mixins/QListBodyRowCellMixin'
import QListCSSMixin from '../mixins/QListCSSMixin'

export default {
  name: 'q-list-body-row-cell-action-container',
  mixins: [QListBodyRowCellMixin, QListCSSMixin],
  computed: {
    containers() {
      if (!!this.row && this.header.containerBuilder) {
        return (this.header.containerBuilder(this.row, this.header)).map(this.setTitle(this.header.maxLength))
      }
      return []
    },
  },
  methods: {
    currentComponent(obj, defaultComponent) {
      if (obj.customComponent) {
        return obj.customComponent
      }
      if (obj.customComponentName) {
        return obj.customComponentName
      }
      return defaultComponent || null
    },
    download() {
      this.$emit('download')
    },
    onClick(container) {
      return ({ button }) => {
        if (typeof container.onClick === 'function') {
          container.onClick({ button, container, row: this.row })
        } else {
          this.$emit('click', { button, container, row: this.row })
        }
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
