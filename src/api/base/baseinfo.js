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
export function get_authoritycodes(){
  return request({
    url:'/baseinfo/authoritycodes',
    method:'get'
  })
}
export function addauthcode(data){
  return request({
    url:'/baseinfo/addauthcode',
    method:'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(data)
  })
}
export function editauthcode(data){
  return request({
    url:'/baseinfo/editauthcode',
    method:'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(data)
  })
}
export function delauthcode(id){
  return request({
    url:'/baseinfo/delauthcode',
    method:'get',
    params: {
      id: id
    }
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
