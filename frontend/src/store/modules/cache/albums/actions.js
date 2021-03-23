// Albums

import fetch from '../../../../utils/fetch'
import { ENTRYPOINT } from '../../../../config/1314272676_entrypoint'

export function getFromAPI({ state, commit, rootState, dispatch }, { id, follow = true, force }) {
  if (!id) return
  if (typeof id == 'string') id = id.replace("/api/albums/", "")
  if (!force && (typeof state.data[id] !== "undefined")) return

  if (state.data[id] == "collecting") return
  else commit("updateValue", { id: id, value: "collecting" })

  const jwtToken = rootState.system.jwtToken
  return fetch({ id: `albums/${id}`, ep: ENTRYPOINT, jwtToken })
    .then((response) => response.json())
    .then((data) => {
      if (follow) {
        dispatch("cache/mediaObjects/getFromAPI", { id: data.albumArt, follow: true }, { root: true })
      }
      commit("updateValue", { id: id, value: data })
    })
}

export function getAllFromAPI({ state, commit, rootState, dispatch }) {
  const jwtToken = rootState.system.jwtToken
  return fetch({ id: "albums", ep: ENTRYPOINT, jwtToken })
    .then((response) => response.json())
    .then((data) => {
      data['hydra:member'].forEach(element => {
        dispatch("cache/mediaObjects/getFromAPI", { id: element.albumArt, follow: true }, { root: true })
        commit("updateValue", { id: element.id, value: element })
      });
    })
}