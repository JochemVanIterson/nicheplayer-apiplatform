// Songs

import fetch from '../../../../utils/fetch'
import { ENTRYPOINT } from '../../../../config/1314272676_entrypoint'

export function getFromAPI({ state, commit, rootState, dispatch }, { id, follow = true, force }) {
  if (!id) return
  if (typeof id == 'string') id = id.replace("/api/songs/", "")
  if (!force && (typeof state.data[id] !== "undefined")) return

  commit("updateValue", { id: id, value: { id } })
  const jwtToken = rootState.system.jwtToken
  return fetch({ id: `songs/${id}`, ep: ENTRYPOINT, jwtToken })
    .then((response) => response.json())
    .then((data) => {
      if (follow) {
        dispatch("cache/albums/getFromAPI", { id: data.album, follow: true }, { root: true })
        dispatch("cache/mediaObjects/getFromAPI", { id: data.file, follow: true }, { root: true })
      }
      commit("updateValue", { id: id, value: data })
    })
}
