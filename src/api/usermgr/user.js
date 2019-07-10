import request from '@/utils/request'
import querystring from 'querystring'
export function userlist(data) {
  return request({
    url: '/usermgr/list',
    method: 'post',
    data: querystring.stringify(data)
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

export function login(data) {
  return request({
    url: '/usermgr/check',
    method: 'get',
    params: {
      usercode: data.username,
      userpwd: data.userpwd
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/usermgr/info',
    method: 'get',
    params: {
      token
    }
  })
}

export function logout(token) {
  return request({
    url: '/usermgr/logout',
    method: 'get',
    params: {
      token
    }
  })
}

export function modifyuser(data) {
  return request({
    url: '/usermgr/edit',
    method: 'post',
    data: querystring.stringify(data)
  })
}

export function rolebyuids(data) {
  return request({
    url: '/usermgr/rolebyuids',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(data)
  })
}
export function saveuserroles(data) {
  return request({
    url: '/usermgr/saveuserroles',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(data)
  })
}
export function getusermenus(token) {
  return request({
    url: '/usermgr/usermenus',
    method: 'get',
    params: {
      token: token
    }
  })
}
