// Songs

import _ from 'lodash'

export function getObject (state) {
  return (id) => {
    const playHistoryObject = state.data[id]
    if (!playHistoryObject) return {}
    return playHistoryObject
  }
}

export function getObjectJoined (state, getters, rootState, rootGetters) {
  return (id) => {
    const playHistoryObject = _.clone(getters.getObject(id))
    if (playHistoryObject.song) {
      const songID = playHistoryObject.song.replace('/api/songs/', '')
      playHistoryObject.song = rootGetters['cache/songs/getObjectJoined'](songID)
    }
    if (playHistoryObject.user) {
      const userID = playHistoryObject.user.replace('/api/users/', '')
      playHistoryObject.user = rootGetters['cache/users/getObjectJoined'](userID)
    }
    return playHistoryObject
  }
}

export function getAll (state, getters, rootState, rootGetters) {
  return state.data
}

export function getAllJoined (state, getters, rootState, rootGetters) {
  return getters.getAll.map(e => {
    const playHistoryObject = _.clone(e)
    if (playHistoryObject.song) {
      const songID = playHistoryObject.song.replace('/api/songs/', '')
      playHistoryObject.song = rootGetters['cache/songs/getObjectJoined'](songID)
    }
    if (playHistoryObject.user) {
      const userID = playHistoryObject.user.replace('/api/users/', '')
      playHistoryObject.user = rootGetters['cache/users/getObjectJoined'](userID)
    }
    return playHistoryObject
  })
}
