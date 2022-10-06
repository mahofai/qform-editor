<template>
  <div class="q-grid-editor-main-box-item" :class="layout.css">
    <div class="q-grid-editor-main-box-item__name">{{ layout.key }}</div>
    <div class="q-grid-editor-main-box-item__component">
      {{ switchName(layout.customComponentName) }}
    </div>
    <div class="q-grid-editor-box-item__buttons">
      <div @click="form">{{ label.content }}</div>
      <div @click="split">{{ label.split }}</div>
    </div>
  </div>
</template>

<script>
import QBoxMixin from '../mixins/QBoxMixin'

export default {
  mixins: [QBoxMixin],
  inject: [
    'label',
    'onClick'
  ],
  computed: {
  },
  methods: {
    form() {
      this.onClick({
        main: false,
        element: true,
        split: false,
        currentCell: this.layout
      })
    },
    split() {
      this.onClick({
        main: false,
        element: false,
        split: true,
        currentCell: this.layout
      })
    },
    switchName(customComponentName) {
      switch (customComponentName) {
        case 'q-grid-body-row-cell-lazy-image':
          return 'Type: Lazy Image'
        case 'q-grid-body-row-cell-text':
          return 'Type: Text'
        case 'q-grid-body-row-cell-image':
          return 'Type: Image'
        case 'q-grid-body-row-cell-button':
          return 'Type: Button'
        case 'q-grid-body-row-cell-html':
          return 'Type: HTML'
        default:
          return ''
      }
    }
  }
}
</script>

<style lang="scss">
</style>
