// MediaObjects

import fetch from '../../../../utils/fetch'
import { ENTRYPOINT } from '../../../../config/1314272676_entrypoint'

export function getFromAPI({ state, commit, rootState, dispatch }, { id, follow = true, force }) {
  if (!id) return
  if (typeof id == 'string') id = id.replace("/api/media_objects/", "")
  if (!force && (typeof state.data[id] !== "undefined")) return

  commit("updateValue", { id: id, value: { id } })
  const jwtToken = rootState.system.jwtToken
  return fetch({ id: `media_objects/${id}`, ep: ENTRYPOINT, jwtToken })
    .then((response) => response.json())
    .then((data) => {
      if (follow) {
        // Nothing to follow
      }
      commit("updateValue", { id: id, value: data })
    })
}
