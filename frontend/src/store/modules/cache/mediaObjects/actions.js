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
