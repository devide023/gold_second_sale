import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import {
  mockXHR
} from '../mock'
import {
  parseTime
} from '@/utils/index';
import {
  StatusList
} from '@/utils/status';
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

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
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
