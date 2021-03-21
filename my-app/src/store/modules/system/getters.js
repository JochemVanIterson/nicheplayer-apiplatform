import { ENTRYPOINT } from "../../../config/1314272676_entrypoint";


export function isLoggedIn (state) {
    return state.jwtToken && state.userData && state.userData.username
}

export function userFullName(state) {
    if (!state.userData) return ""
    return state.userData.fullname
}

export function userProfilePic(state) {
    if (!state.userData) return ""
    return `${ENTRYPOINT}${state.userData.profilepicURL}`
}