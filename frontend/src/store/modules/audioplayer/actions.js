import fetch from '../../../utils/fetch'
import { ENTRYPOINT } from "../../../config/1314272676_entrypoint";


export function goNext({ state, commit, dispatch, getters }) {
    let newValue = state.playingIndex + 1
    let shouldPlay = true
    if (state.playlist.length === 0) newValue = -1
    else if (newValue >= state.playlist.length) {
        if (state.isRepeat === 0) shouldPlay = false
        newValue = 0
    }

    commit('setPlayingIndex', newValue)
    dispatch('getSongFromAPI', getters["getSongID"]())
    commit('setIsPlaying', shouldPlay)
}

export function goBack({ state, commit, dispatch, getters }) {
    let newValue = state.playingIndex - 1
    if (state.playlist.length === 0) newValue = -1
    else if (newValue < 0) {
        newValue = state.playlist.length - 1
    }

    commit('setPlayingIndex', newValue)
    dispatch('getSongFromAPI', getters["getSongID"]())
    commit('setIsPlaying', true)
}

export function goToSong({ state, commit, dispatch, getters }, index) {
    commit('setPlayingIndex', index)
    dispatch('getSongFromAPI', getters["getSongID"]())
    commit('setIsPlaying', true)
}

export function toggleIsPlaying({ state, commit, dispatch, getters }) {
    const newValue = !state.isPlaying
    if (newValue) dispatch('getSongFromAPI', getters["getSongID"]())
    commit('setIsPlaying', newValue)
    return newValue;
}

/**
 * 
 * @param {*} context Vuex context
 * @param {integer} songID Song id to be added to the playlist
 */
export function appendPlaylist({ state, commit, dispatch }, songID) {
    dispatch('getSongFromAPI', songID)
    commit('appendPlaylist', songID)
}

/**
 * 
 * @param {*} context Vuex context
 * @param {integer} songID ID of the song
 */
export function collectSongInfo({ state, dispatch }) {
    state.playlist.forEach(songID => {
        dispatch('getSongFromAPI', songID)
    });
}

export function getSongFromAPI({ state, commit, dispatch, rootState }, songID) {
    if (typeof songID == 'string') songID = songID.replace("/api/songs/", "")
    if (state.cache.songs[songID]) return

    commit("updateSongCache", { id: songID, value: { songID } })
    const jwtToken = rootState.system.jwtToken
    return fetch({ id: `songs/${songID}`, ep: ENTRYPOINT }, undefined, jwtToken)
        .then((response) => response.json())
        .then((data) => {
            dispatch("getAlbumFromAPI", data.album)
            dispatch("getMediaObjectFromAPI", data.file)
            commit("updateSongCache", { id: songID, value: data })
        })
}

export function getAlbumFromAPI({ state, commit, dispatch, rootState }, albumID) {
    if (typeof albumID == 'string') albumID = albumID.replace("/api/albums/", "")
    if (state.cache.albums[albumID]) return

    commit("updateAlbumCache", { id: albumID, value: { albumID } })
    const jwtToken = rootState.system.jwtToken
    return fetch({ id: `albums/${albumID}`, ep: ENTRYPOINT }, undefined, jwtToken)
        .then((response) => response.json())
        .then((data) => {
            dispatch("getMediaObjectFromAPI", data.albumArt)
            commit("updateAlbumCache", { id: albumID, value: data })
        })
}

export function getMediaObjectFromAPI({ state, commit, dispatch, rootState }, mediaObjectID) {
    if (typeof mediaObjectID == 'string') mediaObjectID = mediaObjectID.replace("/api/media_objects/", "")
    if (state.cache.mediaobjects[mediaObjectID]) return

    commit("updateMediaObjectCache", { id: mediaObjectID, value: { mediaObjectID } })
    const jwtToken = rootState.system.jwtToken
    return fetch({ id: `media_objects/${mediaObjectID}`, ep: ENTRYPOINT }, undefined, jwtToken)
        .then((response) => response.json())
        .then((data) => {
            commit("updateMediaObjectCache", { id: mediaObjectID, value: data })
        })
}