import Vue from 'vue'

export function setJWTToken (state, value) {
    Vue.set(state, 'jwtToken', value)
}

export function setUserData(state, value) {
    Vue.set(state, 'userData', value)
}