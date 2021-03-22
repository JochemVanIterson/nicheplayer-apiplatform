import fetch from '../../../utils/fetch'
import { ENTRYPOINT } from "../../../config/1314272676_entrypoint";

export function attemptLogin({ rootState, commit }, payload) {
    const jwtToken = rootState.system.jwtToken
    return fetch({ id: "authentication_token", ep: ENTRYPOINT }, { method: 'POST', body: JSON.stringify(payload) }, jwtToken)
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