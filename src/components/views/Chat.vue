<template>
  <div class="container-flex">
    <div class="messages">
      <ul class='messages__list' v-if="messages">
        <li v-for="(mes, index) in messages" class="mb-4 text-xs-left messages__item" :key="index">
          <v-avatar class="red">
            <span class="white--text headline">{{mes.user.substr(0, 2)}}</span>
          </v-avatar>
          <p>{{ mes.content }}</p>
        </li>
      </ul>
    </div>
    <v-text-field
      name="input-1"
      label="Label Text"
      v-model="message.content"
      textarea
    ></v-text-field>
    <v-btn color="success" @click="sendMessage">Send</v-btn>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

let loadInterval

export default {
  name: 'Chat',
  data () {
    return {
      message: {
        content: '',
        user: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'writeMessage',
      'loadMessages'
    ]),
    sendMessage () {
      this.writeMessage(this.message)
    },
    scrollToBottom () {
      setTimeout(() => {
        const containerMessages = document.querySelector('.messages')
        const heightContainer = containerMessages.scrollHeight

        containerMessages.scrollTop = heightContainer
      }, 100)
    }
  },
  watch: {
    messages: function () {
      this.scrollToBottom()
    }
  },
  computed: {
    ...mapState([
      'messages',
      'currentUser'
    ])
  },
  mounted () {
    this.message.user = this.currentUser.pseudo

    loadInterval = setInterval(() => {
      this.loadMessages()
    }, 100)

    this.scrollToBottom()
  },
  beforeDestroyed () {
    clearInterval(loadInterval)
  }
}
</script>

<style lang='scss'>
  .container-flex {
    max-height: 100%;
    display: flex;
    flex-direction: column;
    .messages {
      min-height: 200px;
      overflow: auto;
    }

    .input-group, .btn {
      flex-shrink: 0;
    }
  }

  .input-group__input {
    border: 1px solid gainsboro;
  }
</style>
