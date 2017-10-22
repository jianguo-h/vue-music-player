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
    const clientWidth = document.documentElement.clientWidth;
    const dpr = window.navigator.appVersion.match(/iphone/gi) ? Math.floor(window.devicePixelRatio) : 1;
    export default {
        name: "banner",
        data() {
            return {
                initialItems: [],                // 存储图片地址的原始数组(定义这个数组主要是为了处理loop为true的情况)
                // 数组
                items: ["static/img/banner1.jpg", "static/img/banner2.jpg", "static/img/banner3.jpg"],
                curItemIndex: 0,                 // 当前轮播的索引值
                curPaginationIndex: 0,           // 当前分页节点的索引值
                translateX: 0,                   // 需要滑动的距离
                translateOffset: 0,              // 偏移的距离
                itemSpacing: 30,                 // 图片之间的间距
                speed: 500,                      // 速度
                interval: 3000,                  // 时间间隔
                animated: false,                 // 是否有在运动
                loop: true,                      // 是否循环
                startTime: 0,                    // touchstart按下时的时间
                startX: 0,                       // touchstart按下时的pageX
                startY: 0,                       // touchstart按下时的pageY
                offsetX: 0                       // 手指滑动时的偏移值
            }
        },
        computed: {
            bannerWrapperSize() {
                return clientWidth * dpr;
            }
        },
        // 根据loop的值初始化
        created() {
            this.initBanner();
        },
        // 自动播放
        mounted() {
            setInterval(() => {
                this.play();
            }, this.interval);
        },
        methods: {
            // 初始化轮播图
            initBanner() {
                const items = this.items;
                const firstItem = items[0];
                const lastItem = items[items.length - 1];
                if(this.loop) {
                    this.items.push(firstItem);
                    this.items.unshift(lastItem);
                    this.speed = 0;
                    this.translateOffset = (this.bannerWrapperSize + this.itemSpacing) * (this.curItemIndex + 1);
                    this.translateX = this.translateOffset;

                    for(const [index, item] of items.entries()) {
                        if(index !== 0 && index !== items.length - 1) {
                            this.initialItems.push(item);
                        }
                    }
                }
                else {
                    for(const item of items) {
                        this.initialItems.push(item);
                    }
                }
            },
            // touchstart事件
            touchstart(evt) {
                this.startTime = new Date().getTime();
                this.startX = evt.targetTouches[0].pageX;
                this.startY = evt.targetTouches[0].pageY;
            },
            // touchmove事件
            touchmove(evt) {
                if(this.animated) return;
                const endX = evt.targetTouches[0].pageX;
                this.offsetX = endX - this.startX;

                this.speed = 0;
                this.translateX = -this.offsetX + (this.bannerWrapperSize + this.itemSpacing) * this.curItemIndex + this.translateOffset;
            },
            // touchend事件
            touchend(evt) {
                const offsetTime = new Date().getTime() - this.startTime;
                const boundary = offsetTime <= 500 ? 50 : this.bannerWrapperSize / 2;

                if(this.offsetX >= boundary) {
                    this.play('prev');
                }
                else if(this.offsetX < -boundary) {
                    this.play();
                }
                else {
                    this.translate(this.curItemIndex);
                }
            },
            // 运动, slide 为滑动的方向
            play(slide = 'next') {
                if(this.animated) return;
                const itemsLen = this.items.length;
                slide === 'next' ? this.curItemIndex++ : this.curItemIndex--;
                if(!this.loop && this.curItemIndex > itemsLen - 1) {
                    this.curItemIndex = 0;
                }
                else if(!this.loop && this.curItemIndex < 0) {
                    this.curItemIndex = itemsLen - 1;
                }
                this.translate(this.curItemIndex);
            },
            // 滑动, curItemIndex 当前显示图片的索引值
            translate(curItemIndex) {
                this.animated = true;
                this.speed = 500;
                this.translateX = (this.bannerWrapperSize + this.itemSpacing) * curItemIndex + this.translateOffset;
                this.setPagination(curItemIndex);
            },
            // 设置分页的样式
            setPagination(curItemIndex) {
                const initialLen = this.initialItems.length;
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
                const itemsLen = this.items.length;
                if(this.loop) {
                    if(this.curItemIndex >= itemsLen - 2) {
                        this.curItemIndex = 0;
                    }
                    else if(this.curItemIndex === -1) {
                        this.curItemIndex = itemsLen - 3;
                    }
                    this.translateX = (this.bannerWrapperSize + this.itemSpacing) * this.curItemIndex + this.translateOffset;
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