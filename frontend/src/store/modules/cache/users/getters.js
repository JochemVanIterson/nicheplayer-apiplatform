// Users

import _ from 'lodash'

export function getObject (state) {
  return (id) => {
    const userObject = state.data[id]
    if (!userObject) return {}
    return userObject
  }
}

export function getObjectJoined (state, getters, rootState, rootGetters) {
  return (id) => {
    const userObject = _.clone(getters.getObject(id))

    if (userObject.profilepic) {
      const profilepicID = userObject.profilepic.replace('/api/media_objects/', '')
      userObject.profilepic = rootGetters['cache/mediaObjects/getObjectJoined'](profilepicID)
    }
    return userObject
  }
}

export function getAll (state, getters, rootState, rootGetters) {
  return state.data
}

export function getAllJoined (state, getters, rootState, rootGetters) {
  return getters.getAll.map(e => {
    const userObject = _.clone(e)

    if (userObject.profilepic) {
      const profilepicID = userObject.profilepic.replace('/api/media_objects/', '')
      userObject.profilepic = rootGetters['cache/mediaObjects/getObjectJoined'](profilepicID)
    }
    return userObject
  })
}
