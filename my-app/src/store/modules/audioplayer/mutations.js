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

export function updateSongCache(state, { id, value }) {
    Vue.set(state.cache.songs, id, value)
}
export function updateAlbumCache(state, { id, value }) {
    Vue.set(state.cache.albums, id, value)
}
export function updateMediaObjectCache(state, { id, value }) {
    Vue.set(state.cache.mediaobjects, id, value)
}