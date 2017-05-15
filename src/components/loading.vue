<template>
	<div class="loading" v-if = "loading"></div>
</template>

<script>
	export default {
		name: "loading",
		computed: {
			loading() {
				return this.$store.state.loading;
			}
		}
	}
</script>

<style lang = "less">
	@import (reference) "../assets/less/_mixin";
	.loading {
		top: 50%;
		left: 50%;
		z-index: 2;
		position: fixed;
		width: 1.3333rem;
		height: 1.3333rem;
		transform: translate3d(-50%, -50%, 0);
		.bgImgContain;
		.bgImg("loading", ".gif");
	}
</style>