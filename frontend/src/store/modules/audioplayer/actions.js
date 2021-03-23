
export function goNext({ state, commit, dispatch, getters }) {
    let newValue = state.playingIndex + 1
    let shouldPlay = true
    if (state.playlist.length === 0) newValue = -1
    else if (newValue >= state.playlist.length) {
        if (state.isRepeat === 0) shouldPlay = false
        newValue = 0
    }

    commit('setPlayingIndex', newValue)
    dispatch('songs/getFromAPI', { id: getters["getSongID"]() }, { root: true })
    commit('setIsPlaying', shouldPlay)
}

export function goBack({ state, commit, dispatch, getters }) {
    let newValue = state.playingIndex - 1
    if (state.playlist.length === 0) newValue = -1
    else if (newValue < 0) {
        newValue = state.playlist.length - 1
    }

    commit('setPlayingIndex', newValue)
    dispatch('songs/getFromAPI', { id: getters["getSongID"]() }, { root: true })
    commit('setIsPlaying', true)
}

export function goToSong({ state, commit, dispatch, getters }, index) {
    commit('setPlayingIndex', index)
    dispatch('songs/getFromAPI', { id: getters["getSongID"]() }, { root: true })
    commit('setIsPlaying', true)
}

export function toggleIsPlaying({ state, commit, dispatch, getters }) {
    const newValue = !state.isPlaying
    if (newValue) dispatch('songs/getFromAPI', { id: getters["getSongID"]() }, { root: true })
    commit('setIsPlaying', newValue)
    return newValue;
}

/**
 * 
 * @param {*} context Vuex context
 * @param {integer} songID Song id to be added to the playlist
 */
export function appendPlaylist({ state, commit, dispatch }, songID) {
    dispatch('songs/getFromAPI', { id: songID }, { root: true })
    commit('appendPlaylist', songID)
}

/**
 * 
 * @param {*} context Vuex context
 * @param {integer} songID ID of the song
 */
export function collectSongInfo({ state, dispatch }) {
    state.playlist.forEach(songID => {
        dispatch('songs/getFromAPI', { id: songID }, { root: true })
    });
}
