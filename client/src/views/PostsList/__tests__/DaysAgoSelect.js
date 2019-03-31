import { shallowMount } from '@vue/test-utils'
import DaysAgoSelect from '../DaysAgoSelect'

describe('DaysAgoSelect.vue', () => {
  it('renders properly the days ago options', () => {
    const wrapper = shallowMount(DaysAgoSelect, {
      mocks: {
        $route: {
          params: {}
        }
      }
    })

    expect(wrapper.findAll('option').length).toBe(31)
    expect(wrapper.find('option:first-child').text()).toMatch('Today')
    expect(wrapper.find('option:nth-child(2)').text()).toMatch('Yesterday')
    expect(wrapper.find('option:last-child').text()).toMatch('30 days ago')
  })

  it('displays `Today` when the $route param `daysAgo` is not specified', () => {
    const wrapper = shallowMount(DaysAgoSelect, {
      mocks: {
        $route: {
          params: {}
        }
      }
    })

    const selectValue = wrapper.find('select').element.value
    expect(wrapper.find(`option:nth-child(${parseInt(selectValue) + 1})`).text()).toBe('Today')
  })

  it('displays the right day when the $route param `daysAgo` is specified', () => {
    const wrapper = shallowMount(DaysAgoSelect, {
      mocks: {
        $route: {
          params: {
            daysAgo: 5
          }
        }
      }
    })

    const selectValue = wrapper.find('select').element.value
    expect(wrapper.find(`option:nth-child(${parseInt(selectValue) + 1})`).text()).toBe('5 days ago')
  })
})
