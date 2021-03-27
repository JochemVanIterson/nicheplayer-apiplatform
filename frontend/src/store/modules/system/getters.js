import { MEDIAPOINT } from "../../../config/1314272676_entrypoint";


export function isLoggedIn (state) {
    return state.jwtToken && state.refreshToken && state.userData && state.userData.username
}

export function userFullName(state) {
    if (!state.userData) return ""
    return state.userData.fullname
}

export function userProfilePic(state) {
    if (!state.userData) return ""
    return `${MEDIAPOINT}${state.userData.profilepicURL}`
}

export function userData(state) {
    return state.userData
}