// Albums

import Vue from 'vue'

export function updateValue (state, { id, value }) {
  Vue.set(state.data, id, value)
}

export function clearCache (state) {
  Vue.set(state, 'data', [])
}
