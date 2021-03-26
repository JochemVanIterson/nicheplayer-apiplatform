import fetch from '../../../utils/fetch'
import { ENTRYPOINT } from "../../../config/1314272676_entrypoint";

export function attemptLogin({ rootState, commit }, payload) {
    const jwtToken = rootState.system.jwtToken
    return fetch({ id: "authentication_token", ep: ENTRYPOINT, jwtToken }, { method: 'POST', body: JSON.stringify(payload) })
        .then((response) => response.json())
        .then((data) => {
            commit("setJWTToken", data.token)
            commit("setUserData", data.data)

            console.log("attemptLogin Success", data)
            return true
        })
        .catch((e) => {
            console.log("attemptLogin Failed", e)
            return false
        })
}
export function logoutAction({ commit }) {
    commit("setJWTToken", "")
    commit("setUserData", {})
}