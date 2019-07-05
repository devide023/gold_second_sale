import {
  login,
  logout,
  getInfo
} from '@/api/usermgr/user'
import {
  getToken,
  setToken,
  removeToken,
  setUserHead,
  getUserHead
} from '@/utils/auth'
import {
  resetRouter
} from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: getUserHead()
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
      commit('SET_NAME', response.user.username)
      commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
      setToken(response.token)
      setUserHead('https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
    })
  },

  // get user info
  getInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const {
          data
        } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const {
          name,
          avatar
        } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
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
