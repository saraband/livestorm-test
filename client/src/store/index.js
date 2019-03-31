/*
 *        /!\  DISCLAIMER   /!\
 *
 *  This Vuex store is useless and its only purpose is
 *  to show that I know how to set up and use a Vuex store
 *  Please bear in mind that this file can be totally ignored as
 *  it is absolutely not necessary to the app proper functioning
 */

import Vue from 'vue'
import Vuex from 'vuex'
import posts from './posts'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    posts
  }
})
