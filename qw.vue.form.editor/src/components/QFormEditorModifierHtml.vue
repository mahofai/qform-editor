<template>
  <div class="q-form-editor-modifier-html">
    <div>Please input name:</div>
    <input v-model="qFormElement.name" @change="change">
    <quill-editor
      v-model="qFormElement.content"
      class="q-html-input__editor"
      :class="cssElement()"
      :options="editorOptions"
      @change="change"
    />
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor, Quill } from 'vue-quill-editor'

import { QFormHtml } from '../qFormElement/qFormHtml'
import QFormRendererCSSMixin from '../mixins/QFormRendererCSSMixin'
import QFormRendererInputMixin from '../mixins/QFormRendererInputMixin'

const Block = Quill.import('blots/block')
Block.tagName = 'DIV'
Quill.register(Block, true)

export default {
  components: {
    quillEditor,
  },
  mixins: [QFormRendererCSSMixin, QFormRendererInputMixin],
  inject: [],
  props: {
    componentName: { type: String, default: '' },
  },
  data() {
    return {
      qFormElement: null,
    }
  },
  computed: {
    editorOptions() {
      return {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ align: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ color: [] }, { background: [] }],
            ['clean']
          ]
        },
        readOnly: true
      }
    },
  },
  created() {
    this.qFormElement = new QFormHtml({
      ...this.row,
      customComponentName: this.componentName,
    })
    this.qFormElement.content = this.qFormElement.content || '<div></div>'
    this.change()
  },
  methods: {
    // changeHtml({ html }) {
    //   const tempHtml = html.replaceAll('&lt;', '<').replaceAll('&gt;', '>')
    //   const filterText = xss(tempHtml)
    //   this.qFormElement.content = filterText
    //   this.change()
    // },
    change() {
      this.$emit('change', { qFormElement: this.qFormElement })
    }
  }
}
</script>

<style lang="scss">
@import '../styles/index';
</style>
