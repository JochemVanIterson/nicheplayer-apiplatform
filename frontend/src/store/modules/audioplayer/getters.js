export function getPlaylist(state) {
    return state.playlist
}
export function getPlaylistData(state, getters, rootState, rootGetters) {
    return state.playlist.map(songID => rootGetters['cache/songs/getObjectJoined'](songID))
}

export function getIsPlaying(state) {
    return state.isPlaying
}

export function getPlayingIndex(state) {
    return state.playingIndex
}

export function getPlaybackProgress(state) {
    return 0.1
}

export function getSongID(state) {
    return (index = -1) => state.playlist[(index == -1) ? state.playingIndex : index]
}

export function getCurrentSong(state, getters, rootState, rootGetters) {
    return rootGetters['cache/songs/getObjectJoined'](getters['getSongID']())
}

export function getMetaArtist (state, getters) {
    if (getters['getCurrentSong'].album) return getters['getCurrentSong'].album.artist
    else return ""
}

export function getMetaAlbum(state, getters) {
    if (getters['getCurrentSong'].album) return getters['getCurrentSong'].album.name
    return ""
}

export function getMetaTitle(state, getters) {
    return getters['getCurrentSong'].name
}

export function getMetaTrackNumber(state, getters) {
    return getters['getCurrentSong'].trackNumber
}

export function getMetaAlbumArt(state, getters) {
    if (getters['getCurrentSong'].album && getters['getCurrentSong'].album.albumArt) return getters['getCurrentSong'].album.albumArt.contentUrl
    return ""
}

export function getMetaDuration(state, getters) {
    if (getters['getCurrentSong'].album && getters['getCurrentSong'].duration) return getters['getCurrentSong'].duration
    return ""
}

export function getPlaylistPage(state) {
    return state.playlistPage
}