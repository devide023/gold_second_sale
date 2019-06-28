import axios from 'axios'
import { Message,Loading  } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
//import querystring from 'querystring'
// create an axios instance
let loadingInstance
const service = axios.create({
  baseURL: process.env.VUE_APP_SERVER_API, // url = base url + request url
  withCredentials: false, // send cookies when cross-domain requests
  transformRequest: [function (data) {
    // 对 data 进行任意转换处理
    //const vdata = querystring.stringify(data);
    //console.log(vdata);
    return data;
  }],
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理

    return data;
  }],
  timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    loadingInstance = Loading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    loadingInstance.close();
    const res = JSON.parse(response.data)
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 1) {
      Message({
        message: res.msg || 'error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   // to re-login
      //   MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
      //     confirmButtonText: 'Re-Login',
      //     cancelButtonText: 'Cancel',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('user/resetToken').then(() => {
      //       location.reload()
      //     })
      //   })
      // }
      return Promise.reject(res.msg || 'error')
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
