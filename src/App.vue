<template>
    <div id = "app">
        <loading></loading>
        <v-header></v-header>
    </div>
</template>

<script>
    import header from './components/header';
    import loading from './components/loading';
    export default {
        name: 'app',
        components: {
            'v-header': header,
            loading
        }
    }
</script>

<style lang = "less">
    @import "./less/reset.less";
</style>