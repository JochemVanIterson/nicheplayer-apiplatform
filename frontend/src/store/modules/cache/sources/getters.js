// Sources

import _ from 'lodash'

export function getObject (state) {
  return (id) => {
    const sourceObject = state.data[id]
    if (!sourceObject) return {}
    return sourceObject
  }
}

export function getObjectJoined (state, getters, rootState, rootGetters) {
  return (id, joinFields = []) => {
    const sourceObject = _.clone(getters.getObject(id))
    return sourceObject
  }
}

export function getAll (state, getters, rootState, rootGetters) {
  return state.data
}

export function getAllJoined (state, getters, rootState, rootGetters) {
  return getters.getAll.map(e => {
    const sourceObject = _.clone(e)
    return sourceObject
  })
}
