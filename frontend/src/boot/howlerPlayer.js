// import something here
import { Howl, Howler } from 'howler'

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({ app, router, Vue, store }) => {
  var Player = function (playlist = []) {
    this.playlist = playlist
    this.index = 0
    this.duration = ''
  }
  Player.prototype = {
    clearPlaylist: function () {
      if (this.playlist.length > 0 && this.playlist[this.index]) this.pause()
      this.playlist = []
    },
    appendPlaylist: function (item) {
      this.playlist.push(item)
    },

    /**
     * Play a song in the playlist.
     * @param  {Number} index Index of the song in the playlist (leave empty to play the first or current).
     */
    play: function (index) {
      var self = this
      var sound

      index = typeof index === 'number' ? index : self.index
      var data = self.playlist[index]

      // If we already loaded this track, use the current one.
      // Otherwise, setup and load a new Howl.
      if (data.howl) {
        sound = data.howl
      } else {
        sound = data.howl = new Howl({
          src: [data.file],
          html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
          onplay: function () {
            // Display the duration.
            self.duration = self.formatTime(Math.round(sound.duration()))

            // Start upating the progress of the track.
            requestAnimationFrame(self.step.bind(self))
          },
          onload: function () {
            // Start the wave animation.
            self.loading = 'none'
          },
          onend: function () {
            // Stop the wave animation.
            store.dispatch("audioplayer/goNext")
          },
          onpause: function () {
            // Stop the wave animation.
          },
          onstop: function () {
            // Stop the wave animation.
          },
          onseek: function () {
            // Start upating the progress of the track.
            requestAnimationFrame(self.step.bind(self))
          }
        })
      }

      // Begin playing the sound.
      sound.play()

      // Show the pause button.
      if (sound.state() === 'loaded') {

      } else {
        self.loading = 'block'
      }

      // Keep track of the index we are currently playing.
      self.index = index
    },

    /**
     * Pause the currently playing track.
     */
    pause: function () {
      var self = this

      // Get the Howl we want to manipulate.
      var sound = self.playlist[self.index].howl

      // Puase the sound.
      sound.pause()
    },

    /**
     * Skip to the next or previous track.
     * @param  {String} direction 'next' or 'prev'.
     */
    skip: function (direction) {
      var self = this

      // Get the next track based on the direction of the track.
      var index = 0
      if (direction === 'prev') {
        index = self.index - 1
        if (index < 0) {
          index = self.playlist.length - 1
        }
      } else {
        index = self.index + 1
        if (index >= self.playlist.length) {
          index = 0
        }
      }

      self.skipTo(index)
    },

    /**
     * Skip to a specific track based on its playlist index.
     * @param  {Number} index Index in the playlist.
     */
    skipTo: function (index, autoPlay = true) {
      var self = this

      // Stop the current track.
      if (self.playlist[self.index].howl) {
        self.playlist[self.index].howl.stop()
      }

      // Reset progress.
      self.progress = 0

      // Play the new track.
      if (autoPlay) self.play(index)
    },

    /**
     * Set the volume and update the volume slider display.
     * @param  {Number} val Volume between 0 and 1.
     */
    volume: function (val) {
      // Update the global volume (affecting all Howls).
      Howler.volume(val)
    },

    /**
     * Seek to a new position in the currently playing track.
     * @param  {Number} per Percentage through the song to skip.
     */
    seek: function (per) {
      var self = this

      // Get the Howl we want to manipulate.
      var sound = self.playlist[self.index].howl

      // Convert the percent into a seek position.
      if (sound.playing()) {
        sound.seek(sound.duration() * per)
      }
    },

    /**
     * The step called within requestAnimationFrame to update the playback position.
     */
    step: function () {
      var self = this

      // Get the Howl we want to manipulate.
      var sound = self.playlist[self.index].howl

      // Determine our current seek position.
      var seek = sound.seek() || 0
      self.progress = (((seek / sound.duration()) * 100) || 0)

      // If the sound is still playing, continue stepping.
      if (sound.playing()) {
        requestAnimationFrame(self.step.bind(self))
      }
    },

    /**
     * Format the time from seconds to M:SS.
     * @param  {Number} secs Seconds to format.
     * @return {String}      Formatted time.
     */
    formatTime: function (secs) {
      var minutes = Math.floor(secs / 60) || 0;
      var seconds = (secs - minutes * 60) || 0;

      return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    }
  };

  Vue.prototype.$howlerPlayer = new Player();
}
