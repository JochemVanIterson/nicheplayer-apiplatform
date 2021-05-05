import fetch from '../../../utils/fetch'
import socket from "../../../utils/socket";

import { ENTRYPOINT } from '../../../config/1314272676_entrypoint'
import { Cookies, LocalStorage } from 'quasar'

export function apiRequest ({ state }, { path, payload, method = 'GET', params, nojwt }) {
  const jwtToken = !nojwt ? state.jwtToken : ''
  if (!nojwt && !jwtToken) return false
  let body
  if (payload) body = JSON.stringify(payload)
  return fetch({ id: path, ep: ENTRYPOINT, jwtToken }, { method: method, body, params })
    .then((response) => response.json())
    .catch((e) => {
      console.log('apiRequest Failed', e)
      return false
    })
}

export function attemptLogin ({ commit }, payload) {
  commit('setIsLoggingIn', true)
  Cookies.set('BEARER', '')
  return fetch({ id: 'authentication_token', ep: ENTRYPOINT }, { method: 'POST', body: JSON.stringify(payload) })
    .then((response) => response.json())
    .then((data) => {
      commit('setJWTToken', data.token)
      commit('setRefreshToken', data.refresh_token)
      commit('setUserData', data.data)

      localStorage.setItem('token', data.token)
      localStorage.setItem('refresh_token', data.refresh_token)
      localStorage.setItem('userdata', JSON.stringify(data.data))

      Cookies.set('BEARER', data.token)

      console.log('attemptLogin Success', data)
      commit('setIsLoggingIn', false)
      return true
    })
    .catch((e) => {
      console.log('attemptLogin Failed', e)
      commit('setIsLoggingIn', false)
      return false
    })
}

export function updateRefreshToken ({ state, commit }) {
  const refreshToken = state.refreshToken
  if (!refreshToken) return false
  const payload = { refresh_token: refreshToken }
  // commit('setJWTToken', '')
  commit('setIsLoggingIn', true)
  Cookies.set('BEARER', '')
  return fetch({ id: 'token/refresh', ep: ENTRYPOINT }, { method: 'POST', body: JSON.stringify(payload) })
    .then((response) => response.json())
    .then((data) => {
      commit('setJWTToken', data.token)
      commit('setRefreshToken', data.refresh_token)
      commit('setUserData', data.data)
      localStorage.setItem('token', data.token)
      localStorage.setItem('refresh_token', data.refresh_token)
      localStorage.setItem('userdata', JSON.stringify(data.data))

      Cookies.set('BEARER', data.token)

      console.log('updateRefreshToken Success', data)
      commit('setIsLoggingIn', false)
      return true
    })
    .catch((e) => {
      console.log('updateRefreshToken Failed', e)
      commit('setIsLoggingIn', false)
      return false
    })
}

export function logoutAction ({ commit, dispatch }) {
  Cookies.set('BEARER', '')
  commit('setJWTToken', '')
  commit('setRefreshToken', '')
  commit('setUserData', {})
  LocalStorage.remove('token')
  LocalStorage.remove('refresh_token')
  LocalStorage.remove('userdata')
  dispatch('cache/clearCache', undefined, { root: true })
  socket.emit("logout")
  socket.disconnect()
  return true
}

export function waitForLogin ({ state, dispatch, getters }) {
  return new Promise((resolve, reject) => {
    let retryCount = 0

    // Wait for 2 seconds before returning false
    const loader = setInterval(() => {
      if (retryCount > 40) {
        clearInterval(loader)
        resolve(false)
      }
      if (getters.isLoggedIn) resolve(state.userData)
      retryCount++
    }, 50)
  })
}
