/*
 *        /!\  DISCLAIMER   /!\
 * 
 *  This Vuex store is useless and its only purpose is
 *  to show that I know how to set up and use a Vuex store.
 *
 *  The purpose of this module is to show how I would've proceeded with
 *  a REST API and Vuex.
 *
 *  Please bear in mind that this file can be totally ignored as
 *  it is absolutely not necessary to the app proper functioning
 */
import HTTP from './HTTP'

const FETCH_POSTS_LIST_PENDING = 'FETCH_POSTS_LIST_PENDING'
const FETCH_POSTS_LIST_SUCCESS = 'FETCH_POSTS_LIST_SUCCESS'
const FETCH_POSTS_LIST_FAILED = 'FETCH_POSTS_LIST_FAILED'

export default {
  state: () => ({
    isFetchingPostsList: false,
    postsList: []
  }),

  mutations: {
    [FETCH_POSTS_LIST_PENDING] (state) {
      state.isFetchingPostsList = true
    },

    [FETCH_POSTS_LIST_SUCCESS] (state, list) {
      state.isFetchingPostsList = false
      state.postsList = list
    },

    [FETCH_POSTS_LIST_FAILED] (state) {
      state.isFetchingPostsList = false
    }
  },
  actions: {
    async fetchPostsList ({ commit }, { daysAgo = 0 } = {}) {
      commit(FETCH_POSTS_LIST_PENDING)

      // Add the days_ago parameter if valid
      const endpoint = !isNaN(daysAgo) && daysAgo > 0
        ? `posts?days_ago=${daysAgo}`
        : `posts`

      try {
        const res = await HTTP.get(endpoint)
        commit(FETCH_POSTS_LIST_SUCCESS, res.data.posts)
      } catch (err) {
        console.error(err)
        commit(FETCH_POSTS_LIST_FAILED)
      }
    }
  }
}
