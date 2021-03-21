import SubmissionError from '../../../error/SubmissionError'
import fetch from '../../../utils/fetch'

export const resetCommon = ({ commit }, { types }) => {
  commit(types.RESET)
}

export const retrieveCommon = ({ commit, rootState }, dest, { types }) => {
  commit(types.TOGGLE_LOADING)
  const jwtToken = rootState.system.jwtToken
  return fetch(dest, undefined, jwtToken)
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

export const updateCommon = ({ commit, state, rootState }, { values, ep }, { types }) => {
  commit(types.SET_ERROR, '')
  commit(types.TOGGLE_LOADING)
  const jwtToken = rootState.system.jwtToken

  return fetch(
    { id: (state.retrieved && state.retrieved['@id']) || values['@id'], ep },
    {
      method: 'PUT',
      headers: new Headers({ 'Content-Type': 'application/ld+json' }),
      body: JSON.stringify(values)
    },
    jwtToken
  )
    .then((response) => response.json())
    .then((data) => {
      commit(types.TOGGLE_LOADING)
      commit(types.SET_UPDATED, data)
    })
    .catch((e) => {
      commit(types.TOGGLE_LOADING)

      if (e instanceof SubmissionError) {
        commit(types.SET_VIOLATIONS, e.errors)
        // eslint-disable-next-line
        commit(types.SET_ERROR, e.errors._error)

        return
      }

      // eslint-disable-next-line
      commit(types.SET_ERROR, e.message)
    })
}
