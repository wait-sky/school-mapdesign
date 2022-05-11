import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '@/views/Welcome.vue'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import Detail from '@/views/component/detail.vue'
import Person from '@/views/component/person.vue'
import LogReg from '@/views/component/logReg.vue'
import Blog from '@/views/Blog.vue'
import BlogDetail from '@/views/component/blogDetail.vue'
import News from '@/views/News.vue'
import NewsDetail from '@/views/component/newsDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/detail',
    name: 'detail',
    component: Detail
  },
  {
    path: '/person',
    name: 'person',
    component: Person
  },
  {
    path: '/logReg',
    name: 'logReg',
    component: LogReg
  },
  {
    path: '/blog',
    name: 'blog',
    component: Blog
  },
  {
    path: '/blog_detail',
    name: 'blog_detail',
    component: BlogDetail
  },
  {
    path: '/news',
    name: 'news',
    component: News
  },
  {
    path: '/news_detail',
    name: 'news_detail',
    component: NewsDetail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
