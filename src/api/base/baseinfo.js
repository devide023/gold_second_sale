import request from '@/utils/request';
export function get_cruisesinfo() {
  return request({
    url: '/baseinfo/cruises',
    method: 'get'
  })
}
export function get_icons(){
    return request({
      url: '/baseinfo/icons',
      method: 'get'
    })
}
export function menutypes(){
  return request({
    url:'/baseinfo/menutypes',
    method:'get'
  })
}
export function get_apis(){
  return request({
    url:'/baseinfo/webapis',
    method:'get'
  })
}
