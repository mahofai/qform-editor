import { expect } from 'chai'
import sinon from 'sinon'
import { shallowMount } from '@vue/test-utils'
import { headers } from './test.data'
import QListHeader from '../../src/components/QListHeader.vue'

describe('QListHeader', function () {
  it('first header label should be ID', function () {
    const wrapper = shallowMount(QListHeader, {
      propsData: {
        headers
      }
    })
    // console.log(wrapper.html())
    expect(wrapper.is(QListHeader)).to.equal(true)
    expect(wrapper.findAll('.q-list-header__cell').length).to.equal(headers.length)
    expect(wrapper.find('.q-list-header__cell').text()).to.equal(headers[0].label)
  })

  it('sorter is called when header is clicked', function () {
    const spy = sinon.spy()
    const wrapper = shallowMount(QListHeader, {
      propsData: {
        headers,
        sorter: spy
      }
    })
    wrapper.find('.q-list-header__cell').trigger('click')
    expect(spy.called).to.equal(true)
  })

  it('header internal sorter is called if header.sorter is defined', function () {
    const spy = sinon.spy()
    const lastIdx = headers.length - 1
    headers[lastIdx].sorter = spy

    const wrapper = shallowMount(QListHeader, {
      propsData: {
        headers,
        sorter: (header) => {
          if (typeof header.sorter === 'function') {
            header.sorter()
          }
        }
      }
    })
    const lastHeader = wrapper.findAll('.q-list-header__cell').at(lastIdx)
    lastHeader.trigger('click')
    expect(lastHeader.html()).contains(headers[lastIdx].label)
    expect(spy.called).to.equal(true)
  })
})
