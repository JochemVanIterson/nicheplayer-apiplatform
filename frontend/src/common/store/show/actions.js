import fetch from '../../../utils/fetch'

export const retrieveCommon = ({ commit, rootState }, id, { types }) => {
  commit(types.TOGGLE_LOADING)
  const jwtToken = rootState.system.jwtToken
  return fetch(id, undefined, jwtToken)
    .then((response) => response.json())
    .then((data) => {
      commit(types.TOGGLE_LOADING)
      commit(types.SET_RETRIEVED, data)
    })
    .catch((e) => {
      commit(types.TOGGLE_LOADING)
      commit(types.SET_ERROR, e.message)
    })
}

export const resetCommon = ({ commit }, { types }) => {
  commit(types.RESET)
}
