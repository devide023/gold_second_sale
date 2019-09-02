import request from '@/utils/request';
import Q from 'querystring';
export function addmenu(data) {
  return request({
    url: '/menumgr/add',
    method: 'post',
    data: Q.stringify(data)
  })
}
export function bataddmenu(data)
{
  return request({
    url: '/menumgr/batadd',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(data)
  })
}
export function editmenu(data) {
  return request({
    url: '/menumgr/update',
    method: 'post',
    data: Q.stringify(data)
  })
}
export function upitem(id) {
  return request({
    url: '/menumgr/upitem',
    method: 'get',
    params: {
      id: id
    }
  })
}
export function rootlist(pid) {
  return request({
    url: '/menumgr/rootlist',
    method: 'get',
    params: {
      pid: pid
    }
  })
}
export function menulist(query) {
  return request({
    url: '/menumgr/list',
    method: 'post',
    data: Q.stringify(query)
  })
}
export function delmenu(id) {
  return request({
    url: '/menumgr/del',
    method: 'get',
    params: {
      id: id
    }
  })
}
export function menutree(){
  return request({
    url:'/menumgr/menutree',
    method:'get'
  })
}