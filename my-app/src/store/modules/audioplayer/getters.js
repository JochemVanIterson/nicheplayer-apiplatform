import _ from "lodash"

export function getPlaylist(state) {
    return state.playlist;
}
export function getPlaylistData(state, getters) {
    return state.playlist.map(songID => getters["getSongObject"](songID));
}

export function getIsPlaying(state) {
    return state.isPlaying;
}

export function getPlayingIndex(state) {
    return state.playingIndex;
}

export function getPlaybackProgress(state) {
    return 0.1
}

export function getSongID(state) {
    return (index = -1) => state.playlist[(index == -1) ? state.playingIndex : index]
}

export function getSongObject(state, getters) {
    return (id) => {
        let songObject = _.clone(state.cache.songs[id])
        if (!songObject) return {}
        if (songObject.album) songObject.album = getters["getAlbumObject"](songObject.album.replace("/albums/", ""))
        if (songObject.file) songObject.file = getters["getMediaObject"](songObject.file.replace("/media_objects/", ""))

        return songObject
    }
}

export function getAlbumObject(state, getters) {
    return (id) => {
        let albumObject = _.clone(state.cache.albums[id])
        if (!albumObject) return {}
        if (albumObject.albumArt) albumObject.albumArt = getters["getMediaObject"](albumObject.albumArt.replace("/media_objects/", ""))
        return albumObject
    }
}

export function getMediaObject(state) {
    return (id) => {
        let mediaObject = _.clone(state.cache.mediaobjects[id])
        if (!mediaObject) return {}
        return mediaObject
    }
}

export function getCurrentSong(state, getters) {
    const songID = getters['getSongID']()
    return getters['getSongObject'](songID)
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
