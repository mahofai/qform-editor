import Vue from 'vue'
import QButton from '@questwork/vue-q-buttons'
import { name, version } from '../package.json'
import QList from '../src/index'
import './QList.stories.scss'

Vue.use(QButton)
Vue.use(QList)

/**
 * test data, if any
** */

const headers = [
  { key: 'id', label: 'ID' },
  { key: 'imgsrc', label: 'Image', customComponentName: 'q-list-body-row-cell-image' },
  { key: 'name', label: 'Name', css: { element: 'q-list-header__cell--flex-4' } },
  { key: 'qty', label: 'Qty' },
  { key: 'price', label: 'Price' },
  { key: 'subTotal', label: 'subTotal', build: subTotal, sorter: makeSubTotalSorter() },
]

const footers = [
  { key: 'id', label: 'ID' },
  { key: 'imgsrc', label: 'Image', customComponentName: 'q-list-body-row-cell-image' },
  { key: 'name', label: 'Name', css: { element: 'q-list-header__cell--flex-4' } },
  { key: 'qty', label: 'Qty' },
  { key: 'price', label: 'Price' },
  { key: 'subTotal', label: 'subTotal' },
]

const rows = [
  {
    id: 1,
    name: 'Chicken Wing',
    qty: 3,
    price: 10,
    imgalt: 'questwork logo',
    imgsrc: 'https://questwork.com/wp-content/uploads/2017/07/questwork-logo.png',
    cssBuild: (obj) => ({ block: `${obj.name}` })
  },
  { id: 2, name: 'Pizza', qty: 30, price: 50 },
  { id: 3, name: 'Hamburger', qty: 1, price: 12 },
  {
    id: 4,
    name:
      'Long text - Coca Cola Coca Cola Coca Cola Coca Cola Coca Cola Coca Cola Coca Cola Coca Cola Coca Cola Coca Cola Coca Cola Coca Cola Coca Cola Coca Cola ',
    qty: 2,
    price: 5,
  },
  { id: 5, name: 'Orange Juice', qty: 10, price: 15 },
  { id: 6, name: 'Potato Chips', qty: 1, price: 8 },
]

const headers2 = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name', css: { element: 'q-list-header__cell--flex-4' } },
  { key: 'qty', label: 'Qty' },
  { key: 'price', label: 'Price', sorter: makePriceSorter() },
  { key: 'subTotal', label: 'subTotal', build: subTotal, sorter: makeSubTotalSorter() },
]

const rows2 = rows.slice(0, 4)

const bulkAction = {
  label: {
    selected: 'Selected: ',
    task: 'Tasks: ',
  },
  actions: [
    {
      icon: 'fa fa-trash',
      label: 'Deleted',
      onClick: onDelete,
      css: { element: 'q-list-body-action__button--delete' }
    },
    {
      label: 'View',
      onClick: onView,
      css: { element: 'q-list-body-action__button--view' }
    }
  ]
}

function displayName(row) {
  return row.name
}

function onDelete(obj) {
  // use the array.slice(0) function, which creates a copy (clone) of the array and thus the iteration is separated from the deletion
  obj.selectedRows.slice(0).forEach(element => {
    rows.splice(rows.findIndex(item => item.id == element.id), 1)
  })
  console.log('onDelete', obj, rows)
}

function onView(obj) {
  console.log('onView', obj)
}

function subTotal(row) {
  return row.qty * row.price
}

function makePriceSorter() {
  let sortDir
  return (arr) => {
    sortDir = typeof sortDir !== 'undefined' ? sortDir * -1 : 1
    arr.sort((a, b) => (a.price < b.price ? -1 : 1) * sortDir)
    return sortDir
  }
}

function makeSubTotalSorter() {
  let sortDir
  return (arr) => {
    sortDir = typeof sortDir !== 'undefined' ? sortDir * -1 : 1
    arr.sort((a, b) => (a.qty * a.price < b.qty * b.price ? -1 : 1) * sortDir)
    return sortDir
  }
}

/**
 * stories
** */

export default {
  title: 'QList',
}

export const story1 = () => ({
  template: `
    <div>
      <q-list></q-list>
    </div>`,
})

story1.story = {
  name: `${name} ${version}`
}

export const story2 = () => ({
  template: `
    <div>
      <q-list
        :headers="headers"
        :rows="rows"
      ></q-list>
    </div>`,
  data() {
    return {
      headers,
      rows,
    }
  },
})

story2.story = {
  name: 'with headers and data',
}

export const story3 = () => ({
  template: `
    <div>
      <q-list
        :headers="headers"
        :footers="footers"
        :rows="rows"
      ></q-list>
    </div>`,
  data() {
    return {
      headers,
      footers,
      rows,
    }
  },
})
story3.story = {
  name: 'with footers and headers',
}

export const story4 = () => ({
  template: `
    <div>
      <q-list
        :css="css"
        :footers="footers"
        :headers="headers"
        :rows="rows"
        :titles="titles"
      ></q-list>
    </div>`,
  data() {
    return {
      css: {
        block: 'q-list-layout5',
        element: 'q-list-layout5__element',
      },
      footers,
      headers,
      rows,
      titles: [
        { text: 'header external title', customComponentName: 'q-list-header' },
        { text: 'header internal title', pos: 'internal', customComponentName: 'q-list-header' },
        { text: 'footer external title', pos: 'external', customComponentName: 'q-list-footer' },
        { text: 'footer internal title', pos: 'internal', customComponentName: 'q-list-footer' },
      ],
    }
  },
})
story4.story = {
  name: 'with titles (layout5)',
}

export const story5 = () => ({
  template: `
    <div>
      <q-list
        :headers="headers"
        :rows="rows"
      ></q-list>
    </div>`,
  data() {
    return {
      headers: [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'qty', label: 'Qty', build: this.qtyFormatter },
        { key: 'price', label: 'Price' },
      ],
      rows,
    }
  },
  methods: {
    qtyFormatter(row) {
      if (row.qty < 10) {
        return `at least buy >= 10 units (now: ${row.qty})`
      }
      return row.qty
    },
  },
})
story5.story = {
  name: 'with qtyFormatter',
}

export const story6 = () => ({
  template: `
    <div>
      <q-list
        :headers="headers"
        :rows="rows"
        :css="css"
        :sorter="sorter"
        :qSort="qSort"
        @onListHeaderClick="onListHeaderClick"
      ></q-list>
      <hr />
      <q-list
        :headers="headers2"
        :rows="rows2"
      ></q-list>
    </div>`,
  data() {
    return {
      css: {
        block: 'q-list--layout6',
      },
      headers,
      headers2,
      rows,
      rows2,
      qSort: {},
      sortDir: {}
    }
  },
  created() {
    this.sorter = this.createSorter()
  },
  methods: {
    createSorter() {
      const sortDirs = {}
      return (header) => {
        const { key } = header
        if (typeof header.sorter === 'function') {
          sortDirs[key] = header.sorter(this.rows)
        } else {
          sortDirs[key] = typeof sortDirs[key] !== 'undefined' ? sortDirs[key] * -1 : 1
          this.rows.sort((a, b) => (a[key] < b[key] ? -1 : 1) * sortDirs[key])
        }
        return sortDirs[key]
      }
    },
    onListHeaderClick(obj) {
      console.log(obj.header)
      const { key } = obj.header
      if (key) {
        this.qSort = {}
        this.sortDir[key] = (typeof this.sortDir[key] !== 'undefined') ? this.sortDir[key] * -1 : 1
        this.qSort[key] = this.sortDir[key]
        this.$emit('onListHeaderClick', this.qSort)
      }
    }
  },
})
story6.story = {
  name: '2 q-lists with sorter (layout6)',
}

export const story7 = () => ({
  template: `
    <div>
      <q-list
        :bulkAction="bulkAction"
        :headers="headers"
        :rows="rows"
        :css="css"
        :sorter="sorter"
      ></q-list>
    </div>`,
  data() {
    return {
      bulkAction,
      css: {
        block: 'q-list--layout7',
      },
      rows,
      headers
    }
  },
  created() {
    this.sorter = this.createSorter()
  },
  methods: {
    createSorter() {
      const sortDirs = {}
      return (header) => {
        const { key } = header
        if (typeof header.sorter === 'function') {
          sortDirs[key] = header.sorter(this.rows)
        } else {
          sortDirs[key] = typeof sortDirs[key] !== 'undefined' ? sortDirs[key] * -1 : 1
          this.rows.sort((a, b) => (a[key] < b[key] ? -1 : 1) * sortDirs[key])
        }
        return sortDirs[key]
      }
    },
  }
})
story7.story = {
  name: 'with actionButtons and checkbox (layout7)',
}

export const story8 = () => ({
  template: `
    <div>
      <q-list
        :headers="headers8"
        :rows="rows"
        :css="css"
      ></q-list>
    </div>`,
  data() {
    return {
      css: {
        block: 'q-list--layout8',
      },
      rows,
      headers8: [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name', css: { element: 'q-list-header__cell--flex-4' } },
        { key: 'qty', label: 'Qty' },
        { key: 'price', label: 'Price' },
        { key: 'subTotal', label: 'subTotal', build: subTotal },
        { label: 'actions', customComponentName: 'q-list-body-row-cell-action', actionBuilder: this.actionBuilder },
      ]
    }
  },
  methods: {
    /**
     * this actionBuilder will return an array of object
     * { row, label, icon, onClick }
     * where row is the original data row
     * label is the text to be displayed as a link or button
     * icon, optional, to be displayed
     * onClick, the callback function to be run with { row } as argument
     */
    actionBuilder(row) {
      const actions = []
      if (row.qty > 5) {
        actions.push({
          css: { element: 'q-list-body-row-cell-action__button--action q-list-body-row-cell-action__button--action-a' },
          icon: 'fa fa-user',
          label: 'button A',
          onClick: this.onClickButtonA
        })
      }
      if (row.price > 10) {
        actions.push({
          css: { element: 'q-list-body-row-cell-action__button--action q-list-body-row-cell-action__button--action-b' },
          label: 'button B',
          onClick: this.onClickButtonB
        })
      }
      if (row.price > 20) {
        actions.push({
          label: 'button C',
          css: { element: 'q-list-body-row-cell-action__button--action q-list-body-row-cell-action__button--action-c' },
          onClick: this.onClickButtonC
        })
      }
      return actions
    },
    /**
     * this is the callback function when click
     * each row will be put in the caller argument obj as { row }
     * additional parameter could be put inside obj, if need
     */
    onClickButtonA(obj) {
      // obj { row }
      console.log('onClickButtonA', obj.row)
    },
    onClickButtonB(obj) {
      console.log('onClickButtonB', obj.row)
    },
    onClickButtonC(obj) {
      console.log('onClickButtonC', obj.row)
    }
  }
})
story8.story = {
  name: 'with actions in each row (layout8)',
}

export const story9 = () => ({
  template: `
    <div>
      <q-list
        :bulkAction="bulkAction"
        :css="css"
        :headers="headers9"
        :rows="rows"
        :sorter="sorter"
        @click="click"
      ></q-list>
    </div>`,
  data() {
    return {
      bulkAction,
      css: {
        block: 'q-list--layout9',
      },
      rows,
      headers9: [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name', customComponentName: 'q-list-body-row-cell-action', actionBuilder: this.actionBuilderName, build: displayName, css: { element: 'q-list-header__cell--flex-4' } },
        { key: 'qty', label: 'Qty' },
        { key: 'price', label: 'Price' },
        { key: 'subTotal', label: 'subTotal', build: subTotal },
        { label: 'Actions', customComponentName: 'q-list-body-row-cell-action', actionBuilder: this.actionBuilder, css: { element: 'q-list-header__cell--flex-2' } },
      ]
    }
  },
  created() {
    this.sorter = this.createSorter()
  },
  methods: {
    actionBuilder(row, header) {
      const actions = []
      if (row.qty > 5) {
        actions.push({
          css: { element: 'q-list-body-row-cell-action__button--action q-list-body-row-cell-action__button--action-a' },
          icon: 'fa fa-user',
          label: 'button A',
          onClick: this.onClickButtonA
        })
      }
      if (row.price > 10) {
        actions.push({
          css: { element: 'q-list-body-row-cell-action__button--action q-list-body-row-cell-action__button--action-b' },
          label: 'button B',
          onClick: this.onClickButtonB
        })
      }
      if (row.price > 20) {
        actions.push({
          css: { element: 'q-list-body-row-cell-action__button--action q-list-body-row-cell-action__button--action-c' },
          label: 'button C'
        })
      }
      return actions
    },
    actionBuilderName(row, header) {
      const actions = []
      let label = ''
      if (typeof header.build === 'function') {
        label = header.build(row)
      } else if (typeof header.key === 'string') {
        label = row[header.key]
      }
      actions.push({
        type: 'link',
        css: { element: 'q-list-body-row-cell-action__button--link' },
        label,
        onClick: this.onClickButtonName
      })
      return actions
    },
    click(obj) {
      console.log(obj.action, obj.row)
    },
    createSorter() {
      const sortDirs = {}
      return (header) => {
        const { key } = header
        if (typeof header.sorter === 'function') {
          sortDirs[key] = header.sorter(this.rows)
        } else {
          sortDirs[key] = typeof sortDirs[key] !== 'undefined' ? sortDirs[key] * -1 : 1
          this.rows.sort((a, b) => (a[key] < b[key] ? -1 : 1) * sortDirs[key])
        }
        return sortDirs[key]
      }
    },
    onClickButtonA(obj) {
      // obj { row }
      console.log(obj.action, obj.row)
    },
    onClickButtonB(obj) {
      console.log('onClickButtonB', obj.row)
    },
    onClickButtonName(obj) {
      console.log('onClickButtonName', obj.row)
    }
  }
})
story9.story = {
  name: 'everything (layout9)',
}

export const story10 = () => ({
  template: `
    <div>
      <q-list
        :bulkAction="bulkAction"
        :css="css"
        :headers="headers10"
        :rows="rows"
        :sorter="sorter"
        @click="click"
      ></q-list>
      <div v-for="(item, index) in ['name', 'qty', 'price']" :key="index" style="display: inline">
        <label :for="item">
         {{ item }}:<input :id="item" v-model="addValue[item]"/>
        </label>
      </div>
      <button @click="add">Add</button>
    </div>`,
  data() {
    return {
      bulkAction,
      css: {
        block: 'q-list--layout9',
      },
      rows,
      headers10: [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name', customComponentName: 'q-list-body-row-cell-action', actionBuilder: this.actionBuilderName, build: displayName, css: { element: 'q-list-header__cell--flex-4' } },
        { key: 'qty', label: 'Qty' },
        { key: 'price', label: 'Price' },
        { key: 'subTotal', label: 'subTotal', build: subTotal },
        { label: 'Actions', customComponentName: 'q-list-body-row-cell-action', actionBuilder: this.actionBuilder, css: { element: 'q-list-header__cell--flex-2' } },
      ],
      addValue: {
        name: '',
        qty: 0,
        price: 0
      }
    }
  },
  created() {
    this.sorter = this.createSorter()
  },
  methods: {
    actionBuilder() {
      const actions = []
      actions.push({
        css: { element: 'q-list-body-row-cell-action__button--action q-list-body-row-cell-action__button--action-a' },
        label: 'delete',
        onClick: this.delete
      })
      return actions
    },
    actionBuilderName(row, header) {
      const actions = []
      let label = ''
      if (typeof header.build === 'function') {
        label = header.build(row)
      } else if (typeof header.key === 'string') {
        label = row[header.key]
      }
      actions.push({
        type: 'link',
        css: { element: 'q-list-body-row-cell-action__button--link' },
        label,
        onClick: this.onClickButtonName
      })
      return actions
    },
    click(obj) {
      console.log(obj.action, obj.row)
    },
    createSorter() {
      const sortDirs = {}
      return (header) => {
        const { key } = header
        if (typeof header.sorter === 'function') {
          sortDirs[key] = header.sorter(this.rows)
        } else {
          sortDirs[key] = typeof sortDirs[key] !== 'undefined' ? sortDirs[key] * -1 : 1
          this.rows.sort((a, b) => (a[key] < b[key] ? -1 : 1) * sortDirs[key])
        }
        return sortDirs[key]
      }
    },
    add() {
      let id = 0
      let name = this.addValue.name
      let qty = this.addValue.qty
      let price = this.addValue.price
      this.rows.forEach(element => {
        element.id > id ? id = element.id : null
      })
      id += 1
      this.rows.push({ id, name, qty, price })
    },
    delete(obj) {
      this.rows.splice(this.rows.findIndex(item => item.id == obj.row.id), 1)
    },
  }
})
story10.story = {
  name: 'add/delete row',
}

export const story11 = () => ({
  template: `
    <div>
      <q-list
        :css="css"
        :headers="headers11"
        :qSort="qSort"
        :rows="rows"
        @onListHeaderClick="onListHeaderClick"
      ></q-list>
    </div>`,
  data() {
    return {
      bulkAction,
      css: {
        block: 'q-list--layout9',
      },
      rows,
      headers11: [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name', customComponentName: 'q-list-body-row-cell-action', actionBuilder: this.actionBuilderName, build: displayName, maxLength: 50, css: { element: 'q-list-header__cell--flex-4' } },
        { key: 'qty', label: 'Qty' },
        { key: 'price', label: 'Price', },
        { key: 'subTotal', label: 'subTotal', build: subTotal },
        { label: 'Actions', customComponentName: 'q-list-body-row-cell-action', actionBuilder: this.actionBuilder, css: { element: 'q-list-header__cell--flex-2' } },
      ],
      qSort: {},
      sortDir: {}
    }
  },
  created() {
  },
  methods: {
    actionBuilderName(row, header) {
      const actions = []
      let label = ''
      if (typeof header.build === 'function') {
        label = header.build(row)
      } else if (typeof header.key === 'string') {
        label = row[header.key]
      }
      actions.push({
        type: 'link',
        css: { element: 'q-list-body-row-cell-action__button--link' },
        label,
        onClick: this.onClickButtonName
      })
      return actions
    },
    onListHeaderClick(obj) {
      console.log(obj.header)
      const { key } = obj.header
      if (key) {
        this.qSort = {}
        this.sortDir[key] = (typeof this.sortDir[key] !== 'undefined') ? this.sortDir[key] * -1 : 1
        this.qSort[key] = this.sortDir[key]
        this.$emit('onListHeaderClick', this.qSort)
      }
    }
  }
})
story11.story = {
  name: 'display shortened name while mouseover display full name',
}
export const story12 = () => ({
  template: `
    <div>
      <q-list
        :css="css"
        :headers="headers12"
        :qSort="qSort"
        :rows="rows"
        @click="click"
        @onListHeaderClick="onListHeaderClick"
      ></q-list>
    </div>`,
  data() {
    return {
      bulkAction,
      css: {
        block: 'q-list--layout9',
      },
      rows,
      headers12: [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name', css: { element: 'q-list-header__cell--flex-4' } },
        { key: 'qty', label: 'Qty' },
        { key: 'price', label: 'Price', },
        { key: 'subTotal', label: 'subTotal', build: subTotal },
        {
          label: 'Containers',
          customComponentName: 'q-list-body-row-cell-container',
          containerBuilder: this.containerBuilder,
          css: { element: 'q-list-header__cell--flex-2' }
        },
      ],
      qSort: {},
      sortDir: {}
    }
  },
  created() {
  },
  methods: {
    click({ button, container, row }) {
      console.log('view', button.label)
      console.log(button, container)
      console.log(row)
      button.start()
      setTimeout(() => {
        button.stop()
      }, 3000)
    },
    containerBuilder() {
      const containers = []
      containers.push({
        customComponentName: 'q-button',
        css: { block: 'q-list-body-row-cell-action__button--action q-list-body-row-cell-action__button--action-a' },
        ladda: {},
        label: 'delete',
        onClick: this.delete
      })
      containers.push({
        customComponentName: 'q-button',
        css: { block: 'q-list-body-row-cell-action__button--action q-list-body-row-cell-action__button--action-a' },
        ladda: {},
        label: 'view'
      })
      containers.push({
        customComponentName: 'q-dropdown-button',
        css: { block: 'q-list-body-row-cell-action__button--action q-list-body-row-cell-action__button--action-a' },
        label: 'export',
        dropdownOptions: [
          {
            customComponentName: 'q-button',
            label: 'Standard Report',
            ladda: {},
            icon: { prefix: 'fa fa-user' },
            value: 'string value',
            disabled: false,
            onClick: this.onStandardReport
          },
          { label: 'Group By Job', value: { name: 'groupByJob' }, disabled: true },
          { label: 'Group By Staff', css: { element: 'btn btn-primary' }, value: { name: 'groupByStaff' } }
        ]
      })
      return containers
    },
    delete({ button, container, row }) {
      console.log('delete', button.label)
      console.log(button, container)
      console.log(row)
      button.start()
      setTimeout(() => {
        button.stop()
      }, 3000)
    },
    onListHeaderClick(obj) {
      console.log(obj.header)
      const { key } = obj.header
      if (key) {
        this.qSort = {}
        this.sortDir[key] = (typeof this.sortDir[key] !== 'undefined') ? this.sortDir[key] * -1 : 1
        this.qSort[key] = this.sortDir[key]
        this.$emit('onListHeaderClick', this.qSort)
      }
    },
    onStandardReport(obj) {
      console.log(obj)
    }
  }
})
story12.story = {
  name: 'use cell container to display QButtons',
}
