<template>
    <transition name = "fade">
        <div
        v-if = 'canPlayed && lrcSwitch'
        ref = 'suspendLyric'
        id="suspend-lyric"
        @touchstart = 'touchstart'
        @touchmove.prevent = 'touchmove'
        @touchend = 'touchend'>
            <span class = 'close' @click = 'close'></span>
            <p :style = '{color: firstLrc.index === curLrcIndex ? lrcColor.activeColor : lrcColor.defaultColor}'>{{ firstLrc.curLrc }}</p>
            <p :style = '{color: nextLrc.index === curLrcIndex ? lrcColor.activeColor : lrcColor.defaultColor}'>{{ nextLrc.curLrc }}</p>
        </div>
    </transition>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        name: 'suspend-lyric',
        data() {
            return {
                isDrag: false,          // 判断是否处于拖拽中
                startX: 0,              // 鼠标按下起始位置的x坐标
                startY: 0,              // 鼠标按下起始位置的y坐标
                offsetX: 0,             // 元素在x轴上的偏移量
                offsetY: 0              // 元素在y轴上的偏移量
            };
        },
        computed: {
            ...mapState([
                'canPlayed',
                'curPlayLrcArr',
                'curLrcIndex',
                'lrcColor',
                'lrcSwitch'
            ]),
            // 边界对象
            boundary() {
                const left = 0;
                const right = document.body.offsetWidth - this.$refs.suspendLyric.offsetWidth;
                const top = 0;
                const bottom = document.body.offsetHeight - this.$refs.suspendLyric.offsetHeight;
                return {
                    left,       // 左边界
                    right,      // 右边界
                    top,        // 上边界
                    bottom      // 下边界
                };
            },
            // 第一行的歌词
            firstLrc() {
                const { curPlayLrcArr, curLrcIndex } = this;
                if(curLrcIndex === 0) {
                    return curPlayLrcArr[0];
                }
                if((curLrcIndex + 1) % 2 === 0) {
                    if(!curPlayLrcArr[curLrcIndex + 1]) {
                        return {
                            ...curPlayLrcArr[curLrcIndex],
                            index: curLrcIndex + 1,
                            curLrc: ''
                        }
                    }
                    return curPlayLrcArr[curLrcIndex + 1];
                }
                return curPlayLrcArr[curLrcIndex];
            },
            // 第二行的歌词
            nextLrc() {
                const { curPlayLrcArr, curLrcIndex } = this;
                if(curLrcIndex === 0 || curLrcIndex === 1) {
                    return curPlayLrcArr[1];
                }
                if((curLrcIndex + 1) % 2 === 1) {
                    if(!curPlayLrcArr[curLrcIndex + 1]) {
                        return {
                            ...curPlayLrcArr[curLrcIndex],
                            index: curLrcIndex + 1,
                            curLrc: ''
                        };
                    }
                    return curPlayLrcArr[curLrcIndex + 1];
                }
                return curPlayLrcArr[curLrcIndex];
            }
        },
        methods: {
            touchstart(evt) {
                this.isDrag = true;
                this.startX = evt.targetTouches[0].pageX;
                this.startY = evt.targetTouches[0].pageY;
                this.offsetX = this.$refs.suspendLyric.offsetLeft;
                this.offsetY = this.$refs.suspendLyric.offsetTop;
            },
            touchmove(evt) {
                const endX = evt.targetTouches[0].pageX;
                const endY = evt.targetTouches[0].pageY;
                let endLeft = endX - this.startX + this.offsetX;
                let endTop = endY - this.startY + this.offsetY;

                if(endLeft <= this.boundary.left) {
                    endLeft = this.boundary.left;
                }
                else if(endLeft >= this.boundary.right) {
                    endLeft = this.boundary.right;
                }
                if(endTop <= this.boundary.top) {
                    endTop = this.boundary.top;
                }
                else if(endTop >= this.boundary.bottom) {
                    endTop = this.boundary.bottom;
                }

                this.$refs.suspendLyric.style.left = endLeft + 'px';
                this.$refs.suspendLyric.style.top = endTop + 'px';
            },
            touchend() {
                this.isDrag = false;
            },
            // 关闭悬浮歌词
            close() {
                this.$store.commit('setLrcSwitch', false);
            }
        }
    }
</script>

<style lang = 'less'>
    @import (reference) '../less/mixin.less';
    #suspend-lyric {
        position: fixed;
        top: 0;
        left: 10%;
        width: 80%;
        z-index: 99;
        border-radius: 4px;
        padding: 0.2778rem;
        background-color: rgba(0, 0, 0, .5);
        .fontSize(30);
        color: #fff;
        .close {
            width: 0.4167rem;
            height: 0.4167rem;
            position: absolute;
            right: 0.2778rem;
            top: 0.2778rem;
            .bgImg("close");
            .bgImgContain;
        }
        & > p {
            height: 1rem;
            line-height: 1rem;
            &:last-child {
                text-align: right;
            }
        }
    }
</style>