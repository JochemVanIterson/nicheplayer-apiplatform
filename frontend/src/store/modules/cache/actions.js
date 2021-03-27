export function clearCache({ state, commit, rootState, dispatch }) {
    commit("cache/albums/clearCache", undefined, { root: true })
    commit("cache/mediaObjects/clearCache", undefined, { root: true })
    commit("cache/songs/clearCache", undefined, { root: true })
}