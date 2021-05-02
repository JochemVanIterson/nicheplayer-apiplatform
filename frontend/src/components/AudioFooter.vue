<template lang="pug">
  .flex(v-if="playlist.length > 0")
    q-linear-progress( :value="progress" :style="progressStyle" size="6px")
    q-toolbar(@click="$router.push('/player')" :style="footerStyle" v-touch-swipe.mouse.left.right="handleSwipe")
      .col-auto.row
        q-avatar(color="grey" rounded :icon="hasAlbumArt?undefined:'music_note'")
          img(v-if="hasAlbumArt" :src="parsedAlbumArt")
        .col.q-px-sm
          .text-weight-bold
            span.q-pr-xs(v-if="hasTrackNumber") {{trackNumber}}.
            span {{title}}
          .text-weight-light {{artist}}
      .col
      .col-auto.q-gutter-x-sm
        q-btn(round flat dense icon="open_in_full" @click.stop="$router.push('/player')")
        q-btn(round flat dense icon="volume_up" @click.stop="")
          q-popup-edit(v-model="playerVolume" auto-save @before-show="volume = $howlerPlayer.getVolume()" anchor="top middle" self="top middle")
            q-slider.q-my-md( v-model="playerVolume" :min="0" :max="1" :step="0"
              reverse autofocus vertical dense :style="volumeSliderStyle")
        q-btn(round outline dense icon="fast_rewind" v-if="$q.screen.gt.xs" @click.stop="rewindClicked")
        q-btn(round outline :icon="isPlaying?'pause':'play_arrow'" @click.stop="playClicked")
        q-btn(round outline dense icon="fast_forward" @click.stop="forwardClick")
</template>

<script>
import PlaylistItem from './PlaylistItem'
import FastAverageColor from 'fast-average-color'
import { colors } from 'quasar'

export default {
  name: 'AudioFooter',
  components: {
    PlaylistItem
  },
  data () {
    return {
      playlistVisible: false,
      color: {},
      volume: 0
    }
  },
  computed: {
    isPlaying () { return this.$store.getters['audioplayer/getIsPlaying'] },
    playlist () { return this.$store.getters['audioplayer/getPlaylist'] },
    playlistData () { return this.$store.getters['audioplayer/getPlaylistData'] },
    currentSongData () { return this.$store.getters['audioplayer/getCurrentSong'] },
    albumArt () { return this.$store.getters['audioplayer/getMetaAlbumArt'] },
    parsedAlbumArt () { return this.$store.getters['system/getMediaURL'](this.albumArt) },
    artist () { return this.$store.getters['audioplayer/getMetaArtist'] },
    album () { return this.$store.getters['audioplayer/getMetaAlbum'] },
    title () { return this.$store.getters['audioplayer/getMetaTitle'] },
    trackNumber () { return this.$store.getters['audioplayer/getMetaTrackNumber'] },
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
    playerVolume: {
      get () { return this.volume },
      set (val) {
        console.log(val)
        this.$howlerPlayer.volume(val)
      }
    },
    progressStyle () {
      return {
        color: colors.lighten(this.backgroundColor, this.backgroundDark ? -40 : 40),
        'background-color': this.backgroundColor
      }
    },
    footerStyle () {
      return {
        'background-color': this.backgroundColor,
        color: this.onTopColor
      }
    },
    volumeSliderStyle () {
      return {
        color: this.backgroundColor
      }
    },
    progress () {
      return this.$howlerPlayer.progress / 100
    }
  },
  watch: {
    albumArt (val) {
      this.calculateBackgroundColor()
    }
  },
  methods: {
    rewindClicked () {
      this.$store.dispatch('audioplayer/goBack')
    },
    forwardClick () {
      this.$store.dispatch('audioplayer/goNext')
    },
    handleSwipe ({ evt, ...info }) {
      if (info.direction === 'left') this.forwardClick()
      else if (info.direction === 'right') this.rewindClicked()
    },
    playClicked () {
      this.$store.dispatch('audioplayer/toggleIsPlaying')
    },
    openPlaylist () {
      this.$store.dispatch('audioplayer/collectSongInfo')
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
    }
  },
  mounted () {
    this.$store.dispatch('cache/songs/getFromAPI', { id: this.$store.getters['audioplayer/getSongID']() })
    this.calculateBackgroundColor()
  }
}
</script>
