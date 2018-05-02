<template>
  <div>
    <div v-if="currentUser">
      <p class="mt-3">You are already connected {{currentUser.pseudo}}</p>
      <v-btn class="mt-4" color="red" @click="logout">Logout</v-btn>
    </div>
    <div v-else>
      <p>Choose your user and enter your password</p>
      <v-avatar
        @click="selectUser(user)"
        :class="userSelected.pseudo == user.pseudo ? 'indigo' : 'red'"
        v-for="(user, index) in users"
        :key="index"
      >
        <span class="white--text headline">{{user.pseudo.substr(0, 2)}}</span>
      </v-avatar>
      <v-text-field
        name="password"
        label="Enter your password"
        v-model="userSelected.password"
        :append-icon="e1 ? 'visibility_off' : 'visibility'"
        :append-icon-cb="() => (e1 = !e1)"
        :type="e1 ? 'password' : 'text'"
      ></v-text-field>
    </div>
    <v-btn color="success" @click="checkIdentity">Access to chat</v-btn>
  </div>
</template>

<script>
import User from '@/utils/User'
import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      e1: true,
      users: [],
      pseudo: '',
      userSelected: {
        pseudo: '',
        password: ''
      }
    }
  },
  mounted () {
    const Hugo = new User('Hugo', 'HugoHugo')
    const Pierre = new User('Pierre', 'PierrePierre')
    const Jean = new User('Jean', 'JeanJean')

    this.users = [Hugo, Pierre, Jean]
  },
  methods: {
    ...mapActions([
      'login',
      'logout'
    ]),
    selectUser (user) {
      this.userSelected.pseudo = user.pseudo
    },
    checkIdentity () {
      if (this.currentUser) {
        return this.$router.push('Chat')
      } else {
        let userSelect = this.users.find((user) => {
          return JSON.stringify(this.userSelected) === JSON.stringify(user)
        })

        if (userSelect) {
          this.login(userSelect)
          this.$router.push('Chat')
        } else {
          alert('please enter good email')
        }
      }
    }
  },
  computed: {
    ...mapState([
      'currentUser'
    ])
  }
}
</script>

<style lang='scss'>
  .input-group__input {
    border-bottom: 1px solid gainsboro;
  }
</style>
