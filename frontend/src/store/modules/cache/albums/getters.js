// Albums

import _ from 'lodash'

export function getObject(state) {
  return (id) => {
    let albumObject = state.data[id]
    if (!albumObject) return {}
    return albumObject
  }
}

export function getObjectJoined(state, getters, rootState, rootGetters) {
  return (id) => {
    let albumObject = _.clone(getters['getObject'](id))
    if (albumObject.albumArt) {
      const albumArtID = albumObject.albumArt.replace("/api/media_objects/", "")
      albumObject.albumArt = rootGetters["mediaObjects/getObjectJoined"](albumArtID)
    }
    return albumObject
  }
}