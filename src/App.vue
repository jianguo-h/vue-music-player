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
	import header from "./components/header";
	import player from "./components/player";
	import loading from "./components/loading";
	
	export default {
		name: 'app',
		components: {
			"v-header": header,
			player,
			loading
		}
	}
</script>

<style lang = "less">
	@import "./assets/less/reset";
	#app {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
</style>