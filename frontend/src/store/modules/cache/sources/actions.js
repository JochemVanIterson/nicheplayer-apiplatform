// Sources

export function getFromAPI ({ state, commit, rootState, dispatch }, { id, joinFields = [], force }) {
  if (!id) return
  if (typeof id === 'string') id = id.replace('/api/sources/', '')
  if (!force && (typeof state.data[id] !== 'undefined')) return

  if (state.data[id] === 'collecting') return
  else commit('updateValue', { id: id, value: 'collecting' })

  return dispatch('system/apiRequest', { path: `sources/${id}` }, { root: true })
    .then((data) => {
      commit('updateValue', { id: id, value: data })
    })
}

export function getAllFromAPI ({ state, commit, rootState, dispatch }) {
  return dispatch('system/apiRequest', { path: 'sources' }, { root: true })
    .then((data) => {
      data['hydra:member'].forEach(element => {
        commit('updateValue', { id: element.id, value: element })
      })
    })
}
