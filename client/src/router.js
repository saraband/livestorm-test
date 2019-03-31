import Vue from 'vue'
import Router from 'vue-router'

// Route based code splitting
const PostsListPage = () => import(/* webpackChunkName: "posts-list" */ './views/PostsList/index.vue')
const NotFound404 = () => import(/* webpackChunkName: "not-found-404" */ './views/NotFound404.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/posts'
    },
    {
      path: '/posts/:daysAgo?',
      name: 'postsList',
      component: PostsListPage
    },
    {
      path: '/404',
      component: NotFound404
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
