<template>
    <div id = "app">
        <v-header></v-header>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <player></player>
    </div>
</template>

<script>
    import header from './components/header';
    import player from './components/player';
    export default {
        name: 'app',
        components: {
            'v-header': header,
            player
        }
    }
</script>

<style lang = "less">
    @import "./less/reset.less";
    #app {
        padding-top: 2.6944rem;
    }
</style>