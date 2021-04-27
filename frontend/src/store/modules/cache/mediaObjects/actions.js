// MediaObjects

export function getFromAPI ({ state, commit, rootState, dispatch }, { id, follow = true, force }) {
  if (!id) return
  if (typeof id === 'string') id = id.replace('/api/media_objects/', '')
  if (!force && (typeof state.data[id] !== 'undefined')) return

  if (state.data[id] === 'collecting') return
  else commit('updateValue', { id: id, value: 'collecting' })

  return dispatch('system/apiRequest', { path: `media_objects/${id}` }, { root: true })
    .then((data) => {
      if (follow) {
        // Nothing to follow
      }
      commit('updateValue', { id: id, value: data })
    })
}

export function getAllFromAPI ({ state, commit, rootState, dispatch }) {
  return dispatch('system/apiRequest', { path: 'media_objects' }, { root: true })
    .then((data) => {
      data['hydra:member'].forEach(element => {
        commit('updateValue', { id: element.id, value: element })
      })
    })
}
