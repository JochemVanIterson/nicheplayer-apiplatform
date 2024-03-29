// Payments

export function getFromAPI ({ state, commit, rootState, dispatch }, { id, joinFields = ['song', 'user'], force }) {
  if (!id) return
  if (typeof id === 'string') id = id.replace('/api/play_histories/', '')
  if (!force && (typeof state.data[id] !== 'undefined')) return

  if (state.data[id] === 'collecting') return
  else commit('updateValue', { id: id, value: 'collecting' })

  return dispatch('system/apiRequest', { path: `play_histories/${id}` }, { root: true })
    .then((data) => {
      if (joinFields.includes('song') && data.song) {
        dispatch('cache/songs/getFromAPI', { id: data.song, joinFields: [] }, { root: true })
      }
      if (joinFields.includes('user') && data.user) {
        dispatch('cache/users/getFromAPI', { id: data.user, joinFields: [] }, { root: true })
      }
      commit('updateValue', { id: id, value: data })
    })
}

export function getFromAPIByAlbum ({ state, commit, rootState, dispatch, rootGetters }, { album, joinFields = ['song', 'user'] }) {
  if (!album) return
  if (typeof album === 'string') album = album.replace('/api/albums/', '')
  const user = rootGetters['system/userData']

  return dispatch('system/apiRequest', { path: 'play_histories', params: { user: user.id, album } }, { root: true })
    .then((data) => {
      data = data['hydra:member'][0]
      if (!data) return
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
  return dispatch('system/apiRequest', { path: 'play_histories', params: { user: user.id } }, { root: true })
    .then((data) => {
      data['hydra:member'].forEach(element => {
        if (element.song) dispatch('cache/songs/getFromAPI', { id: element.song, joinFields: [] }, { root: true })
        if (element.user) dispatch('cache/users/getFromAPI', { id: element.user, joinFields: [] }, { root: true })
        commit('updateValue', { id: element.id, value: element })
      })
    })
}

export function getAllFromAPI ({ state, commit, rootState, dispatch, rootGetters }) {
  return dispatch('system/apiRequest', { path: 'play_histories' }, { root: true })
    .then((data) => {
      data['hydra:member'].forEach(element => {
        if (element.song) dispatch('cache/songs/getFromAPI', { id: element.song, joinFields: [] }, { root: true })
        if (element.user) dispatch('cache/users/getFromAPI', { id: element.user, joinFields: [] }, { root: true })
        commit('updateValue', { id: element.id, value: element })
      })
    })
}
