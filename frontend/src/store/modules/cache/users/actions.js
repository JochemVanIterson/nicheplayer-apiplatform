// u\Users

export function getFromAPI ({ state, commit, rootState, dispatch }, { id, follow = true, force }) {
  if (!id) return
  if (typeof id === 'string') id = id.replace('/api/users/', '')
  if (!force && (typeof state.data[id] !== 'undefined')) return

  if (state.data[id] === 'collecting') return
  else commit('updateValue', { id: id, value: 'collecting' })

  return dispatch('system/apiRequest', { path: `users/${id}` }, { root: true })
    .then((data) => {
      if (follow) {
        dispatch('cache/mediaObjects/getFromAPI', { id: data.profilePic, follow: true }, { root: true })
      }
      commit('updateValue', { id: id, value: data })
    })
}

export function getAllFromAPI ({ state, commit, rootState, dispatch }) {
  return dispatch('system/apiRequest', { path: 'users' }, { root: true })
    .then((data) => {
      data['hydra:member'].forEach(element => {
        dispatch('cache/mediaObjects/getFromAPI', { id: element.profilePic, follow: true }, { root: true })
        commit('updateValue', { id: element.id, value: element })
      })
    })
}
