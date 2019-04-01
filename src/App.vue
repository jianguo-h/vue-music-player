<template>
  <div id="app">
    <v-header></v-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
    <suspend-lyric></suspend-lyric>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import header from "./components/header.vue";
  import player from "./components/player.vue";
  import suspendLyric from "./components/suspend-lyric.vue";

  @Component({
    components: {
      "v-header": header,
      "suspend-lyric": suspendLyric,
      player
    }
  })
  export default class App extends Vue {

  }
</script>

<style lang = "less">
  @import "./less/reset.less";
  #app {
    padding-top: 2.6944rem;
  }
</style>