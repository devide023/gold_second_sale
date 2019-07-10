import {
  login,
  logout,
  getInfo
} from '@/api/usermgr/user'
import {
  getToken,
  setToken,
  removeToken,
  getUserHead
} from '@/utils/auth'
import {
  resetRouter
} from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: getUserHead(),
  usermenulist: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_MENU: (state, menus) => {
    state.usermenulist = menus
  }
}

const actions = {
  // user login
  login({
    commit
  }, userInfo) {
    const {
      username,
      password
    } = userInfo
    return login({
      username: username.trim(),
      userpwd: password
    }).then(response => {
      commit('SET_TOKEN', response.token)
      setToken(response.token)
    })
  },
  // get user info
  getInfo({
    commit,
    state
  }) {
    return getInfo(state.token).then(data => {
      commit('SET_NAME', data.user.username)
      commit('SET_AVATAR', data.user.headimg)
      commit('SET_MENU', data.menulist)
    })
  },

  // user logout
  logout({
    commit,
    state
  }) {
    return logout(state.token).then(() => {
      commit('SET_TOKEN', '')
      removeToken()
      resetRouter()
    })
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
