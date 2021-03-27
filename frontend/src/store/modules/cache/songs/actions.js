// Songs

export function getFromAPI({ state, commit, rootState, dispatch }, { id, follow = true, force }) {
  if (!id) return
  if (typeof id == 'string') id = id.replace("/api/songs/", "")
  if (!force && (typeof state.data[id] !== "undefined")) return

  if (state.data[id] == "collecting") return
  else commit("updateValue", { id: id, value: "collecting" })
  
  return dispatch("system/apiRequest", { path: `songs/${id}` }, { root: true })
    .then((data) => {
      if (follow) {
        dispatch("cache/albums/getFromAPI", { id: data.album, follow: true }, { root: true })
        dispatch("cache/mediaObjects/getFromAPI", { id: data.file, follow: true }, { root: true })
      }
      commit("updateValue", { id: id, value: data })
    })
}
