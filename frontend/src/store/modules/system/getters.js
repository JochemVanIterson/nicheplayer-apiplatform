import { MEDIAPOINT, ENTRYPOINT } from "../../../config/1314272676_entrypoint";

export function getMediaURL(state) {
    return (url) => `${MEDIAPOINT}${url}`
}

export function getApiURL(state) {
    return (url) => `${ENTRYPOINT}${url}`
}

export function hasTokens(state) {
    return state.refreshToken && state.jwtToken
}

export function isLoggedIn(state) {
    let isLoggingIn = state.isLoggingIn;
    return state.jwtToken && state.refreshToken && state.userData && state.userData.username && !isLoggingIn
}

export function userFullName(state) {
    if (!state.userData) return ""
    return state.userData.fullname
}

export function userAdmin(state) {
    if (!state.userData) return false
    console.log("userAdmin", state.userData.roles)
    return state.userData.roles.includes("ROLE_ADMIN")
}

export function userProfilePic(state) {
    if (!state.userData) return ""
    return `${MEDIAPOINT}${state.userData.profilepicURL}`
}

export function userData(state) {
    return state.userData
}