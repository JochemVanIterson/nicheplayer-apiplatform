// u\Users

export function getFromAPI({ state, commit, rootState, dispatch }, { id, joinFields = ['profilepic'], force }) {
  if (!id) return
  if (typeof id === 'string') id = id.replace('/api/users/', '')
  if (!force && (typeof state.data[id] !== 'undefined')) return

  if (state.data[id] === 'collecting') return
  else commit('updateValue', { id: id, value: 'collecting' })

  return dispatch('system/apiRequest', { path: `users/${id}` }, { root: true })
    .then((data) => {
      if (joinFields.includes('profilepic')) {
        dispatch('cache/mediaObjects/getFromAPI', { id: data.profilepic, follow: true }, { root: true })
      }
      commit('updateValue', { id: id, value: data })
    })
}

export function getAllFromAPI ({ state, commit, rootState, dispatch }) {
  return dispatch('system/apiRequest', { path: 'users' }, { root: true })
    .then((data) => {
      data['hydra:member'].forEach(element => {
        dispatch('cache/mediaObjects/getFromAPI', { id: element.profilepic, follow: true }, { root: true })
        commit('updateValue', { id: element.id, value: element })
      })
    })
}

export function insertAPI ({ state, commit, rootState, dispatch }, payload) {
  console.log(payload)
  if (payload.profilepic && typeof payload.profilepic !== 'string') payload.profilepic = payload.profilepic['@id']

  return dispatch('system/apiRequest', { path: 'users', payload, method: 'POST' }, { root: true })
    .then((data) => {
      return data
    })
}

export function updateAPI ({ state, commit, rootState, dispatch }, { id, payload }) {
  if (!id) return
  if (typeof id === 'string') id = id.replace('/api/users/', '')

  if (payload.profilepic && typeof payload.profilepic !== 'string') payload.profilepic = payload.profilepic['@id']
  if (!payload.password) delete payload.password

  return dispatch('system/apiRequest', { path: `users/${id}`, payload, method: 'PUT' }, { root: true })
    .then((data) => {
      return data
    })
}

export function deleteAPI ({ state, commit, rootState, dispatch }, id) {
  if (!id) return
  if (typeof id === 'string') id = id.replace('/api/users/', '')

  return dispatch('system/apiRequest', { path: `users/${id}`, method: 'DELETE' }, { root: true })
    .then((data) => {
      commit('deleteValue', id)
      return data
    })
}
