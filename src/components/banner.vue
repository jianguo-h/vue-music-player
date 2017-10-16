<template>
	<div class="banner" @touchstart = "touchstart" @touchmove = "touchmove" @touchend = "touchend">
		<div class="banner-wrapper" ref = "bannerWrapper" :style = "{transform: 'translateX(-'+ translateX +'px)', transitionDuration: speed + 'ms'}" @transitionend = "transitionend">
			<div class="banner-item" :style = "{marginRight: itemSpacing + 'px'}" v-for = "item in items">
				<img :src = "item" width = "100%">
			</div>
		</div>
		<div class="banner-pagination" v-if = "initialItems.length > 0">
			<span :class = "{active: curPaginationIndex === index}" v-for = "(inititalItem, index) in initialItems" @click = "translate(index)"></span>
		</div>
	</div>
</template>

<script>
	const dpr = window.navigator.appVersion.match(/iphone/gi) ? Math.floor(window.devicePixelRatio) : 1;
	const bannerWrapperSize = document.body.clientWidth * dpr;

	export default {
		name: "banner",
		data() {
			return {
				initialItems: [],			// 存储图片地址的原始数组(定义这个数组主要是为了处理loop为true的情况)
				// 数组
				items: ["../../static/img/banner1.jpg", "../../static/img/banner2.jpg", "../../static/img/banner3.jpg"],
				curItemIndex: 0,			// 当前轮播的索引值	
				curPaginationIndex: 0,		// 当前分页节点的索引值
				translateX: 0,				// 需要滑动的距离
				translateOffset: 0,			// 偏移的距离
				itemSpacing: 30,			// 图片之间的间距
				speed: 500,					// 速度
				interval: 3000,				// 时间间隔
				animated: false,			// 是否有在运动
				loop: true,					// 是否循环
				startTime: 0,				// touchstart按下时的时间
				startX: 0,					// touchstart按下时的pageX
				startY: 0,					// touchstart按下时的pageY
				offsetX: 0					// 手指滑动时的偏移值
			}
		},
		// 根据loop的值初始化
		created() {
			let items = this.items;
			let firstItem = items[0];
			let lastItem = items[items.length - 1];
			if(this.loop) {
				this.items.push(firstItem);
				this.items.unshift(lastItem);
				this.speed = 0;
				this.translateOffset = (bannerWrapperSize + this.itemSpacing) * (this.curItemIndex + 1);
				this.translateX = this.translateOffset;

				for(let [index, item] of items.entries()) {
					if(index !== 0 && index !== items.length - 1) {
						this.initialItems.push(item);
					}
				}
			}
			else {
				for(let item of items) {
					this.initialItems.push(item);
				}
			}
		},
		// 自动播放
		mounted() {
			setInterval(() => {
				this.next();
			}, this.interval);
		},
		methods: {
			touchstart(e) {
				this.startTime = new Date().getTime();
				this.startX = e.targetTouches[0].pageX;
				this.startY = e.targetTouches[0].pageY;
			},
			touchmove(e) {
				if(this.animated) return;
				let endX = e.targetTouches[0].pageX;
				let endY = e.targetTouches[0].pageY;
				this.offsetX = endX - this.startX;

				this.speed = 0;
				this.translateX = -this.offsetX + (bannerWrapperSize + this.itemSpacing) * this.curItemIndex + this.translateOffset;
			},
			touchend(e) {
				let endX = e.changedTouches[0].pageX;
				let offsetTime = new Date().getTime() - this.startTime;
				let boundary = offsetTime <= 500 ? 50 : bannerWrapperSize / 2;

				if(this.offsetX >= boundary) {
					this.prev();
				}
				else if(this.offsetX < -boundary) {
					this.next();
				}
				else {
					this.translate(this.curItemIndex);
				}
			},
			// 下一张
			next() {
				if(this.animated) return;
				let itemsLen = this.items.length;
				this.curItemIndex++;
				if(!this.loop && this.curItemIndex > itemsLen - 1) {
					this.curItemIndex = 0;
				}
				this.translate(this.curItemIndex);
			},
			// 上一张
			prev() {
				if(this.animated) return;
				let itemsLen = this.items.length;
				this.curItemIndex--;			
				if(!this.loop && this.curItemIndex < 0) {
					this.curItemIndex = itemsLen - 1;
				}
				this.translate(this.curItemIndex);
			},
			// 滑动
			translate(curItemIndex) {
				this.animated = true;
				this.speed = 500;
				this.translateX = (bannerWrapperSize + this.itemSpacing) * curItemIndex + this.translateOffset;
				this.setPagination(curItemIndex);
			},
			// 设置分页的样式
			setPagination(curItemIndex) {
				let initialLen = this.initialItems.length;
				this.curPaginationIndex = curItemIndex;
				if(this.loop && curItemIndex < 0) {
					this.curPaginationIndex = initialLen - 1;
				}
				else if(this.loop && curItemIndex === initialLen) {
					this.curPaginationIndex = 0;
				}
			},
			// 动画结束后处理
			transitionend() {
				this.offsetX = 0;
				this.speed = 0;
				this.animated = false;
				let itemsLen = this.items.length;
				if(this.loop) {
					if(this.curItemIndex >= itemsLen - 2) {
						this.curItemIndex = 0;
					}
					else if(this.curItemIndex === -1) {
						this.curItemIndex = itemsLen - 3;
					}	
					this.translateX = (bannerWrapperSize + this.itemSpacing) * this.curItemIndex + this.translateOffset;
				}
			}
		}
	}
</script>

<style lang = "less">
	.banner {
		overflow: hidden;
		position: relative;
		margin: 0 auto;
		.banner-wrapper {
			display: flex;
			transition: all .5s;
			.banner-item {
				width: 100%;
				flex-shrink: 0;
			}
		}
		.banner-pagination {
			width: 100%;
			text-align: center;
			position: absolute;
			bottom: 0.1389rem;
			& > span {
				margin: 0 0.1667rem;
				width: 0.2222rem;
				height: 0.2222rem;
				display: inline-block;
				background-color: #2ca2f9;
				border-radius: 100%;
				&.active {
					background-color: #d1c90e;
				}
			}
		}
	}
</style>