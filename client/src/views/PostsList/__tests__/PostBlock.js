import { shallowMount } from '@vue/test-utils'
import PostBlock from '../PostBlock'

describe('PostBlock.vue', () => {
  it('renders correctly when post prop is passed', () => {
    const wrapper = shallowMount(PostBlock, {
      propsData: {
        post: {
          thumbnail_url: 'http://test.com/thumbnail.jpg',
          votes_count: 42,
          tagline: 'tagline test',
          name: 'name test'
        }
      }
    })

    expect(wrapper.find('.thumbnail').attributes().style).toContain('background-image: url(http://test.com/thumbnail.jpg);')
    expect(wrapper.find('.title').text()).toBe('name test')
    expect(wrapper.find('.tagline').text()).toBe('tagline test')
    expect(wrapper.find('.upvotes').text()).toBe('42 upvotes')
  })
})
