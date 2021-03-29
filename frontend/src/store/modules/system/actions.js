import fetch from '../../../utils/fetch'
import { ENTRYPOINT } from "../../../config/1314272676_entrypoint";
import { Cookies } from 'quasar'

export function apiRequest({ state }, { path, payload, method = 'GET', params }) {
    const jwtToken = state.jwtToken
    if (!jwtToken) return false
    let body;
    if (payload) body = JSON.stringify(payload)
    return fetch({ id: path, ep: ENTRYPOINT, jwtToken }, { method: method, body, params })
        .then((response) => response.json())
        .catch((e) => {
            console.log("apiRequest Failed", e)
            return false
        })
}

export function attemptLogin({ commit }, payload) {
    Cookies.set('BEARER', '')
    return fetch({ id: "authentication_token", ep: ENTRYPOINT }, { method: 'POST', body: JSON.stringify(payload) })
        .then((response) => response.json())
        .then((data) => {
            commit("setJWTToken", data.token)
            commit("setRefreshToken", data.refresh_token)
            commit("setUserData", data.data)

            Cookies.set('BEARER', data.token)

            console.log("attemptLogin Success", data)
            return true
        })
        .catch((e) => {
            console.log("attemptLogin Failed", e)
            return false
        })
}

export function updateRefreshToken({ state, commit }) {
    const refreshToken = state.refreshToken
    if (!refreshToken) return false
    const payload = { refresh_token: refreshToken }
    commit("setJWTToken", "")
    Cookies.set('BEARER', '')
    return fetch({ id: "token/refresh", ep: ENTRYPOINT }, { method: 'POST', body: JSON.stringify(payload) })
        .then((response) => response.json())
        .then((data) => {
            commit("setJWTToken", data.token)
            commit("setRefreshToken", data.refresh_token)
            commit("setUserData", data.data)

            Cookies.set('BEARER', data.token)

            console.log("updateRefreshToken Success", data)
            return true
        })
        .catch((e) => {
            console.log("updateRefreshToken Failed", e)
            return false
        })
}

export function logoutAction({ commit, dispatch }) {
    Cookies.set('BEARER', '')
    commit("setJWTToken", "")
    commit("setRefreshToken", "")
    commit("setUserData", {})
    dispatch("cache/clearCache", undefined, { root: true })
    return true
}