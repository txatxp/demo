import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/', component: () => import('../views/index.vue') },
  { path: '/h', component: () => import('../views/h/index.vue') },
  { path: '/jsx', component: () => import('../views/jsx/index.vue') },
  { path: '/inline/comp', component: () => import('../views/inlineComp/index.vue') },
]


const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

export default router

