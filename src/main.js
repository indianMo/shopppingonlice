import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Index from './components/index.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(ElementUI);

const routes = [
  {
    path: '/',
    redirect: "/index"
  },
  {
    path: "/index",
    component: Index
  },
  {
    path: "/index",
    component: Index
  }
]

let router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')