// Songs

import _ from 'lodash'

export function getObject (state) {
  return (id) => {
    const paymentObject = state.data[id]
    if (!paymentObject) return {}
    return paymentObject
  }
}

export function getObjectByAlbum (state) {
  return (album) => {
    const filtered = state.data.filter((e) => {
      return e.album === '/api/albums/' + album
    })

    if (filtered.length === 0) return undefined
    const paymentObject = filtered[0]
    if (!paymentObject) return {}
    return paymentObject
  }
}

export function getObjectJoined (state, getters, rootState, rootGetters) {
  return (id) => {
    const paymentObject = _.clone(getters.getObject(id))
    return paymentObject
  }
}

export function getAll (state, getters, rootState, rootGetters) {
  return state.data
}

export function getAllJoined (state, getters, rootState, rootGetters) {
  return getters.getAll.map(e => {
    const paymentObject = _.clone(e)
    return paymentObject
  })
}
