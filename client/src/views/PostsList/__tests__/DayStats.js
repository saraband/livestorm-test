import { shallowMount } from '@vue/test-utils'
import DayStats from '../DayStats'
import Vue from 'vue'

Vue.filter('uppercase', (value) => {
  return value
    ? String(value).toUpperCase()
    : ''
})

describe('DayStats.vue', () => {
  it('renders a placeholder `-` when no data is passed', () => {
    const wrapper = shallowMount(DayStats, {
      propsData: {
        postsData: null
      }
    })

    expect(wrapper.findAll('li strong').filter((li) => li.text() === '-').length).toBe(4)
  })

  it('computes stats properly when post data is passed', () => {
    const postsData = [
      {
        id: 0,
        votes_count: 50,
        comments_count: 50,
        makers: [
          { id: 2 },
          { id: 3 },
          { id: 4 }
        ]
      },
      {
        id: 1,
        votes_count: 20,
        comments_count: 20,
        makers: [
          { id: 2 },
          { id: 5 }
        ]
      }
    ]

    const wrapper = shallowMount(DayStats, {
      propsData: {
        postsData
      }
    })

    expect(wrapper.find('li:nth-child(1) strong').text()).toMatch('2') // posts count
    expect(wrapper.find('li:nth-child(2) strong').text()).toMatch('70') // votes count
    expect(wrapper.find('li:nth-child(3) strong').text()).toMatch('70') // Comments count
    expect(wrapper.find('li:nth-child(4) strong').text()).toMatch('4') // Makers count
  })
})
