<template>
	<transition name = "fade">
		<div class="player" v-if = "canPlayed">
			<div class="footer-play" :style = "{visibility: !showDetail ? 'visible' : 'hidden'}">
				<div class="footer-left" @click = "showPlayDetail">
					<div class="footer-singer" :class = "{rotate: isPlayed, paused: paused}">
						<img :src = "curPlayImgSrc" />
					</div>
					<div class = "footer-playerInfo">
						<p class = "song-name">{{ curPlaySongName }}</p>
						<p class = "singer-name">{{ curPlaySingerName }}</p>
					</div>
				</div>
				<div class="footer-right">
					<playOperate></playOperate>
				</div>
			</div>
			<!-- 播放详情组件 -->
			<keep-alive>
				<playDetail></playDetail>
			</keep-alive>
			<div class="audio">
				<audio :src = "audioSrc" :loop = "loop" @canplay = "canplay" @ended = "ended" ref = "audio"></audio>
			</div>
		</div>
	</transition>
</template>

<script>
	import playDetail from "./playDetail";
	import playOperate from "./playOperate";
	import { mapState, mapGetters } from "vuex";

	export default {
		name: "player",
		computed: {
			...mapState([
				"audioSrc",
				"canPlayed",
				"isPlayed",
				"showDetail",					
				"curPlayIndex",					
				"curPlayImgSrc",
				"paused",			
				"lock",						
				"loop",						
				"modeType"
			]),
			...mapGetters([
				"curPlaySingerName",			
				"curPlaySongName",
				"curPlayFileName"
			])
		},
		methods: {
			// 点击显示详情页
			showPlayDetail() {
				this.$store.commit("setShowDetail", true);
			},
			// 监听audio的canplay事件
			canplay() {
				if(this.lock) return;
				let audio = this.$refs.audio;
				if(audio.readyState === 4) {
					audio.play();
					this.$store.commit("setAudio", audio);
					this.$store.commit("setIsPlayed", true);
				}
			},
			// 监听audio的ended事件
			ended() {
				if(this.modeType !== "order") return;

				let curPlayIndex = this.curPlayIndex; 
				curPlayIndex++;
				this.$store.commit("setCurPlayIndex", curPlayIndex);
				this.$store.dispatch("playSong");
			}
		},
		components: {
			playOperate,
			playDetail
		}
	}
</script>

<style lang = "less">
	@import (reference) "../assets/less/_mixin";
	.footer-play {
		background-color: rgba(0, 0, 0, .8);
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 0.2778rem;
		display: flex;
		align-items: center;
		.footer-left {
			flex: 1;
			display: flex;
			.footer-singer {
				width: 1.4444rem;
				height: 1.4444rem;
				border-radius: 100%;
				overflow: hidden;
				img {
					display: block;
					width: 100%;
					height: 100%;
				}
			}
			.rotate {
				animation-name: rotate;
				animation-duration: 6s;
				animation-timing-function: linear;
				animation-iteration-count: infinite;
			}
			.paused {
				animation-play-state: paused;
			}
			.footer-playerInfo {
				flex: 1;
				color: #fff;
				margin: 0 0.2778rem;
				.fontSize(30);
				p {
					width: 4.4444rem;
					 white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis; 
				}
				.singer-name {
					color: #888;
					margin-top: 0.1389rem;
					.fontSize(26);
				}
			}
		}	
	} 
	.fade-enter-active, .fade-leave-active {
		transition: all .5s;
	}
	.fade-enter, .fade-leave-active {
		opacity: 0;
	}
	@keyframes rotate {
		form {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>