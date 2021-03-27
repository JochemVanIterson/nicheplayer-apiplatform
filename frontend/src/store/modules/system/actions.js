import fetch from '../../../utils/fetch'
import { ENTRYPOINT } from "../../../config/1314272676_entrypoint";

export function attemptLogin({ commit }, payload) {
    return fetch({ id: "authentication_token", ep: ENTRYPOINT }, { method: 'POST', body: JSON.stringify(payload) })
        .then((response) => response.json())
        .then((data) => {
            commit("setJWTToken", data.token)
            commit("setRefreshToken", data.refresh_token)
            commit("setUserData", data.data)

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
    return fetch({ id: "token/refresh", ep: ENTRYPOINT }, { method: 'POST', body: JSON.stringify(payload) })
        .then((response) => response.json())
        .then((data) => {
            commit("setJWTToken", data.token)
            commit("setRefreshToken", data.refresh_token)
            commit("setUserData", data.data)

            console.log("updateRefreshToken Success", data)
            return true
        })
        .catch((e) => {
            console.log("updateRefreshToken Failed", e)
            return false
        })
}

export function logoutAction({ commit }) {
    commit("setJWTToken", "")
    commit("setRefreshToken", "")
    commit("setUserData", {})
}