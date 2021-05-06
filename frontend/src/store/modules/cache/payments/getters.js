// Songs

import _ from 'lodash'

export function getObject (state) {
  return (id) => {
    const paymentObject = state.data[id]
    if (!paymentObject) return {}
    return paymentObject
  }
}

export function getObjectByAlbum (state, getters, rootState, rootGetters) {
  return (album) => {
    const filtered = state.data.filter((e) => {
      console.log(e)
      return (e.album === '/api/albums/' + album) && e.user === '/api/users/' + rootGetters['system/userData'].id
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
    if (paymentObject.album) {
      const albumID = paymentObject.album.replace('/api/albums/', '')
      paymentObject.album = rootGetters['cache/albums/getObjectJoined'](albumID)
    }
    if (paymentObject.song) {
      const songID = paymentObject.song.replace('/api/songs/', '')
      paymentObject.song = rootGetters['cache/songs/getObjectJoined'](songID)
    }
    if (paymentObject.user) {
      const userID = paymentObject.user.replace('/api/users/', '')
      paymentObject.user = rootGetters['cache/users/getObjectJoined'](userID)
    }
    return paymentObject
  }
}

export function getAll (state, getters, rootState, rootGetters) {
  return state.data
}

export function getAllJoined (state, getters, rootState, rootGetters) {
  return getters.getAll.map(e => {
    const paymentObject = _.clone(e)
    if (paymentObject.album) {
      const albumID = paymentObject.album.replace('/api/albums/', '')
      paymentObject.album = rootGetters['cache/albums/getObjectJoined'](albumID)
    }
    if (paymentObject.song) {
      const songID = paymentObject.song.replace('/api/songs/', '')
      paymentObject.song = rootGetters['cache/songs/getObjectJoined'](songID)
    }
    if (paymentObject.user) {
      const userID = paymentObject.user.replace('/api/users/', '')
      paymentObject.user = rootGetters['cache/users/getObjectJoined'](userID)
    }
    return paymentObject
  })
}
