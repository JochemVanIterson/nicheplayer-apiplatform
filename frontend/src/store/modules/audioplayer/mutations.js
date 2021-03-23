import Vue from 'vue'

export function clearPlaylist (state) {
    Vue.set(state, 'playlist', [])
}

export function appendPlaylist (state, songID) {
    state.playlist.append(songID);
}

export function setIsPlaying (state, value) {
    Vue.set(state, 'isPlaying', value)
}

export function setPlayingIndex(state, value) {
    Vue.set(state, 'playingIndex', value)
}
