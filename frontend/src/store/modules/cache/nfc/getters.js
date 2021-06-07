// Albums

import _ from 'lodash'

export function getObject (state) {
  return (id) => {
    const nfcObject = state.data[id]
    if (!nfcObject) return {}
    return nfcObject
  }
}

export function getObjectBy (state) {
  return (query) => {
    const nfcObject = state.data.filter((e) => {
      let match = true
      if (!e) return false
      console.log(query, e)
      for (const key of Object.keys(query)) {
        if (key === 'album' && e[key] !== query[key]) match = false
        if (key === 'user' && !e[key].includes(query[key])) match = false
      }
      return match
    })[0]
    if (!nfcObject) return {}
    return nfcObject
  }
}

export function getObjectJoined (state, getters, rootState, rootGetters) {
  return (id, joinFields = ['album']) => {
    let nfcObject;
    if (typeof id === 'object') nfcObject = _.clone(getters.getObjectBy(id))
    else nfcObject = _.clone(getters.getObject(id))

    if (joinFields.includes('album') && nfcObject.album) {
      const albumID = nfcObject.album.replace('/api/albums/', '')
      nfcObject.album = rootGetters['cache/albums/getObjectJoined'](albumID)
    }
    if (joinFields.includes('users') && nfcObject.users) {
      nfcObject.users = nfcObject.users.map(userID => {
        const userIndex = userID.replace('/api/users/', '')
        const userData = rootGetters['cache/users/getObjectJoined'](userIndex, [])
        return userData
      })
    }
    return nfcObject
  }
}

export function getAll (state, getters, rootState, rootGetters) {
  return state.data
}

export function getAllBy (state, getters, rootState, rootGetters) {
  const user = rootGetters['system/userData']
  console.log(state.data)
  return state.data.filter((e) => {
    return e.users.includes('/api/users/' + user.id)
  })
}

export function getAllJoined (state, getters, rootState, rootGetters) {
  return getters.getAll.map(e => {
    const nfcObject = _.clone(e)
    if (nfcObject.album) {
      const albumID = nfcObject.album.replace('/api/albums/', '')
      nfcObject.album = rootGetters['cache/albums/getObjectJoined'](albumID)
    }
    if (nfcObject.users) {
      nfcObject.users = nfcObject.users.map(userID => {
        const userIndex = userID.replace('/api/users/', '')
        const userData = rootGetters['cache/users/getObjectJoined'](userIndex, [])
        return userData
      })
    }
    return nfcObject
  })
}

export function getAllJoinedByUser (state, getters, rootState, rootGetters) {
  return getters.getAllBy.map(e => {
    const nfcObject = _.clone(e)
    if (nfcObject.album) {
      const albumID = nfcObject.album.replace('/api/albums/', '')
      nfcObject.album = rootGetters['cache/albums/getObjectJoined'](albumID)
    }
    if (nfcObject.users) {
      nfcObject.users = nfcObject.users.map(userID => {
        const userIndex = userID.replace('/api/users/', '')
        const userData = rootGetters['cache/users/getObjectJoined'](userIndex, [])
        return userData
      })
    }
    return nfcObject
  })
}
