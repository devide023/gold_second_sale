import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const UserHeadKey='vue_user_head_icon'

export function getToken() {
   return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function setUserHead(headurl){
  return Cookies.set(UserHeadKey,headurl)
}
export function getUserHead(){
  return Cookies.get(UserHeadKey)
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}
