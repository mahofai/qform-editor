import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import { headers, rows } from './test.data'
import QListBodyRow from '../../src/components/QListBodyRow.vue'

describe('QListBodyRow', function () {
  it('mount QlistBodyRow with child components', function () {
    const row = rows[0]
    const wrapper = mount(QListBodyRow, {
      propsData: {
        headers,
        row
      }
    })
    // console.log(wrapper.html())
    expect(wrapper.is(QListBodyRow)).to.equal(true)
  })

  it('number of QListBodyRowCell = headers.length', function () {
    const row = rows[0]
    const wrapper = mount(QListBodyRow, {
      propsData: {
        headers,
        row
      }
    })
    expect(wrapper.findAll('.q-list-body-row-cell').length).to.equal(headers.length)
  })

  it('first column value = row[header.key]', function () {
    const row = rows[0]
    const wrapper = mount(QListBodyRow, {
      propsData: {
        headers,
        row
      }
    })
    expect(wrapper.find('.q-list-body-row-cell').text()).to.equal(row[headers[0].key].toString())
  })

  it('last column value = header.build(row)', function () {
    const row = rows[0]
    const lastIdx = headers.length - 1
    const lastHeader = headers[lastIdx]
    const wrapper = mount(QListBodyRow, {
      propsData: {
        headers,
        row
      }
    })
    expect(wrapper.findAll('.q-list-body-row-cell').at(lastIdx).text()).to.equal((lastHeader.build(row)).toString())
  })
})
