// Albums

import _ from 'lodash'

export function getObject (state) {
  return (id) => {
    const albumObject = state.data[id]
    if (!albumObject) return {}
    return albumObject
  }
}

export function getObjectJoined (state, getters, rootState, rootGetters) {
  return (id, joinFields = ['albumArt']) => {
    const albumObject = _.clone(getters.getObject(id))
    if (joinFields.includes('albumArt') && albumObject.albumArt) {
      const albumArtID = albumObject.albumArt.replace('/api/media_objects/', '')
      albumObject.albumArt = rootGetters['cache/mediaObjects/getObjectJoined'](albumArtID)
    }
    if (joinFields.includes('songs') && albumObject.songs) {
      albumObject.songs = albumObject.songs.map(songID => {
        const songIndex = songID.replace('/api/songs/', '')
        const songData = rootGetters['cache/songs/getObjectJoined'](songIndex, ['file'])
        return songData
      })
    }
    return albumObject
  }
}

export function getAll (state, getters, rootState, rootGetters) {
  return state.data
}

export function getAllJoined (state, getters, rootState, rootGetters) {
  return getters.getAll.map(e => {
    const albumObject = _.clone(e)
    if (albumObject.albumArt) {
      const albumArtID = albumObject.albumArt.replace('/api/media_objects/', '')
      albumObject.albumArt = rootGetters['cache/mediaObjects/getObjectJoined'](albumArtID)
    }
    return albumObject
  })
}
