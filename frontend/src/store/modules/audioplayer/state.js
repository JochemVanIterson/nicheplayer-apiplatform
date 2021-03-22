export default function () {
  return {
    /**
     * Cache of retrieved data
     */
    cache: {
      songs: [],
      albums: [],
      mediaobjects: []
    },

    /**
     * List of song ids in original order
     */
    playlist: [], // [1, 3, 5, 6, 7],

    /**
     * Index of playlist which file is playing. '-1' for unset
     */
    playingIndex: 0,

    /**
     * Weather the audio-player is playing or not
     */
    isPlaying: false,

    /**
     * Shuffle playback
     */
    isShuffle: false,

    /**
     * Repeat playback state. 0 for off, 1 for repeat all, 2 for single
     */
    isRepeat: 0
  }
}
