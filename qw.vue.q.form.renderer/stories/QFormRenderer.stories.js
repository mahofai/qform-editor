import Vue from 'vue'
import { name, version } from '../package.json'
import QFormRenderer from '../src/index'
import './QFormRenderer.stories.scss'

Vue.use(QFormRenderer)

/**
 * test data, if any
*/


/**
 * stories
*/

export default {
  title: 'QFormRenderer',
}

export const story1 = () => ({
  template: `
    <div>
      <q-form-renderer></q-form-renderer>
    </div>`,
})

story1.storyName = `${name} ${version}`

export const story2 = () => ({
  template: `
    <div>
      <q-form-renderer
        :formRenderer="formRenderer"
      ></q-form-renderer>
    </div>`,
  data() {
    return {
      formRenderer: {
        rows: [
          {
            customComponentName: 'q-form-renderer-html',
            content: `<h1>title</h1>
            <p>form</p>`
          },
          {
            customComponentName: 'q-form-renderer-html',
            content: '<p>column 1</p>'
          },
          {
            customComponentName: 'q-form-renderer-html',
            content: '<p>column 2</p>'
          }
        ]
      }
    }
  },
})

story2.storyName = 'with html column'

export const story3 = () => ({
  template: `
    <div>
      <q-form-renderer
        :formRenderer="formRenderer"
      ></q-form-renderer>
    </div>`,
  data() {
    return {
      formRenderer: {
        rows: [
          {
            customComponentName: 'q-form-renderer-html',
            content: `<h1>title</h1>
            <p>form</p>`
          },
          {
            customComponentName: 'q-form-renderer-html',
            content: '<p>column 1</p>'
          },
          {
            customComponentName: 'q-form-renderer-html',
            content: '<p>column 2</p>'
          },
          {
            customComponentName: 'q-form-renderer-input-text',
          },
          {
            customComponentName: 'q-form-renderer-input-text',
            label: '5'
          }
        ]
      }
    }
  },
})

story3.storyName = 'with input column'

export const story4 = () => ({
  template: `
    <div>
      <q-form-renderer
        :formRenderer="formRenderer"
        :afterInputChange="afterInputChange"
        :afterSubmit="afterSubmit"
        :afterReset="afterReset"
        :beforeRender="beforeRender"
      ></q-form-renderer>
    </div>`,
  data() {
    return {
      formRenderer: {
        rows: [
          {
            customComponentName: 'q-form-renderer-html',
            content: `<h1>title</h1>
            <p>form</p>`
          },
          {
            customComponentName: 'q-form-renderer-html',
            content: '<p>column 1</p>'
          },
          {
            customComponentName: 'q-form-renderer-html',
            content: '<p>column 2</p>'
          },
          {
            customComponentName: 'q-form-renderer-input-text',
          }
        ],
        submitLabel: '提交'
      }
    }
  },
  methods: {
    afterInputChange(obj) {
      console.log(obj)
    },
    afterSubmit(obj) {
      console.log(obj)
    },
    afterReset(obj) {
      console.log(obj)
    },
    beforeRender(obj) {
      console.log(obj)
      // onSuccess({
      //   html: { name: 'column-1', content: 1 }
      // })
      // onError()
    }
  },
})

story4.storyName = 'with hooks'

export const story5 = () => ({
  template: `
    <div>
      <q-form-renderer
        :formData="formData"
        :formRenderer="formRenderer"
        :afterSubmit="afterSubmit"
        :afterReset="afterReset"
        :onInputChange="onInputChange"
        :afterInputChange="afterInputChange"
      ></q-form-renderer>
    </div>`,
  data() {
    return {
      formRenderer: {
        formCode: '1799', // namespace
        rows: [
          {
            customComponentName: 'q-form-renderer-html',
            content: `<h1>title</h1>
            <p>form</p>`,
            name: '1799-1'
          },
          {
            customComponentName: 'q-form-renderer-input-text',
            label: 'first Name',
            name: '1799-2',
            // rules: [
            //   { required: true, message: '请输入姓氏', triggers: ['change', blur] },
            //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: ['blur'] }
            // ],
            rule: {
              change: [
                { required: true, message: '请输入姓氏' },
              ],
            },
          },
          {
            customComponentName: 'q-form-renderer-input-date',
            label: 'Date of Birth: ',
            name: 'dob',
            type: 'date',
            format: 'YYYY/MM/DD',
            rule: {
              change: [
              ],
            },
          },
        ],
        submitLabel: '提交',
        resetLabel: 'reset'
      },
      formData: {
        '1799-2': 1
      }
    }
  },
  methods: {
    afterSubmit(obj) {
      console.log(obj)
    },
    afterReset(obj) {
      console.log(obj)
    },
    afterInputChange(obj) {
      console.log(obj)
    },
    onInputChange(obj = {}) {
      this.formData[obj.name] = obj.value
      console.log(obj.name, obj.value)
    },
  },
})

story5.storyName = 'with input rules'

export const story6 = () => ({
  template: `
    <div>
      <q-form-renderer
        :css="css"
        :formRenderer="formRenderer"
        :afterInputChange="afterInputChange"
      ></q-form-renderer>
    </div>`,
  data() {
    return {
      formRenderer: {
        rows: [
          {
            customComponentName: 'q-form-renderer-html',
            content: '<h1>Message</h1>'
          },
          {
            customComponentName: 'q-form-renderer-input-checkbox',
            label: 'hobby：',
            name: 'hobby',
            options: [
              { label: '篮球', value: 'basketball', disabled: true },
              { label: '足球', value: 'football' },
              { label: '皮球', value: 'ball' },
            ],
          },
          {
            customComponentName: 'q-form-renderer-input-checkbox',
            label: 'Food：',
            name: 'food',
            options: [
              { label: '可乐鸡翅', value: 'chi' },
              { label: '盐焗鸡', value: 'yan' },
              { label: '沙姜鸡', value: 'sha' },
            ],
          },
        ],
      },
      css: {
        block: 'col-md-6',
      },
    }
  },
  methods: {
    afterInputChange(obj) {
      console.log('obj', obj)
    },
  },
})

story6.storyName = 'with checkbox input'

export const story7 = () => ({
  template: `
    <div>
      <q-form-renderer
        :css="css"
        :formRenderer="formRenderer"
        :afterInputChange="afterInputChange"
      ></q-form-renderer>
    </div>`,
  data() {
    return {
      formRenderer: {
        rows: [
          {
            customComponentName: 'q-form-renderer-html',
            content: '<h1>Info</h1>'
          },
          {
            customComponentName: 'q-form-renderer-input-file',
            label: '上传文件：',
            name: 'fileName',
          },
          {
            customComponentName: 'q-form-renderer-input-file',
            label: '上传图片：',
            name: 'imgName',
            disabled: true,
          },
        ],
      },
      css: {
        block: 'col-md-6',
      },
    }
  },
  methods: {
    afterInputChange(obj) {
      console.log(obj)
    }
  },
})

story7.storyName = 'with file input'

export const story8 = () => ({
  template: `
    <div>
      <q-form-renderer
        :css="css"
        :formRenderer="formRenderer"
        :afterInputChange="afterInputChange"
      ></q-form-renderer>
    </div>`,
  data() {
    return {
      formRenderer: {
        rows: [
          {
            customComponentName: 'q-form-renderer-html',
            content: '<h1>Date Range</h1>'
          },
          {
            customComponentName: 'q-form-renderer-input-date-range',
            label: 'date：',
            name: 'date',
          },
          {
            customComponentName: 'q-form-renderer-input-date-range',
            label: 'datetime：',
            name: 'datetime',
            type: 'datetime'
          },
        ],
      },
      css: {
        block: 'col-md-6',
        element: 'form-control',
      },
    }
  },
  methods: {
    afterInputChange(obj) {
      console.log(obj)
    }
  },
})

story8.storyName = 'with date range input'

export const story9 = () => ({
  template: `
    <div>
      <q-form-renderer
        :formRenderer="formRenderer"
        :formData="formData"
        :onChange="onChange"
        :onReset="onReset"
      ></q-form-renderer>
    </div>`,
  data() {
    return {
      formRenderer: {
        rows: [
          {
            customComponentName: 'q-form-renderer-html',
            content: '<h1>Registration form</h1><br>'
          },
          {
            customComponentName: 'q-form-renderer-input-text',
            label: 'Name: ',
            name: 'firstName',
            rule: {
              change: [
                { required: true, message: 'Please enter your name' },
              ],
            },
          },
          {
            customComponentName: 'q-form-renderer-input-text',
            label: 'HKID: ',
            name: 'hkid',
            placeholder: 'A123456(7)',
            rule: {
              change: [
                { required: true, message: 'Please enter your id' },
                { format_type: 'hkid' },
              ],
            },
          },
          {
            customComponentName: 'q-form-renderer-input-text',
            label: 'Passport No: ',
            name: 'passport',
            rule: {
              change: [
                { required: true, message: 'Please enter your id' },
                { format: '^[K|k]\\d{8}$' },
              ],
            },
          },
          {
            customComponentName: 'q-form-renderer-input-number',
            label: 'Age: ',
            name: 'age',
            rule: {
              change: [
                { required: true, message: 'Please enter your age' },
                { min_value: 18, max_value: 65 },
              ],
            },
          },
          {
            customComponentName: 'q-form-renderer-input-text-area',
            label: 'Bio: ',
            name: 'bio',
            rule: {
              change: [
                // { required: true, message: 'Please enter your bio' },
                // { min: 20, message: 'Please enter at least 20 characters' },
                { min: 10, count_word: true, message: 'Please enter at least 10 words' },
              ],
            },
          },
        ],
        submitLabel: 'Submit',
        resetLabel: 'Reset'
      },
      formData: {
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.formData = {
        firstName: 'Oscar',
        dob: '974217600000'
      }
    },
    onChange(obj) {
      this.$set(this.formData, obj.name, obj.value)
    },
    onReset() {
      this.init()
    },
  },
})

story9.storyName = '9. COR refactor 1'

export const story10 = () => ({
  template: `
    <div>
      <q-form-renderer
        :formRenderer="formRenderer"
        :formData="formData"
        :onChange="onChange"
        :onReset="onReset"
      ></q-form-renderer>
    </div>`,
  data() {
    return {
      formRenderer: {
        rows: [
          {
            customComponentName: 'q-form-renderer-html',
            content: '<h1>Questionnaire</h1><br>'
          },
          {
            customComponentName: 'q-form-renderer-input-checkbox',
            label: 'Favorite food: ',
            name: 'food-checkbox',
            options: [
              { label: '可乐鸡翅', value: 'chi' },
              { label: '盐焗鸡', value: 'yan' },
              { label: '沙姜鸡', value: 'sha' },
              { label: '白切鸡', value: 'bai' },
            ],
            rule: {
              change: [
                { required: true, message: 'Please choose a food' },
                { max: 2, message: 'Please choose up to 2 options' },
              ],
            },
          },
          {
            customComponentName: 'q-form-renderer-input-radio',
            label: 'Favorite food: ',
            name: 'food-radio',
            options: [
              { label: '可乐鸡翅', value: 'chi' },
              { label: '盐焗鸡', value: 'yan' },
              { label: '沙姜鸡', value: 'sha' },
            ],
            rule: {
              change: [
                { required: true, message: 'Please choose a food' },
              ],
            },
          },
          {
            customComponentName: 'q-form-renderer-input-select-one',
            label: 'Favorite drink: ',
            name: 'drink',
            options: [
              { label: 'cola', value: 'cola' },
              { label: 'tea', value: 'tea' },
              { label: 'coffee', value: 'coffee' },
            ],
            rule: {
              change: [
                { required: true, message: 'Please choose a drink' },
              ],
            },
          },
          {
            customComponentName: 'q-form-renderer-input-date',
            label: 'Date of Birth: ',
            name: 'dob',
            type: 'date',
            format: 'YYYY/MM/DD',
            rule: {
              change: [
                { required: true, message: 'Please choose your DOB' },
                {
                  name: 'q-form-editor-modifier-input-date-range',
                  min_date: '2021-08-03T16:00:00+08:00',
                  max_date: '2021-09-07T16:00:00+08:00'
                }
              ],
            },
          },
          {
            customComponentName: 'q-form-renderer-input-date-range',
            label: 'Booking period: ',
            name: 'period',
            type: 'date',
            format: 'YYYY/MM/DD',
            rule: {
              change: [
                { required: true, message: 'Please choose a range' },
                // { min_date: '2021-1-1', max_date: '2022-12-31' }
              ],
            },
          },
          {
            customComponentName: 'q-form-renderer-input-html',
            label: 'HTML: ',
            name: 'html',
            rule: {
              change: [
                { required: true, message: 'Please enter HTML' },
              ],
            },
          },
          {
            customComponentName: 'q-form-renderer-input-file',
            label: 'Upload photo: ',
            name: 'photo',
            rule: {
              change: [
                { required: true, message: 'Please upload a photo' },
                // { file_type: 'txt', message: 'Incorrect format, only accepts txt' },
                { file_type: ['jpg', 'png', 'gif'], message: 'Incorrect format, only accepts jpg/png/gif' },
                { max_size: '300KB', message: 'File too large, must be below 300 KB' },
              ],
            },
          },
        ],
        submitLabel: 'Submit',
        resetLabel: 'Reset'
      },
      formData: {
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.formData = {
        period: ['Mon 2 Aug 2021 13:30:00 +0800', 'Fri 6 Aug 2021 13:30:00 +0800']
      }
    },
    onChange(obj) {
      this.$set(this.formData, obj.name, obj.value)
    },
    onReset() {
      this.init()
    },
  },
})

story10.storyName = '10. COR refactor 2'

export const story11 = () => ({
  template: `
    <div>
      <q-form-renderer
        :formRenderer="formRenderer"
        :formData="formData"
        :onChange="onChange"
        :onReset="onReset"
      ></q-form-renderer>
    </div>`,
  data() {
    return {
      formRenderer: {
        rows: [
          {
            customComponentName: 'q-form-renderer-input-date',
            label: 'Date Restriction: ',
            name: 'dob1',
            rule: {
              change: [
                { min_date: '2020-1-1', max_date: '2020-12-31' },
              ],
            },
          },
          {
            customComponentName: 'q-form-renderer-input-date',
            label: 'Age Restriction: ',
            name: 'dob2',
            rule: {
              change: [
                { min_age: 18, max_age: 65 },
              ],
            },
          },
          {
            customComponentName: 'q-form-renderer-input-date',
            label: 'Age Restriction with reference date: ',
            name: 'dob3',
            rule: {
              change: [
                { min_age: 18, reference_date: '2021-08-01', message: 'You must be at least 18 by 2021-08-01' },
              ],
            },
          },
        ],
        submitLabel: 'Submit',
        resetLabel: 'Reset'
      },
      formData: {
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.formData = {}
    },
    onChange(obj) {
      this.$set(this.formData, obj.name, obj.value)
    },
    onReset() {
      this.init()
    },
  },
})

story11.storyName = '11. Date rules'
