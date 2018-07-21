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

<script>
  import header from "./components/header";
  import player from "./components/player";
  import suspendLyric from "./components/suspend-lyric";
  export default {
    name: "app",
    components: {
      "v-header": header,
      "suspend-lyric": suspendLyric,
      player
    }
  };
</script>

<style lang = "less">
  @import "./less/reset.less";
  #app {
    padding-top: 2.6944rem;
  }
</style>