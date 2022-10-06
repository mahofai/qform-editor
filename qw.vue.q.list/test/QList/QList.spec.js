import { expect } from 'chai'
import Vue from 'vue'
import { mount } from '@vue/test-utils'
import { headers, rows } from './test.data'
import QList from '../../src'

describe('QList', function () {
  it('mount QList', function () {
    const wrapper = mount(QList, {
      propsData: {
        headers,
        rows
      }
    })
    // console.log(wrapper.html())
    expect(wrapper.vm instanceof Vue).to.equal(true)
  })
})
