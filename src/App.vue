<template>
  <div id="app">
    <v-jumbotron gradient="to top, #8fd3f4, #84fab0" height="200px" dark>
      <v-container fill-height>
        <v-layout align-center>
          <v-flex text-xs-center>
            <h3 class="display-3 text--white">Chat Shipup</h3>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
    <div class="main">
      <v-container fluid grid-list-md class="grid-list-md layout">
        <v-flex xs12 sm3 md2 text-xs-left>
          <v-navigation-drawer stateless permanent floating value="true">
            <v-toolbar flat>
              <v-list>
                <v-list-tile>
                  <v-list-tile-title class="title">
                    {{ $route.name }}
                  </v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-toolbar>
            <v-divider></v-divider>
            <v-list dense class="pt-0">
              <router-link :to="item.link" v-for="item in navItems" :key="item.title">
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      {{item.title}}
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </router-link>
            </v-list>
          </v-navigation-drawer>
        </v-flex>
        <v-flex xs12 sm9 md10  text-xs-center>
          <router-view/>
        </v-flex>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      navItems: [
        {
          icon: 'dashboard',
          title: 'Login',
          link: 'login'
        },
        {
          icon: 'question_answer',
          title: 'Chat',
          link: 'chat'
        }
      ]
    }
  }
}
</script>

<style lang='scss'>
  .main {
    height: calc(100vh - 200px);
  }

  .layout {
    max-height: 100%;
  }
</style>
