// MediaObjects

export function getFromAPI ({ state, commit, rootState, dispatch }, { id, joinFields = ['source'], force }) {
  if (!id) return
  if (typeof id === 'string') id = id.replace('/api/media_objects/', '')
  if (!force && (typeof state.data[id] !== 'undefined')) return

  if (state.data[id] === 'collecting') return
  else commit('updateValue', { id: id, value: 'collecting' })

  return dispatch('system/apiRequest', { path: `media_objects/${id}` }, { root: true })
    .then((data) => {
      if (joinFields.includes('source')) {
        dispatch('cache/sources/getFromAPI', { id: data.source, follow: true }, { root: true })
      }
      commit('updateValue', { id: id, value: data })
    })
}

export function getAllFromAPI ({ state, commit, rootState, dispatch }) {
  return dispatch('system/apiRequest', { path: 'media_objects' }, { root: true })
    .then((data) => {
      data['hydra:member'].forEach(element => {
        dispatch('cache/sources/getFromAPI', { id: element.source, follow: true }, { root: true })
        commit('updateValue', { id: element.id, value: element })
      })
      return data['hydra:member']
    })
}

export function insertAPI ({ state, commit, rootState, dispatch }, payload) {
  console.log(payload)
  if (payload.source && typeof payload.source !== 'string') payload.source = payload.source['@id']

  return dispatch('system/apiRequest', { path: 'media_objects', payload, method: 'POST' }, { root: true })
    .then((data) => {
      return data
    })
}

export function updateAPI ({ state, commit, rootState, dispatch }, { id, payload }) {
  if (!id) return
  if (typeof id === 'string') id = id.replace('/api/media_objects/', '')

  if (payload.source && typeof payload.source !== 'string') payload.source = payload.source['@id']

  return dispatch('system/apiRequest', { path: `media_objects/${id}`, payload, method: 'PUT' }, { root: true })
    .then((data) => {
      return data
    })
}

export function deleteAPI ({ state, commit, rootState, dispatch }, id) {
  if (!id) return
  if (typeof id === 'string') id = id.replace('/api/media_objects/', '')

  return dispatch('system/apiRequest', { path: `media_objects/${id}`, method: 'DELETE' }, { root: true })
    .then((data) => {
      commit('deleteValue', id)
      return data
    })
}
