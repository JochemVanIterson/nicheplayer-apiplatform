// Albums

export function getFromAPI ({ state, commit, rootState, dispatch }, { id, joinFields = ['albumArt'], force }) {
  if (!id) return
  if (typeof id === 'string') id = id.replace('/api/albums/', '')
  if (!force && (typeof state.data[id] !== 'undefined')) return

  if (state.data[id] === 'collecting') return
  else commit('updateValue', { id: id, value: 'collecting' })

  return dispatch('system/apiRequest', { path: `albums/${id}` }, { root: true })
    .then((data) => {
      if (joinFields.includes('albumArt')) {
        dispatch('cache/mediaObjects/getFromAPI', { id: data.albumArt, follow: true }, { root: true })
      }
      if (joinFields.includes('songs')) {
        data.songs.forEach(song => {
          dispatch('cache/songs/getFromAPI', { id: song }, { root: true })
        })
      }
      commit('updateValue', { id: id, value: data })
    })
}

export function getAllFromAPI ({ state, commit, rootState, dispatch }) {
  return dispatch('system/apiRequest', { path: 'albums' }, { root: true })
    .then((data) => {
      data['hydra:member'].forEach(element => {
        dispatch('cache/mediaObjects/getFromAPI', { id: element.albumArt, follow: true }, { root: true })
        element.songs.forEach(song => {
          dispatch('cache/songs/getFromAPI', { id: song }, { root: true })
        })
        commit('updateValue', { id: element.id, value: element })
      })
    })
}

export function insertAPI({ state, commit, rootState, dispatch }, payload) {
  console.log(payload)
  if (payload.albumArt && typeof payload.albumArt !== 'string') payload.albumArt = payload.albumArt['@id']

  return dispatch('system/apiRequest', { path: 'albums', payload, method: 'POST' }, { root: true })
    .then((data) => {
      return data
    })
}

export function updateAPI({ state, commit, rootState, dispatch }, { id, payload }) {
  if (!id) return
  if (typeof id === 'string') id = id.replace('/api/albums/', '')

  if (payload.albumArt && typeof payload.albumArt !== 'string') payload.albumArt = payload.albumArt['@id']

  return dispatch('system/apiRequest', { path: `albums/${id}`, payload, method: 'PUT' }, { root: true })
    .then((data) => {
      return data
    })
}

export function deleteAPI({ state, commit, rootState, dispatch }, id) {
  if (!id) return
  if (typeof id === 'string') id = id.replace('/api/albums/', '')

  return dispatch('system/apiRequest', { path: `albums/${id}`, method: 'DELETE' }, { root: true })
    .then((data) => {
      commit('updateValue', { id: id, value: undefined })
      return data
    })
}
