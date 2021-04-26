// Songs

import _ from 'lodash'

export function getObject (state) {
  return (id) => {
    const songObject = state.data[id]
    if (!songObject) return {}
    return songObject
  }
}

export function getObjectJoined (state, getters, rootState, rootGetters) {
  return (id) => {
    const songObject = _.clone(getters.getObject(id))

    if (songObject.album) {
      const albumID = songObject.album.replace('/api/albums/', '')
      songObject.album = rootGetters['cache/albums/getObjectJoined'](albumID)
    }

    if (songObject.file) {
      const fileID = songObject.file.replace('/api/media_objects/', '')
      songObject.file = rootGetters['cache/mediaObjects/getObjectJoined'](fileID)
    }
    return songObject
  }
}

export function getAll (state, getters, rootState, rootGetters) {
  return state.data
}

export function getAllJoined (state, getters, rootState, rootGetters) {
  return getters.getAll.map(e => {
    const songObject = _.clone(e)

    if (songObject.album) {
      const albumID = songObject.album.replace('/api/albums/', '')
      songObject.album = rootGetters['cache/albums/getObjectJoined'](albumID)
    }

    if (songObject.file) {
      const fileID = songObject.file.replace('/api/media_objects/', '')
      songObject.file = rootGetters['cache/mediaObjects/getObjectJoined'](fileID)
    }
    return songObject
  })
}
