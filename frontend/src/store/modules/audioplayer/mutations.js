import Vue from 'vue'

export function clearPlaylist (state) {
  Vue.set(state, 'playlist', [])
  Vue.set(state, 'playingIndex', 0)
  Vue.set(state, 'isPlaying', false)
}

export function appendPlaylist (state, songID) {
  state.playlist.push(songID)
}

export function setIsPlaying (state, value) {
  Vue.set(state, 'isPlaying', value)
}

export function setPlayingIndex (state, value) {
  Vue.set(state, 'playingIndex', value)
}

export function setPlaylistPage (state, value) {
  Vue.set(state, 'playlistPage', value)
}
