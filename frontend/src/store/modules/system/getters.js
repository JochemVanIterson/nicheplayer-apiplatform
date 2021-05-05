import { MEDIAPOINT, ENTRYPOINT } from '../../../config/1314272676_entrypoint'
import { Howler } from 'howler'

export function getMediaURL (state) {
  return (url) => `${MEDIAPOINT}${url}`
}

export function getApiURL (state) {
  return (url) => `${ENTRYPOINT}${url}`
}

export function hasTokens (state) {
  return state.refreshToken && state.jwtToken
}

export function isLoggedIn (state) {
  const isLoggingIn = state.isLoggingIn
  return state.jwtToken && state.refreshToken && state.userData && state.userData.username && !isLoggingIn
}

export function userFullName (state) {
  if (!state.userData) return ''
  return state.userData.fullname
}

export function userName(state) {
  if (!state.userData) return ''
  return state.userData.username
}

export function userId(state) {
  if (!state.userData) return ''
  return state.userData.id
}

export function userAdmin (state) {
  if (!state.userData) return false
  return state.userData.roles.includes('ROLE_ADMIN')
}

export function userHasProfilePic (state) {
  if (!state.userData) return ''
  return state.userData.profilepicURL !== ''
}

export function userProfilePic (state) {
  if (!state.userData) return ''
  return `${MEDIAPOINT}${state.userData.profilepicURL}`
}

export function userInitials (state) {
  if (!state.userData) return ''
  return `${state.userData.firstname.charAt(0).toUpperCase()}${state.userData.lastname.charAt(0).toUpperCase()}`
}

export function userData (state) {
  return state.userData
}

export function enableWebAudio(state) {
  return Howler.usingWebAudio && state.enableWebAudio
}