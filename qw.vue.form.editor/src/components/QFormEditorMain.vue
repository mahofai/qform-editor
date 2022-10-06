<template>
  <div class="q-form-editor-main" :class="cssBlock">
    <q-form-editor-main-renderer
      :formRenderer="outputLayout"
    ></q-form-editor-main-renderer>
    <div
      class="q-form-editor-main__button"
      @click="addField"
    >
      Add field
    </div>
    <div
      v-if="!reset"
      class="q-form-editor-main__button"
      @click="addReset(true)"
    >
      Add Form Reset button
    </div>
    <div
      v-if="reset"
      class="q-form-editor-main__button"
      @click="addReset(false)"
    >
      Remove Form Reset button
    </div>
    <div
      class="q-form-editor-main__button"
      @click="showLayout = !showLayout"
    >
      Show / Hide layout
    </div>
    <div v-show="showLayout">Output layout object: {{ outputString }}</div>
    <br>

    <div class="q-form-editor-main-preview">
      <div class="title">Preview:</div>
      <div> (warning: the inputs in preview is unusable) </div>
      <q-form-renderer
        :formRenderer="outputLayout"
      ></q-form-renderer>
    </div>
  </div>
</template>

<script>
import QFormRenderer from '@questwork/vue-q-form-renderer'
import QFormEditorCSSMixin from '../mixins/QFormEditorCSSMixin'
import QFormEditorMainRenderer from './QFormEditorMainRenderer.vue'

export default {
  customComponentName: 'q-form-editor-main',
  components: {
    QFormEditorMainRenderer,
    QFormRenderer
  },
  mixins: [QFormEditorCSSMixin],
  provide() {
    return {
    }
  },
  inject: [
  ],
  props: {
    outputLayout: { type: Object, default: () => ({}) },
    reset: { type: Boolean, default: false }
  },
  data() {
    return {
      showLayout: false,
    }
  },
  computed: {
    outputString() {
      let layoutString = JSON.stringify(this.outputLayout)
      let quotedKeys = []
      quotedKeys = layoutString.match(/"+([:A-Za-z0-9])\w+":/g)
      while (quotedKeys && quotedKeys.length > 0) {
        const unquotedKey = quotedKeys[0].replaceAll(/"/g, '')
        layoutString = layoutString.replace(quotedKeys[0], unquotedKey)
        quotedKeys.shift()
      }
      layoutString = layoutString.replaceAll(/"/g, "'")
      return layoutString
    }
  },
  watch: {
  },
  created() {
  },
  mounted() {
  },
  updated() {
  },
  methods: {
    addField() {
      this.$emit('addField')
    },
    addReset(bool) {
      this.$emit('addReset', bool)
    }
  },
}
</script>

<style lang="scss">
@import '../styles/index';
</style>
