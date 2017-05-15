<template>
	<div class="collect" :class = "{collected: $route.path.slice(1) !== 'collect' && songData.collected, deleted: $route.path.slice(1) === 'collect' && !showDetail, 'collected-detail': showDetail}" @click.stop = "collect">
		<transition name = "fade">
			<div class="tip" v-if = "showTip">{{ tip }}</div>
		</transition>
	</div>
</template>

<script>
	// 删除数组中指定值的那一项
	Array.prototype.remove = function(obj) {
		for(let [index, value] of this.entries()) {
			if(value.FileName === obj.FileName) {
				this.splice(index, 1);
			}
		}
	};

	export default {
		name: "collect",
		props: {
			songData: {
				type: Object
			},
			songList: {
				type: Array
			}
		},
		computed: {
			showDetail() {
				return this.$store.state.showDetail;
			}
		},
		data() {
			return {
				collectedArr: [],			// 用来获得localStorage中存储的数据
				tip: "",					// 点击时的提示信息
				switch: false,				// 定义一个开关，防止连续点击
				showTip: false				// 是否显示提示信息
			}
		},
		methods: {
			// 点击收藏与取消切换
			collect() {
				if(!this.switch) {
					this.switch = true;
				}
				else {
					return;
				}
				this.showTip = true;
				let routerPath = this.$route.path.slice(1);
				let collectedArr = window.localStorage.collectedArr;
				if(!collectedArr) {
					collectedArr = [];
				}
				else {
					collectedArr = JSON.parse(collectedArr);
				}
				this.collectedArr = collectedArr;

				if(routerPath === "collect") {
					this.songData.collected = false;
				}
				else {
					this.songData.collected = !this.songData.collected;
				}
				
				// 定义一个对象获得要存储的歌曲的信息
				let collectedSongInfo = {
					FileName: this.songData.FileName,
					SongName: this.songData.SongName,
					SingerName: this.songData.SingerName,
					collected: this.songData.collected
				};
				if(this.songData.collected) {
					this.tip = "已收藏";
					this.collectedArr.push(collectedSongInfo);
				}
				else {
					if(routerPath === "collect") {
						this.tip = "已删除";
						this.songList.remove(collectedSongInfo);
					}
					else {
						this.tip = "已取消收藏";
					}
					this.collectedArr.remove(collectedSongInfo);
				}
				// 存入localStorage中
				window.localStorage.collectedArr = JSON.stringify(this.collectedArr);
				setTimeout(() => {
					this.switch = false;
					this.showTip = false;
				}, 3000);
			}
		}
	}
</script>

<style lang = "less">
	@import (reference) "../assets/less/_mixin";
	.collect {
		width: 0.5833rem;
		height: 0.5rem;
		.bgImgContain;
		.bgImg("collect");
		.tip {
			left: 50%;
			top: 50%;
			position: fixed;
			font-weight: bold;
			transform: translate3d(-50%, -50%, 0);
		}
	}
	.collected-detail {
		.bgImg("collect-white");
		.tip {
			color: #fff;
		}
	}
	.collected {
		.bgImg("collected");
	}
	.deleted {
		.bgImg("delete");
	}
	.fade-enter-active, .fade-leave-active {
		transition: all .5s;
	}
	.fade-enter, .fade-leave-active {
		opacity: 0;
	}
</style>