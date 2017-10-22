<template>
    <div id = "app">
        <loading></loading>
        <v-header></v-header>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <player></player>
    </div>
</template>

<script>
    import header from './components/header';
    import loading from './components/loading';
    import player from './components/player';
    export default {
        name: 'app',
        components: {
            'v-header': header,
            loading,
            player
        }
    }
</script>

<style lang = "less">
    @import "./less/reset.less";
</style>