import request from '@/utils/request'
export function userlist(pageindex, pagesize) {
  return request({
    url: '/usermgr/list',
    method: 'get',
    params: {
      pageindex: pageindex,
      pagesize: pagesize
    }
  })
}

export function adduser(userdata){
  return request({
    url:'/usermgr/add',
    method:'post',
    data:userdata
  })
}
