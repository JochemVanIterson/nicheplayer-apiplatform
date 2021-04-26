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

    if (userObject.profilePic) {
      const profilePicID = userObject.profilePic.replace('/api/media_objects/', '')
      userObject.profilePic = rootGetters['cache/mediaObjects/getObjectJoined'](profilePicID)
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

    if (userObject.profilePic) {
      const profilePicID = userObject.profilePic.replace('/api/media_objects/', '')
      userObject.profilePic = rootGetters['cache/mediaObjects/getObjectJoined'](profilePicID)
    }
    return userObject
  })
}
