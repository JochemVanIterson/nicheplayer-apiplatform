<template lang="pug">
  q-card(:flat="flat" :bordered="bordered")
    q-item
      q-item-section
        q-item-label
          span.text Room:
          span.text-weight-bold.q-pl-xs {{roomName || room}}
    q-separator
    q-responsive(:ratio="4/3" style="max-height: 300px")
      q-scroll-area(:ref="'scrollArea_'+room")
        q-card-section(v-if="messages.length>0")
          q-chat-message(v-for="message in messagesCollapsed"
            :name="getUserMe(message.userID) ? 'me' : `${message.userdata.firstname} ${message.userdata.lastname}` "
            :sent="getUserMe(message.userID)"
            :text="message.text"
            :stamp="formatTimestamp(message.timestamp)"
            :bg-color="getUserMe(message.userID) ? 'grey-4' : 'primary'"
            :text-color="getUserMe(message.userID) ? 'black' : 'white'"
            text-sanitize
          )
        q-card-section(v-else) No messages have been send in the time that you've opened the chat. Be the first to send a message!
    q-separator
    q-card-actions.row
      q-input.col(filled v-model="textField" @keydown.enter.prevent="sendMessage" placeholder="Send a message!")
        template(v-slot:after)
          q-btn(rounded flat icon="send" label="Send" no-caps @click="sendMessage")
        
</template>

<script>
import socket from "../utils/socket";
import { date } from 'quasar'
import _ from 'lodash'

export default {
  name: 'Messenger',
  props: {
    room: String,
    roomName: String,
    flat: Boolean,
    bordered: Boolean
  },
  data () {
    return {
      messages: [],
      textField: ''
    }
  },
  computed: {
    messagesCollapsed () {
      const returnable = []
      let lastMessage = {
        userID: -1
      }
      for (const message of this.messages) {
        if (message.userID === lastMessage.userID && date.getDateDiff(message.timestamp, lastMessage.timestamp, 'minutes') < 10) {
          returnable[returnable.length - 1].text.push(message.text)
          returnable[returnable.length - 1].timestamp = message.timestamp
        } else {
          const returnableMessage = _.clone(message)
          returnableMessage.text = [message.text]
          returnable.push(returnableMessage)
        }
        lastMessage = message
      }
      return returnable
    },
    isLoggedIn () { return this.$store.getters['system/isLoggedIn'] },
    username () { return this.$store.getters['system/userName'] },
    userdata () { return this.$store.getters['system/userData'] },
    userId () { return this.$store.getters['system/userId'] },
    profilePic () { return this.$store.getters['system/userProfilePic'] }
  },
  watch: {
    isLoggedIn (val) {
      if (val) this.socketConnect()
    }
  },
  methods: {
    getUserMe (id) { return id === this.userId },
    getUserdata (id) {
      if (this.getUserMe(id)) return this.$store.getters['system/userData']
      else return {
        username: 'unknown',
        firstname: 'unknown',
        lastname: 'unknown',
        profilepic: 'https://cdn.quasar.dev/img/boy-avatar.png'
      }
    },
    formatTimestamp (timestamp) {
      if (date.getDateDiff(new Date(), timestamp, 'minutes') < 1) {
        return 'Less then a minute ago'
      } else if (date.getDateDiff(new Date(), timestamp, 'minutes') < 60) {
        return `${date.getDateDiff(new Date(), timestamp, 'minutes')} Minutes ago`
      } else if (date.getDateDiff(new Date(), timestamp, 'hours') < 2) {
        return `${date.getDateDiff(new Date(), timestamp, 'hours')} Hours ago`
      } else if (date.getDateDiff(new Date(), timestamp, 'hours') < 24) {
        return date.formatDate(timestamp, 'HH:mm')
      } else {
        return date.formatDate(timestamp, 'YYYY/MM/DD HH:mm')
      }
    },
    sendMessage () {
      if (!this.textField) return
      const sendableUserdata = {}
      sendableUserdata.id = this.userdata.id
      sendableUserdata.username = this.userdata.username
      sendableUserdata.firstname = this.userdata.firstname
      sendableUserdata.lastname = this.userdata.lastname

      const message = {
        userID: this.$store.getters['system/userId'],
        userdata: sendableUserdata,
        text: this.textField,
        timestamp: new Date()
      }
      this.messages.push(message)
      this.textField = ''
      this.$refs['scrollArea_' + this.room].setScrollPercentage(2, 200)
      socket.emit('room message', {
        room: this.room,
        content: message
      })
    },
    socketConnect () {
      socket.auth = { username: this.username };
      socket.connect();
    }
  },
  created () {
    socket.on("connect_error", (err) => {
      console.log("socket error", err)
    });
    socket.on(`room message/${this.room}`, ({ content }) => {
      this.messages.push(content)
      this.$refs['scrollArea_' + this.room].setScrollPercentage(2, 200)
    })
  },
  destroyed () {
    socket.off("connect_error");
  },
  mounted () {
    if (this.isLoggedIn) this.socketConnect()
  }

}
</script>

<style lang="scss" scoped>
</style>
