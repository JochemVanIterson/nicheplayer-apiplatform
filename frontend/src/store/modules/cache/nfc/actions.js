// NFCs

export function getFromAPI ({ state, commit, rootState, dispatch }, { id, joinFields = ['album'], force = false, nojwt = false }) {
  if (!id) return
  if (typeof id === 'string') id = parseInt(id.replace('/api/nfcs/', ''))
  if (!force && (typeof state.data[id] !== 'undefined')) return

  if (!force && state.data[id] === 'collecting') return
  else commit('updateValue', { id: id, value: 'collecting' })

  return dispatch('system/apiRequest', { path: `nfcs/${id}`, nojwt }, { root: true })
    .then((data) => {
      if (joinFields.includes('album')) {
        dispatch('cache/albums/getFromAPI', { id: data.album, joinFields: [], nojwt, force }, { root: true })
      }
      if (joinFields.includes('users')) {
        data.users.forEach(user => {
          dispatch('cache/users/getFromAPI', { id: user, joinFields: [], nojwt, force }, { root: true })
        })
      }
      commit('updateValue', { id: id, value: data })
    })
}

export function getFromAPIByUID({ state, commit, rootState, dispatch, rootGetters }, { uid, joinFields = ['album'] }) {
  if (!uid) return
  const user = rootGetters['system/userData']

  return dispatch('system/apiRequest', { path: 'nfcs', params: { cardUID: uid, 'users.id': user.id } }, { root: true })
    .then((data) => {
      data = data['hydra:member'][0]
      if (!data) return
      if (joinFields.includes('album') && data.album) {
        dispatch('cache/albums/getFromAPI', { id: data.album, joinFields: [] }, { root: true })
      }
      commit('updateValue', { id: data.id, value: data })
      return data
    })
}

export function getFromAPIByAlbum({ state, commit, rootState, dispatch, rootGetters }, { album, joinFields = ['album'] }) {
  if (!album) return
  const user = rootGetters['system/userData']

  return dispatch('system/apiRequest', { path: 'nfcs', params: { album, 'users.id': user.id } }, { root: true })
    .then((data) => {
      data = data['hydra:member'][0]
      if (!data) return
      if (joinFields.includes('album') && data.album) {
        dispatch('cache/albums/getFromAPI', { id: data.album, joinFields: [] }, { root: true })
      }
      commit('updateValue', { id: data.id, value: data })
      return data
    })
}

export function getAllFromAPI({ state, commit, rootState, dispatch }, options) {
  const { joinFields = ['album'], nojwt = false, force = false } = options
  return dispatch('system/apiRequest', { path: 'nfcs' }, { root: true })
    .then((data) => {
      data['hydra:member'].forEach(element => {
        if (joinFields.includes('album')) {
          dispatch('cache/albums/getFromAPI', { id: element.album, joinFields: [], nojwt, force }, { root: true })
        }
        if (joinFields.includes('users')) {
          data.users.forEach(user => {
            dispatch('cache/users/getFromAPI', { id: user, joinFields: [], nojwt, force }, { root: true })
          })
        }
        commit('updateValue', { id: element.id, value: element })
      })
      return data['hydra:member']
    })
}

export function getAllFromAPIByUser({ state, commit, rootState, dispatch, rootGetters }, options) {
  const { joinFields = ['album'], nojwt = false, force = false } = options
  const user = rootGetters['system/userData']

  return dispatch('system/apiRequest', { path: 'nfcs', params: { 'users.id': user.id } }, { root: true })
    .then((data) => {
      data['hydra:member'].forEach(element => {
        if (joinFields.includes('album')) {
          dispatch('cache/albums/getFromAPI', { id: element.album, joinFields: [], nojwt, force }, { root: true })
        }
        if (joinFields.includes('users')) {
          data.users.forEach(user => {
            dispatch('cache/users/getFromAPI', { id: user, joinFields: [], nojwt, force }, { root: true })
          })
        }
        commit('updateValue', { id: element.id, value: element })
      })
      return data['hydra:member']
    })
}

export function insertAPI ({ state, commit, rootState, dispatch }, payload) {
  if (payload.album && typeof payload.album !== 'string') payload.album = payload.album['@id']
  payload.users = payload.users.map((user) => (user && typeof user !== 'string') ? user['@id'] : user)

  console.log(payload)

  return dispatch('system/apiRequest', { path: 'nfcs', payload, method: 'POST' }, { root: true })
    .then((data) => {
      return data
    })
}

export function updateAPI ({ state, commit, rootState, dispatch }, { id, payload }) {
  if (!id) return
  if (typeof id === 'string') id = id.replace('/api/nfcs/', '')

  if (payload.album && typeof payload.album !== 'string') payload.album = payload.album['@id']

  return dispatch('system/apiRequest', { path: `nfcs/${id}`, payload, method: 'PUT' }, { root: true })
    .then((data) => {
      return data
    })
}

export function deleteAPI ({ state, commit, rootState, dispatch }, id) {
  if (!id) return
  if (typeof id === 'string') id = id.replace('/api/nfcs/', '')

  return dispatch('system/apiRequest', { path: `nfcs/${id}`, method: 'DELETE' }, { root: true })
    .then((data) => {
      commit('deleteValue', id)
      return data
    })
}
