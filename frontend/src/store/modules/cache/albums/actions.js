// Albums

import fetch from '../../../../utils/fetch'
import { ENTRYPOINT } from '../../../../config/1314272676_entrypoint'

export function getFromAPI({ state, commit, rootState, dispatch }, { id, joinFields = ['albumArt'], force }) {
  if (!id) return
  if (typeof id == 'string') id = id.replace("/api/albums/", "")
  if (!force && (typeof state.data[id] !== "undefined")) return

  if (state.data[id] == "collecting") return
  else commit("updateValue", { id: id, value: "collecting" })

  const jwtToken = rootState.system.jwtToken
  return fetch({ id: `albums/${id}`, ep: ENTRYPOINT, jwtToken })
    .then((response) => response.json())
    .then((data) => {
      if (joinFields.includes('albumArt')) {
        dispatch("cache/mediaObjects/getFromAPI", { id: data.albumArt, follow: true }, { root: true })
      }
      if (joinFields.includes('songs')) {
        data.songs.forEach(song => {
          console.log("getFromAPI Albums", song)
          dispatch("cache/songs/getFromAPI", { id: song }, { root: true })
        });
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