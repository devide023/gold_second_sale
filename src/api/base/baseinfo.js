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
export function uploadfile(data){
  return request({
    url:'/baseinfo/uploadfile',
    method:'post',
    headers: {
      'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()
    },
    data:data
  })
}
