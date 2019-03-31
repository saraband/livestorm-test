/*
 *        /!\  DISCLAIMER   /!\
 *
 *  This Vuex store is useless and its only purpose is
 *  to show that I know how to set up and use a Vuex store
 *  Please bear in mind that this file can be totally ignored as
 *  it is absolutely not necessary to the app proper functioning
 */

import axios from 'axios'

const TOKEN = 'b52c270b9ac5b0bd37e84f7f41b3a2d620137ef8f22bb6818a3b9b11f26cfac7'

axios.defaults.baseURL = 'https://api.producthunt.com/v1/'
axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`
axios.defaults.headers.get['Content-Type'] = 'application/json'
axios.defaults.headers.get['Accept'] = 'application/json'

export default axios
