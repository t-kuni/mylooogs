import Vue from 'vue'
import Router from 'vue-router'
//@ts-ignore
import routes from './routes';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})
