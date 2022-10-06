import Vue from 'vue'
import { name, version } from '../package.json'
import { QFormEditor } from '../src/index'
import './QFormEditor.stories.scss'

Vue.use(QFormEditor)

/**
 * test data, if any
*/

/**
 * stories
*/

export default {
  title: 'QFormEditor',
}

export const story1 = () => ({
  template: `
    <div>
      <q-form-editor
        @onChange="onChange"
      ></q-form-editor>
    </div>`,
  methods: {
    onChange(outputLayout) {
      this.layout = outputLayout
    }
  }
})
story1.storyName = `${name} ${version}`

export const story2 = () => ({
  template: `
    <div>
      <q-form-editor
        :layout="layout"
        :formData="formData"
        @onChange="onChange"
      ></q-form-editor>
    </div>`,
  data() {
    return {
      layout: {
        rows: [
          {
            customComponentName: 'q-form-renderer-input-text',
            label: 'Question 1: ',
            name: '1799-1',
            rule: {
              change: [
                { required: true, message: 'Please enter your name' },
                { min: 3, max: 10 }
              ],
            }
          },
          {
            customComponentName: 'q-form-renderer-input-text',
            label: 'Question 2: ',
            name: '1799-2',
          }
        ],
        submitLabel: 'Submit'
      },
      formData: {
        '1799-2': 'answer input'
      }
    }
  },
  methods: {
    onChange(outputLayout) {
      this.layout = outputLayout
    }
  }
})
story2.storyName = 'with given layout'
