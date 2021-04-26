// Payments

export function getFromAPI ({ state, commit, rootState, dispatch }, { id, follow = true, force }) {
  if (!id) return
  if (typeof id === 'string') id = id.replace('/api/payments/', '')
  if (!force && (typeof state.data[id] !== 'undefined')) return

  if (state.data[id] === 'collecting') return
  else commit('updateValue', { id: id, value: 'collecting' })

  return dispatch('system/apiRequest', { path: `payments/${id}` }, { root: true })
    .then((data) => {
      if (follow) {
        dispatch('cache/albums/getFromAPI', { id: data.album, follow: true }, { root: true })
        // dispatch('cache/mediaObjects/getFromAPI', { id: data.file, follow: true }, { root: true })
      }
      commit('updateValue', { id: id, value: data })
    })
}

export function getFromAPIByAlbum ({ state, commit, rootState, dispatch, rootGetters }, { album, follow = true }) {
  if (!album) return
  if (typeof album === 'string') album = album.replace('/api/albums/', '')
  const user = rootGetters['system/userData']

  return dispatch('system/apiRequest', { path: 'payments', params: { user: user.id, album } }, { root: true })
    .then((data) => {
      data = data['hydra:member'][0]
      if (!data) return
      if (follow) {
        dispatch('cache/albums/getFromAPI', { id: data.album, follow: true }, { root: true })
      }
      commit('updateValue', { id: data.id, value: data })
    })
}

export function getAllFromAPI ({ state, commit, rootState, dispatch, rootGetters }) {
  const user = rootGetters['system/userData']
  return dispatch('system/apiRequest', { path: 'payments', params: { user: user.id } }, { root: true })
    .then((data) => {
      data['hydra:member'].forEach(element => {
        dispatch('cache/albums/getFromAPI', { id: element.album, follow: true }, { root: true })
        commit('updateValue', { id: element.id, value: element })
      })
    })
}
