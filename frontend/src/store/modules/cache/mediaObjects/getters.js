// MediaObjects

import _ from 'lodash'

export function getObject (state) {
  return (id) => {
    const albumObject = state.data[id]
    if (!albumObject) return {}
    return albumObject
  }
}

export function getObjectJoined (state, getters, rootState, rootGetters) {
  return (id) => {
    const albumObject = _.clone(getters.getObject(id))
    // Nothing to join
    return albumObject
  }
}
