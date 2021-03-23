import { MEDIAPOINT } from '../../../config/1314272676_entrypoint'

export function setIsPlaying({ state, commit, dispatch, getters }, value) {
    console.log("audioplayer:actions setIsPlaying", value)
    commit('setIsPlaying', value)
}

export function setPlayingIndex({ state, commit, dispatch, getters }, newValue) {
    commit('setPlayingIndex', newValue)
}

export function goNext({ state, commit, dispatch, getters }) {
    let newValue = state.playingIndex + 1
    let shouldPlay = true
    if (state.playlist.length === 0) newValue = -1
    else if (newValue >= state.playlist.length) {
        if (state.isRepeat === 0) shouldPlay = false
        newValue = 0
    }

    dispatch('setPlayingIndex', newValue)
    dispatch('cache/songs/getFromAPI', { id: getters["getSongID"]() }, { root: true })
    dispatch('setIsPlaying', shouldPlay)
}

export function goBack({ state, commit, dispatch, getters }) {
    let newValue = state.playingIndex - 1
    if (state.playlist.length === 0) newValue = -1
    else if (newValue < 0) {
        newValue = state.playlist.length - 1
    }

    dispatch('setPlayingIndex', newValue)
    dispatch('cache/songs/getFromAPI', { id: getters["getSongID"]() }, { root: true })
    dispatch('setIsPlaying', true)
}

export function goToSong({ state, commit, dispatch, getters }, index) {
    dispatch('setPlayingIndex', index)
    dispatch('cache/songs/getFromAPI', { id: getters["getSongID"]() }, { root: true })
    dispatch('setIsPlaying', true)
}

export function toggleIsPlaying({ state, commit, dispatch, getters }) {
    const newValue = !state.isPlaying
    if (newValue) dispatch('cache/songs/getFromAPI', { id: getters["getSongID"]() }, { root: true })
    dispatch('setIsPlaying', newValue)
    return newValue;
}

export function clearPlaylist({ commit, dispatch }) {
    commit("clearPlaylist")
}

/**
 * 
 * @param {*} context Vuex context
 * @param {integer} songID Song id to be added to the playlist
 */
export function appendPlaylist({ state, commit, dispatch, rootGetters }, songID) {
    dispatch('cache/songs/getFromAPI', { id: songID }, { root: true }).then((data) => {
        const howlerObject = {
            file: MEDIAPOINT + rootGetters['cache/songs/getObjectJoined'](songID).file.contentUrl
        }
        console.log("howlerObject", howlerObject)
    })
    commit('appendPlaylist', songID)
}

/**
 * 
 * @param {*} context Vuex context
 * @param {integer} songID ID of the song
 */
export function collectSongInfo({ state, dispatch }) {
    state.playlist.forEach(songID => {
        dispatch('cache/songs/getFromAPI', { id: songID }, { root: true })
    });
}
