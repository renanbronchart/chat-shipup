import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

const Login = () => import('@/components/views/Login')
const Chat = () => import('@/components/views/Chat')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat,
      beforeEnter: (to, from, next) => {
        if (store.state.currentUser) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/*',
      redirect: {
        name: 'Login'
      }
    }
  ]
})
