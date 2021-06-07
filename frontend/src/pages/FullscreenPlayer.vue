<template lang="pug">
  q-layout(view="lHh Lpr lFf" :style="pageStyle")
    q-header.bg-transparent
      q-toolbar.text-white#toolbar
        q-btn(stretch flat label="Back" icon="arrow_back" @click="$router.go(-1)" no-caps)
        q-toolbar-title
        q-btn(flat @click="drawerRight = !drawerRight" round dense icon="menu")

    q-drawer(
      side="right"
      v-model="drawerRight"
      show-if-above elevated
      :width="300"
      :breakpoint="1000"
      content-style="background-color: transparent"
      style="background-color: transparent")
      q-scroll-area(class="fit" :style="drawerStyle")
        q-list(:dark="backgroundDark")
          q-item-label(header) Playlist
          PlaylistItem(v-for="(song, index) in playlistData" :key="'playlist_item_'+index" :index="index" :songdata="song" noimage)
          q-item(v-if="playlistData.length == 0")
            q-item-section Empty

    q-page-container
      q-page.flex.justify-center
        div(style="max-width:600px; width:100%;" :class="landscape?'row':'column'")
          .col.flex.flex-center
            q-img.col.rounded-borders.shadow-1.q-mx-sm-xl.q-mx-md(:src="parsedAlbumArt" :ratio="1" v-touch-swipe.mouse.left.right="handleSwipe" )
              template(v-slot:error)
                div(class="absolute-full flex flex-center bg-grey text-white")
                  q-icon(size="100px" name="music_note")
          .col-auto.q-ma-md(:class="landscape?['flex','items-center']:[]")
            q-card(:style="controlsCardStyle")
              .q-px-md
                q-slider(v-model="progress" :min="0" :max="1" :step="0" :dark="backgroundDark" :style="sliderStyle" :disabled="!isLoaded" :readonly="!isLoaded")
              .q-px-md.row.justify-between
                .text-weight-light {{prettyDate(progress * duration)}}
                .text-weight-light {{prettyDate(duration)}}
              .q-px-md.q-pb-sm.row.items-center
                .col
                  .text-h6.text-weight-bold
                    span.q-pr-xs(v-if="hasTrackNumber") {{trackNumber}}.
                    span {{title}}
                  .text-weight-light {{artist}} - {{album}}
                q-btn.col-auto(v-if="enableWebAudio" round flat :icon="effectState ? 'blur_on' : 'blur_off'" @click.stop="toggleAudioEffect()")
                  q-tooltip(:content-style="tooltipStyle" :delay="1000") {{effectState ? 'Disable' : 'Enable'}} audio effects
                q-btn.col-auto(round flat icon="volume_up" @click.stop="")
                  q-tooltip(:content-style="tooltipStyle" :delay="1000") Volume
                  q-popup-edit(v-model="playerVolume" auto-save @before-show="volume = $howlerPlayer.getVolume()" anchor="top middle" self="top middle"
                  )
                    q-slider.q-my-md( v-model="playerVolume" :min="0" :max="1" :step="0"
                      reverse autofocus vertical dense :style="volumeSliderStyle")
                q-btn.col-auto(flat round icon="launch" @click="$router.push(currentPlayingPage)")
                  q-tooltip(:content-style="tooltipStyle" :delay="1000") Go to page
              q-separator(:dark="backgroundDark")
              q-card-section.row.justify-center
                .q-gutter-x-sm.q-gutter-sm-x-lg
                  q-btn(size="md" round outline icon="fast_rewind" @click="rewindClicked")
                  q-btn(size="lg" round outline :icon="isPlaying?'pause':'play_arrow'" @click="playClicked")
                  q-btn(size="md" round outline icon="fast_forward" @click="forwardClick")

</template>

<script>

import PlaylistItem from '../components/PlaylistItem'
import FastAverageColor from 'fast-average-color'
import { colors, date } from 'quasar'

export default {
  name: 'FullscreenPlayer',
  components: {
    PlaylistItem
  },
  data () {
    return {
      drawerRight: false,
      color: {},
      volume: 0
    }
  },
  computed: {
    isPlaying () { return this.$store.getters['audioplayer/getIsPlaying'] },
    isLoaded () { return this.$store.getters['audioplayer/getIsLoaded'] },
    playlist () { return this.$store.getters['audioplayer/getPlaylist'] },
    playlistData () { return this.$store.getters['audioplayer/getPlaylistData'] },
    currentSongData () { return this.$store.getters['audioplayer/getCurrentSong'] },
    currentPlayingPage () { return this.$store.getters['audioplayer/getPlaylistPage'] },
    albumArt () { return this.$store.getters['audioplayer/getMetaAlbumArt'] },
    parsedAlbumArt () { return this.$store.getters['system/getMediaURL'](this.albumArt) },
    artist () { return this.$store.getters['audioplayer/getMetaArtist'] },
    album () { return this.$store.getters['audioplayer/getMetaAlbum'] },
    title () { return this.$store.getters['audioplayer/getMetaTitle'] },
    trackNumber () { return this.$store.getters['audioplayer/getMetaTrackNumber'] },
    duration () { return this.$store.getters['audioplayer/getMetaDuration'] },
    effectState () { return this.$howlerPlayer.effectState },
    enableWebAudio () { return this.$store.state.system.enableWebAudio },
    playerVolume: {
      get () { return this.volume },
      set (val) {
        console.log(val)
        this.$howlerPlayer.volume(val)
      }
    },
    progress: {
      get () {
        return this.$howlerPlayer.progress / 100
      },
      set (val) {
        this.$howlerPlayer.seek(val)
      }
    },
    hasAlbumArt () {
      let returnable = false
      if (typeof this.albumArt === 'undefined') returnable = false
      else returnable = this.albumArt !== ''
      return returnable
    },
    hasTrackNumber () { return this.trackNumber > 0 },
    backgroundColor () { return (this.color && this.color.hex) ? this.color.hex : '#888888' },
    backgroundDark () { return this.color && this.color.hex && colors.luminosity(this.color.hex) > 0.3 },
    onTopColor () { return colors.lighten(this.backgroundColor, this.backgroundDark ? -70 : 70) },
    pageStyle () {
      return {
        'background-image': `linear-gradient(to bottom right, ${this.backgroundColor}, ${colors.lighten(this.backgroundColor, -50)})`
      }
    },
    controlsCardStyle () {
      console.log('controlsCardStyle', this.backgroundColor)
      return {
        color: this.backgroundDark ? 'white' : colors.lighten(this.backgroundColor, -30),
        'background-color': colors.changeAlpha(this.onTopColor, 0.7),
        'min-width': this.landscape ? '275px' : undefined
      }
    },
    drawerStyle () {
      return {
        'background-color': colors.changeAlpha(this.onTopColor, 0.7),
        'backdrop-filter': 'blur(10px)',
        color: this.backgroundDark ? 'white' : colors.lighten(this.backgroundColor, -100)
      }
    },
    sliderStyle () {
      return {
        color: this.backgroundDark ? 'white' : colors.lighten(this.backgroundColor, -30)
      }
    },
    landscape () {
      return this.$q.screen.lt.md && this.$q.screen.width > this.$q.screen.height
    },
    volumeSliderStyle () {
      return {
        color: this.backgroundColor
      }
    },
    tooltipStyle () {
      return {
        color: this.onTopColor,
        'background-color': this.backgroundDark ? 'white' : colors.lighten(this.backgroundColor, -30)
      }
    }
  },
  watch: {
    albumArt (val) {
      this.calculateBackgroundColor()
    }
  },
  methods: {
    prettyDate (timestamp) {
      return date.formatDate(date.buildDate({ minutes: 0, seconds: timestamp }), 'mm:ss')
    },
    rewindClicked () {
      this.$store.dispatch('audioplayer/goBack')
    },
    forwardClick () {
      this.$store.dispatch('audioplayer/goNext')
    },
    playClicked () {
      this.$store.dispatch('audioplayer/toggleIsPlaying')
    },
    openPlaylist () {
      this.$store.dispatch('audioplayer/collectSongInfo')
    },
    handleSwipe ({ evt, ...info }) {
      if (info.direction === 'left') this.forwardClick()
      else if (info.direction === 'right') this.rewindClicked()
    },
    calculateBackgroundColor () {
      if (!this.albumArt) return

      const fac = new FastAverageColor()
      fac.getColorAsync(this.parsedAlbumArt)
        .then(color => {
          this.color = color
        })
        .catch(e => {
          console.log(e)
        })
    },
    toggleAudioEffect () {
      this.$howlerPlayer.setAudioEffect(!this.effectState)
    }
  },
  mounted () {
    this.$store.dispatch('cache/songs/getFromAPI', { id: this.$store.getters['audioplayer/getSongID']() })
    this.calculateBackgroundColor()
  }
}
</script>

<style lang='scss'>
  #toolbar {
    background-color: #000000A0;
  }
  .q-drawer {
    background-color: transparent;
  }
</style>
