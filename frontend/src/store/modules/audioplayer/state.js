export default function () {
  return {
    /**
     * List of song ids in original order
     */
    playlist: [],

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
