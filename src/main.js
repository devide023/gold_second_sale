import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from '@/router/index.js'
import store from './store'
import '@/icons' // icon
import '@/permission' // permission control
import {
  parseTime
} from '@/utils/index';
import {
  StatusList
} from '@/utils/status';
// set ElementUI lang to EN
Vue.use(ElementUI, {
  locale
})
Vue.config.productionTip = false
Vue.filter('formatedate', function (value) {
  if (String(value) !== "null") {
    return parseTime(new Date(value), "{y}-{m}-{d}");
  } else {
    return "";
  }
});
Vue.filter('statusName', function (value) {
  const list = StatusList().filter(item => {
    return item.status === value;
  });
  if (list.length > 0) {
    return list[0].title;
  } else {
    return value;
  }
});
Vue.directive('has', {
  bind: function (el, binding, vnode) {},
  inserted: function (el, binding, vnode, oldVnode) {
    const funs = vnode.context.$route.meta.fun;
    if(funs){
      const hadfun = funs.filter(item => {
        return item.menucode === binding.value.type
      })
      if (hadfun.length === 0) {
        el.parentNode.removeChild(el);
      }
    }else{
      el.parentNode.removeChild(el);
    }
  }
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
