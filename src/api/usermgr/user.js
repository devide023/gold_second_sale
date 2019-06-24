import request from '@/utils/request'
import querystring from 'querystring'
export function userlist(key, code, pageindex, pagesize) {
  return request({
    url: '/usermgr/list',
    method: 'post',
    data: querystring.stringify({
      user_code: code,
      key: key,
      pageindex: pageindex,
      pagesize: pagesize
    })
  })
}

export function adduser(userdata) {
  return request({
    url: '/usermgr/add',
    method: 'post',
    data: querystring.stringify(userdata)
  })
}

export function deluser(userids) {
  return request({
    url: '/usermgr/del',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(userids)
  });
}
export function disabeluser(ids, status) {
  return request({
    url: '/usermgr/disabel',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
      ids: ids,
      status: status
    })
  });
}
