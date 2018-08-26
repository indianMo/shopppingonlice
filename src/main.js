import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Index from './components/index.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload'
import productDetail from "./components/productDetail.vue"
import moment from "moment";
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import ProductZoomer from 'vue-product-zoomer'

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(iView);
Vue.use(ProductZoomer)

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  loading: require('./assets/static/site/img/lazyloadImg.png')
})

const routes = [{
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
  },
  {
    path: "/detail/:id",
    component: productDetail
  }
]
//全局配置过滤器
Vue.filter('filterDate', function (value) {
   return moment(value).format("YYYY**MM**DD");
})



let router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router,
  component: "zoomer"
}).$mount('#app')