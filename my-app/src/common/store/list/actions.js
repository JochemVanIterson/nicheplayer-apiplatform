import fetch from '../../../utils/fetch'

export const getItemsCommon = (
  { commit, state, rootState },
  { page, ep, params },
  { types, hydraPrefix }
) => {
  commit(types.TOGGLE_LOADING)
  const jwtToken = rootState.system.jwtToken
  return fetch({ id: page, ep }, { params }, jwtToken)
    .then((response) => response.json())
    .then((data) => {
      commit(types.TOGGLE_LOADING)
      commit(types.SET_ITEMS, data[`${hydraPrefix}member`])
      commit(types.SET_VIEW, data[`${hydraPrefix}view`])
      commit(types.SET_TOTALITEMS, data[`${hydraPrefix}totalItems`])
    })
    .catch((e) => {
      commit(types.TOGGLE_LOADING)
      commit(types.SET_ERROR, e.message)
    })
}

export const getSelectItemsCommon = (
  { commit, rootState },
  { page, ep, params },
  { types, hydraPrefix }
) => {
  commit(types.TOGGLE_LOADING)
  const jwtToken = rootState.system.jwtToken
  return fetch({ id: page, ep }, { params }, jwtToken)
    .then((response) => response.json())
    .then((data) => {
      commit(types.TOGGLE_LOADING)
      commit(types.SET_SELECT_ITEMS, data[`${hydraPrefix}member`])
    })
    .catch((e) => {
      commit(types.TOGGLE_LOADING)
      commit(types.SET_ERROR, e.message)
    })
}
