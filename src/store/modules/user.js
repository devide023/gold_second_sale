import router from '../../router';
import {get_userroutes} from '../../router/userroute';
import {
  login,
  logout,
  getInfo
} from '@/api/usermgr/user'
import {
  getToken,
  setToken,
  removeToken,
  getUserHead,
  setUserHead
} from '@/utils/auth'
import {
  resetRouter,
  constantRoutes
} from '@/router/index'
const state = {
  token: getToken(),
  name: '',
  avatar: getUserHead(),
  menulist: []
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
    state.menulist = menus
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
      setUserHead(data.user.headimg);
      sessionStorage.setItem('menulist', JSON.stringify(data.menulist))
      const routlist = get_userroutes(data.menulist);
      router.addRoutes(constantRoutes.concat(routlist));
      router.options.routes=constantRoutes.concat(routlist);
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
      sessionStorage.removeItem("menulist")
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
