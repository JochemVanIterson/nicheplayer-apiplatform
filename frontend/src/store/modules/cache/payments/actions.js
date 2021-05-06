// Payments

export function getFromAPI ({ state, commit, rootState, dispatch }, { id, joinFields = ['album', 'song', 'user'], force }) {
  if (!id) return
  if (typeof id === 'string') id = id.replace('/api/payments/', '')
  if (!force && (typeof state.data[id] !== 'undefined')) return

  if (state.data[id] === 'collecting') return
  else commit('updateValue', { id: id, value: 'collecting' })

  return dispatch('system/apiRequest', { path: `payments/${id}` }, { root: true })
    .then((data) => {
      if (joinFields.includes('album') && data.album) {
        dispatch('cache/albums/getFromAPI', { id: data.album, joinFields: [] }, { root: true })
      }
      if (joinFields.includes('song') && data.song) {
        dispatch('cache/songs/getFromAPI', { id: data.song, joinFields: [] }, { root: true })
      }
      if (joinFields.includes('user') && data.user) {
        dispatch('cache/users/getFromAPI', { id: data.user, joinFields: [] }, { root: true })
      }
      commit('updateValue', { id: id, value: data })
    })
}

export function getFromAPIByAlbum ({ state, commit, rootState, dispatch, rootGetters }, { album, joinFields = ['album', 'song', 'user'] }) {
  if (!album) return
  if (typeof album === 'string') album = album.replace('/api/albums/', '')
  const user = rootGetters['system/userData']

  return dispatch('system/apiRequest', { path: 'payments', params: { user: user.id, album } }, { root: true })
    .then((data) => {
      data = data['hydra:member'][0]
      if (!data) return
      if (joinFields.includes('album') && data.album) {
        dispatch('cache/albums/getFromAPI', { id: data.album, joinFields: [] }, { root: true })
      }
      if (joinFields.includes('song') && data.song) {
        dispatch('cache/songs/getFromAPI', { id: data.song, joinFields: [] }, { root: true })
      }
      if (joinFields.includes('user') && data.user) {
        dispatch('cache/users/getFromAPI', { id: data.user, joinFields: [] }, { root: true })
      }
      commit('updateValue', { id: data.id, value: data })
    })
}

export function getAllFromAPIByUser ({ state, commit, rootState, dispatch, rootGetters }) {
  const user = rootGetters['system/userData']
  return dispatch('system/apiRequest', { path: 'payments', params: { user: user.id } }, { root: true })
    .then((data) => {
      data['hydra:member'].forEach(element => {
        if (element.album) dispatch('cache/albums/getFromAPI', { id: element.album, joinFields: ['albumArt'] }, { root: true })
        if (element.song) dispatch('cache/songs/getFromAPI', { id: element.song, joinFields: [] }, { root: true })
        if (element.user) dispatch('cache/users/getFromAPI', { id: element.user, joinFields: [] }, { root: true })
        commit('updateValue', { id: element.id, value: element })
      })
    })
}

export function getAllFromAPI ({ state, commit, rootState, dispatch, rootGetters }) {
  return dispatch('system/apiRequest', { path: 'payments' }, { root: true })
    .then((data) => {
      data['hydra:member'].forEach(element => {
        if (element.album) dispatch('cache/albums/getFromAPI', { id: element.album, joinFields: [] }, { root: true })
        if (element.song) dispatch('cache/songs/getFromAPI', { id: element.song, joinFields: [] }, { root: true })
        if (element.user) dispatch('cache/users/getFromAPI', { id: element.user, joinFields: [] }, { root: true })
        commit('updateValue', { id: element.id, value: element })
      })
    })
}

export function insertAPI ({ state, commit, rootState, dispatch }, payload) {
  console.log(payload)
  if (payload.album && typeof payload.album !== 'string') payload.album = payload.album['@id']
  if (payload.song && typeof payload.song !== 'string') payload.song = payload.song['@id']
  if (payload.user && typeof payload.user !== 'string') payload.user = payload.user['@id']

  return dispatch('system/apiRequest', { path: 'payments', payload, method: 'POST' }, { root: true })
    .then((data) => {
      return data
    })
}

export function updateAPI ({ state, commit, rootState, dispatch }, { id, payload }) {
  if (!id) return
  if (typeof id === 'string') id = id.replace('/api/payments/', '')

  if (payload.album && typeof payload.album !== 'string') payload.album = payload.album['@id']
  if (payload.song && typeof payload.song !== 'string') payload.song = payload.song['@id']
  if (payload.user && typeof payload.user !== 'string') payload.user = payload.user['@id']

  return dispatch('system/apiRequest', { path: `payments/${id}`, payload, method: 'PUT' }, { root: true })
    .then((data) => {
      return data
    })
}

export function deleteAPI ({ state, commit, rootState, dispatch }, id) {
  if (!id) return
  if (typeof id === 'string') id = id.replace('/api/payments/', '')

  return dispatch('system/apiRequest', { path: `payments/${id}`, method: 'DELETE' }, { root: true })
    .then((data) => {
      commit('deleteValue', id)
      return data
    })
}
