import Vue from 'vue'
import { name, version } from '../package.json'
import { QGridEditor } from '../src/index'
import './QGridEditor.stories.scss'

Vue.use(QGridEditor)

/**
 * test data, if any
*/

/**
 * stories
*/

export default {
  title: 'QGridEditor',
}

export const story1 = () => ({
  template: `
    <div>
      <q-grid-editor
        :label="label"
      ></q-grid-editor>
    </div>
  `,
  data() {
    return {
      label: {}
    }
  }
})
story1.storyName = `${name} ${version}`

export const story2 = () => ({
  template: `
    <div>
      <q-grid-editor
        :label="label"
        :layout="layout"
      ></q-grid-editor>
    </div>
  `,
  data() {
    return {
      layout: {
        css: 'q-grid-body-row-cell--row',
        cells: [
          {
            key: 'Image1',
            customComponentName: 'q-grid-body-row-cell-image',
            css: 'q-grid-body-row-cell--image'
          },
          {
            key: 'Image2',
            customComponentName: 'q-grid-body-row-cell-lazy-image',
            placeholder: ' https://yourdomain.com/default.jpg',
            css: 'q-grid-body-row-cell--lazy-image'
          }]
      },
      label: {
        lazyImageHint: 'https://yourdomain.com/default.jpg'
      }
    }
  }
})
story2.storyName = 'initial layout'
