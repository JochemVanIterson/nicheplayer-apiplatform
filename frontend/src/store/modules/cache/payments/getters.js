// Songs

import _ from 'lodash'

export function getObject(state) {
  return (id) => {
    let paymentObject = state.data[id]
    if (!paymentObject) return {}
    return paymentObject
  }
}

export function getObjectByAlbum(state) {
  return (album) => {
    let filtered = state.data.filter((e) => {
      return e.album == "/api/albums/" + album
    })
    let paymentObject = filtered[0]
    if (!paymentObject) return {}
    return paymentObject
  }
}

export function getObjectJoined(state, getters, rootState, rootGetters) {
  return (id) => {
    let paymentObject = _.clone(getters['getObject'](id))
    return paymentObject
  }
}

export function getAll(state, getters, rootState, rootGetters) {
  return state.data
}

export function getAllJoined(state, getters, rootState, rootGetters) {
  return getters['getAll'].map(e => {
    let paymentObject = _.clone(e)
    return paymentObject
  })
}