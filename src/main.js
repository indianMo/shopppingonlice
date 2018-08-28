import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Index from './components/index.vue'
//导入购物车模块
import shoppingCart from './components/shoppingCart.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload'
import productDetail from "./components/productDetail.vue"
import moment from "moment";
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import ProductZoomer from 'vue-product-zoomer'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'
import Vuex from "vuex";

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(iView);
Vue.use(ProductZoomer);
Vue.use(Vuex);
Vue.use(VueLazyLoad, {
  loading: require('./assets/static/site/img/lazyloadImg.png')
})


axios.defaults.baseURL = 'http://47.106.148.205:8899';

Vue.prototype.$axios = axios;
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
  },
  {
    path: "/cart",
    component: shoppingCart
  }
]
const store = new Vuex.Store({
  state: {
    cartDate: JSON.parse(window.localStorage.getItem("goodKey")) || {}
  },
  mutations: {
    addGoods(state, goodInfo) {
      if (state.cartDate[goodInfo.goodId] == undefined) {
        Vue.set(state.cartDate, goodInfo.goodId, goodInfo.goodNum)
      } else {
        state.cartDate[goodInfo.goodId] += goodInfo.goodNum;
      }
    }
  },
  getters: {
    goodsCount: state => {
      let num = 0;
      for (const key in state.cartDate) {
        num += state.cartDate[key]
      }

      return num;
    }

  }
})
//全局配置过滤器
Vue.filter('filterDate', function (value) {
  return moment(value).format("YYYY**MM**DD");
});

window.onbeforeunload = function(){
    window.localStorage.setItem("goodKey", JSON.stringify(store.state.cartDate));
}

let router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router,
  store,
  component: "zoomer"
}).$mount('#app')