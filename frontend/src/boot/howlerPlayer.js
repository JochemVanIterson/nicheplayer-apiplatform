// import something here
import { Howl, Howler } from 'howler'

// 'async' is optional
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({ app, router, Vue, store }) => {
  const emptyAudio = new Audio('init_audio.mp3')
  emptyAudio.loop = true

  const PlayerVue = new Vue({
    data: {
      playlist: [],
      index: 0,
      duration: 0,
      progress: 0,
      reverbNode: null,
      effectState: false
    },
    computed: {
      loaded () { return this.playlist[this.index] ? this.playlist[this.index].loaded : true }
    },
    methods: {
      clearPlaylist () {
        if (this.playlist.length > 0 && this.playlist[this.index]) this.pause()
        this.$set(this, 'playlist', [])
      },
      setAudioEffect (state) {
        const enableWebAudio = store.getters['system/enableWebAudio']
        if (!enableWebAudio || this.effectState === state) return
        this.effectState = state
        Howler.masterGain.disconnect()
        if (state) {
          Howler.masterGain.connect(this.reverbNode)
        } else {
          Howler.masterGain.connect(Howler.ctx.destination)
        }
      },
      appendPlaylist (item) {
        this.playlist.push(item)
      },

      initAudioEffect: async function (howl) {
        console.log(Howler, howl)
        const enableWebAudio = store.getters['system/enableWebAudio']

        const audioCtx = Howler.ctx
        if (!enableWebAudio || !audioCtx || this.reverbNode) return

        this.reverbNode = audioCtx.createConvolver()

        // load impulse response from file
        // let response = await fetch("https://www.audioware.nl/webtest/cors/vinyl/rushoutroir.wav")
        const response = await fetch('https://www.audioware.nl/webtest/cors/ir.wav')
        const arraybuffer = await response.arrayBuffer()
        this.reverbNode.buffer = await audioCtx.decodeAudioData(arraybuffer)
        this.reverbNode.connect(Howler.ctx.destination)

        console.log('Howler.masterGain', Howler.masterGain)
      },

      /**
       * Play a song in the playlist.
       * @param {Number} index Index of the song in the playlist (leave empty to play the first or current).
       */
      play (index) {
        var self = this
        const token = store.state.system.jwtToken

        var sound

        index = typeof index === 'number' ? index : self.index
        var data = self.playlist[index]

        const enableWebAudio = store.getters['system/enableWebAudio']
        // If we already loaded this track, use the current one.
        // Otherwise, setup and load a new Howl.
        if (data.howl) {
          sound = data.howl
        } else {
          console.log(data.file)
          sound = data.howl = new Howl({
            src: [data.file],
            format: 'mp3',
            html5: !enableWebAudio, // Force to HTML5 so that the audio can stream in (best for large files).
            xhr: {
              method: 'GET',
              headers: {
                Authorization: 'Bearer ' + token
              },
              withCredentials: true
            },
            onplay: function () {
              // Display the duration.
              let duration = sound.duration()
              if (!isFinite(duration)) duration = data.duration
              self.$set(self, 'duration', duration)

              // Start updating the progress of the track.
              requestAnimationFrame(self.step.bind(self))
            },
            onload: function () {
              // Start the wave animation.
              let duration = sound.duration()
              if (!isFinite(duration)) duration = data.duration
              self.$set(self, 'duration', duration)
              self.$set(data, 'loaded', true)
              console.log(data)
            },
            onend: function () {
              // Stop the wave animation.
              store.dispatch('audioplayer/goNext')
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
          this.initAudioEffect(sound)
        }

        // Begin playing the sound.
        sound.play()
        if (enableWebAudio) emptyAudio.play()
        navigator.mediaSession.playbackState = 'playing'

        if (sound.seek() === 0) store.dispatch('audioplayer/sendPlayHistory', data.id)

        // Keep track of the index we are currently playing.
        self.$set(self, 'index', index)
        self.updateMediaSession()
      },

      /**
     * Pause the currently playing track.
     */
      pause: function () {
        var self = this

        const enableWebAudio = store.getters['system/enableWebAudio']

        if (self.playlist.length === 0) return

        // Get the Howl we want to manipulate.
        var sound = self.playlist[self.index].howl

        // Puase the sound.
        if (sound) sound.pause()
        if (enableWebAudio) emptyAudio.pause()
        navigator.mediaSession.playbackState = 'paused'
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
        self.$set(self, 'progress', 0)

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

      getVolume: function () {
        return Howler.volume()
      },

      /**
       * Seek to a new position in the currently playing track.
       * @param  {Number} per Percentage through the song to skip.
       */
      seek: function (per) {
        var self = this

        // Get the Howl we want to manipulate.
        var data = self.playlist[self.index]
        var sound = data.howl

        // Convert the percent into a seek position.
        if (sound && data.duration) {
          sound.seek(data.duration * per)
        }

        if (!sound.playing()) {
          store.dispatch('audioplayer/setIsPlaying', true)
        }

        requestAnimationFrame(self.step.bind(self))
      },

      /**
       * The step called within requestAnimationFrame to update the playback position.
       */
      step: function () {
        var self = this

        // Get the Howl we want to manipulate.
        var data = self.playlist[self.index]
        if (!data) return
        var sound = data.howl
        if (!sound) return

        // Determine our current seek position.
        var seek = sound.seek() || 0
        self.$set(self, 'progress', (((seek / data.duration) * 100) || 0))

        if ('setPositionState' in navigator.mediaSession) {
          navigator.mediaSession.setPositionState({
            duration: data.duration,
            playbackRate: 1,
            position: seek
          })
        }

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
        var minutes = Math.floor(secs / 60) || 0
        var seconds = (secs - minutes * 60) || 0

        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
      },

      updateMediaSession: function () {
        if (!('mediaSession' in navigator)) return
        const id = this.playlist[this.index].id
        const data = store.getters['cache/songs/getObjectJoined'](id)
        console.log('updateMediaSession', data)
        navigator.mediaSession.metadata = new window.MediaMetadata({
          title: data.name,
          artist: data.songArtist || data.album.artist,
          album: data.album.name,
          artwork: [
            { src: data.album.albumArt.contentUrl, type: data.album.albumArt.mime }
          ]
        })
      }
    },
    created () {
      var self = this
      console.log('Howler created', Howler.usingWebAudio ? 'webaudio' : 'html')
      this.initAudioEffect()
      setInterval(() => {
        requestAnimationFrame(self.step.bind(self))
      }, 1000)

      const actionHandlers = [
        ['play', () => { store.dispatch('audioplayer/setIsPlaying', true) }],
        ['pause', () => { store.dispatch('audioplayer/setIsPlaying', false) }],
        ['previoustrack', () => { store.dispatch('audioplayer/goBack') }],
        ['nexttrack', () => { store.dispatch('audioplayer/goNext') }],
        ['seekto', (details) => {
          self.seek(details.seekTime / self.duration)
        }]
      ]

      for (const [action, handler] of actionHandlers) {
        try {
          navigator.mediaSession.setActionHandler(action, handler)
        } catch (error) {
          console.log(`The media session action '${action}' is not supported yet.`)
        }
      }
    }
  })

  Vue.prototype.$howlerPlayer = PlayerVue
}
