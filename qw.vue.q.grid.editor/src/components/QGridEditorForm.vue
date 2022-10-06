<template>
  <div class="q-grid-editor-form" :class="cssBlock">
    <div class="q-grid-editor-form__key">
      {{ label.contentName }}:
      <input v-model="elementKey" type="text" />
    </div>
    <div class="q-grid-editor-form__component">{{ label.contentType }}: </div>
    <div
      v-for="(componentType, idx) in componentTypes"
      :key="idx"
      class="q-grid-editor-form__input"
    >
      <input
        :id="componentType"
        v-model="component"
        type="radio"
        :value="componentType"
      >
      <div class="q-grid-editor-form__label" :for="componentType">{{ componentType }}</div>
    </div>
    <div
      v-show="component=='Lazy Image'"
      class="q-grid-editor-form__placeholder"
    >
      Placeholder:
    </div>
    <div
      v-show="component=='Lazy Image'"
      class="q-grid-editor-form__hints"
    >
      Hints: {{ label.lazyImageHint }}
    </div>
    <input
      v-show="component=='Lazy Image'"
      v-model="placeholder"
      type="text"
    />
    <div class="q-grid-editor-form__button" @click="addItem">Confirm</div>
    <div class="q-grid-editor-form__button" @click="back">Back</div>
  </div>
</template>

<script>
import QGridEditorCSSMixin from '../mixins/QGridEditorCSSMixin'

export default {
  name: 'q-grid-element-form',
  mixins: [QGridEditorCSSMixin],
  props: {},
  inject: ['label'],
  data() {
    return {
      componentTypes: ['Image', 'Lazy Image', 'Text', 'HTML', 'Button'],
      elementKey: 'Name',
      component: 'Image',
      placeholder: '',
    }
  },
  methods: {
    addItem() {
      const newItem = {
        key: this.elementKey,
        customComponentName: this.component
      }
      switch (this.component) {
        case 'Lazy Image':
          newItem.placeholder = this.placeholder
          newItem.customComponentName = 'q-grid-body-row-cell-lazy-image'
          newItem.css = 'q-grid-body-row-cell--lazy-image'
          break
        case 'Text':
          newItem.customComponentName = 'q-grid-body-row-cell-text'
          newItem.css = 'q-grid-body-row-cell--text'
          break
        case 'Image':
          newItem.customComponentName = 'q-grid-body-row-cell-image'
          newItem.css = 'q-grid-body-row-cell--image'
          break
        case 'Button':
          newItem.customComponentName = 'q-grid-body-row-cell-button'
          newItem.css = 'q-grid-body-row-cell--button'
          break
        case 'HTML':
          newItem.customComponentName = 'q-grid-body-row-cell-html'
          newItem.css = 'q-grid-body-row-cell--html'
          break
        default:
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
