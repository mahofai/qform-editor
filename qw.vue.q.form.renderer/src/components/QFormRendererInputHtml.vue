<template>
  <div
    class="q-form-renderer-input-html"
  >
    <label>{{ label }}</label>
    <quill-editor
      class="q-form-renderer-input-html__editor"
      :class="cssElement()"
      :content="value"
      :options="editorOptions"
      @change="changeHtml"
      @blur="change"
    />
    <i v-if="joinedErrMsg">{{ joinedErrMsg }}</i>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor, Quill } from 'vue-quill-editor'
import xss from 'xss'

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
  props: {
  },
  data() {
    return {
    }
  },
  computed: {
    editorOptions() {
      return {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            [{ align: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ color: [] }, { background: [] }],
            ['clean']
          ]
        },
        placeholder: this.placeholder,
        readOnly: true
      }
    },
  },
  watch: {
  },
  methods: {
    changeHtml({ html }) {
      const tempHtml = html.replaceAll('&lt;', '<').replaceAll('&gt;', '>')
      const filteredText = xss(tempHtml)
      this.value = filteredText === '<div><br></div>' ? '' : filteredText
      this.change()
    }
  }
}
</script>

<style lang="scss">
</style>
