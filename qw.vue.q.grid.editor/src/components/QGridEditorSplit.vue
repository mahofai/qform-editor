<template>
  <div class="q-grid-editor-split">
    <div>Split Direction:</div>
    <div>
      <input
        id="vertical"
        v-model="splitDirection"
        type="radio"
        value="vertical"
      >
      Vertical
    </div>
    <div>
      <input
        id="horizontal"
        v-model="splitDirection"
        type="radio"
        value="horizontal"
      >
      Horizontal
    </div>
    <div>
      Division:
      <input
        v-model="division"
        type="number"
        min="2"
        max="4"
      />
    </div>
    <div class="q-grid-editor-split__button" @click="split">Confirm</div>
    <div class="q-grid-editor-split__button" @click="back">Back</div>
  </div>
</template>

<script>
import QGridEditorCSSMixin from '../mixins/QGridEditorCSSMixin'

export default {
  name: 'q-grid-splitter',
  mixins: [QGridEditorCSSMixin],
  props: {},
  data() {
    return {
      splitDirection: 'vertical',
      division: 2
    }
  },
  methods: {
    split() {
      const newItem = {
        css: this.splitDirection === 'vertical' ? 'q-grid-body-row-cell--row' : 'q-grid-body-row-cell--column',
        cells: []
      }
      for (let i = 0; i < this.division; i += 1) {
        newItem.cells.push({})
      }
      this.$emit('confirm', newItem)
    },
    back() {
      this.$emit('switchView',
        {
          main: true,
          element: false,
          split: false,
        })
    }
  },
}
</script>

<style lang="scss">
@import '../styles/index';
</style>
