<template>
    <transition name = "move">
        <div class="playDetail" :style = "{'background-image': 'url(' + curPlayImgSrc + ')'}" v-if = "showDetail">
            <div class="playDetail-mark"></div>
            <div class="playDetail-top">
                <div class="goback" @click = "$store.commit('setShowDetail', false)"></div>
                <div class="playDetail-title">{{ curPlayFileName }}</div>
            </div>
            <div class="playDetail-center">
                <div class="lrc-box" ref = "lrcBox" :style = "{transform: 'translateY(-' + translateY + 'px)', color: defaultColor}">
                    <p :style = "{color: curLrcIndex === index ? activeColor : ''}" :startTime = "lrcObj.startTime" v-for = "(lrcObj, index) in curPlayLrcArr">{{ lrcObj.curLrc }}</p>
                </div>
            </div>
            <div class="playDetail-bottom">
                <div class="collect-box">
                    <!-- <collect v-if = "view !== 'collect' && showDetail" :songList = "songList" :songData = "songData"></collect> -->
                </div>
                <div class="lrcColor-box">
                    <div class="cur-lrcColor" :style = "{backgroundImage: 'url('+ currentImgSrc +')'}" @click = "isShowColorList = !isShowColorList"></div>
                    <transition name = "fade">
                        <div class="color-list" v-if = "isShowColorList">
                            <ul>
                                <li v-for = "(currentObj, index) in lrcColorList" :style = "{backgroundImage: 'url('+ currentObj.currentImgSrc +')'}" @click = "changeLrcColor(index)"></li>
                            </ul>
                        </div>
                    </transition>
                </div>
                <div class="time-wrap">
                    <div class="start-time">{{ curPlayTime | formatDate }}</div>
                    <div class="progress-wrap">
                        <div class="progress-bar" @click = "updateProgress" ref = "progressBar"></div>
                        <div class="progress" :style = "{width: progress + '%'}"></div>
                        <div class="progress-dot" ref = "progressDot" :style = "{'margin-left': progress + '%'}"></div>
                    </div>
                    <div class="end-time">{{ endTime | formatDate }}</div>
                </div>
                <div class="play-operateBox">
                    <div class="listen-mode order-play" :class = "modeType + '-play'" @click = "switchMode">
                        <transition name = "fade">
                            <div class="mode-tip" v-if = "showModeTip">{{ modeTip }}</div>
                        </transition>
                    </div>
                    <play-operate></play-operate>
                    <div class="list-detail">
                        <div class="icon-list" :class = "{'active-list': isShowList}" @click = "isShowList = !isShowList"></div>
                        <transition name = "fade">
                            <div class="play-list" v-if = "isShowList">
                                <ul>
                                    <li v-for = "(songData, index) in songList" :class = "{active: curPlayIndex === index}" @click = "playSong(index)">
                                        {{ index + 1 }}. {{ songData.FileName }}
                                    </li>
                                </ul>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    // import collect from "./collect";
    import playOperate from "./play-operate";
    import { mapState, mapGetters } from "vuex";

    export default {
        name: "playDetail",
        data() {
            return {
                songData: {},                   // 存储当前播放歌曲信息的对象
                isShowList: false,              // 是否显示歌曲列表
                curPlayTime: 0,                 // 当前播放时间(秒为单位)
                curLrcIndex: 0,                 // 当前歌词高亮行
                progress: 0,                    // 当前歌曲播放进度
                progressSpeed: 0,               // 进度条前进的速度
                endTime: 0,                     // 歌曲结束时间(秒为单位)
                progressTimer: null,            // 控制进度条的定时器
                rollTimer: null,                // 控制歌词滚动的定时器
                translateY: 0,                  // 歌词滚动的距离
                mode: 1,                        // 初始化播放模式的数字
                modeTip: '顺序播放',             // 播放模式提示
                showModeTip: false,             // 是否显示提示
                modeSwitch: false,              // 防止连续点击
                currentImgSrc: "",              // 当前颜色的背景图
                isShowColorList: false,         // 是否显示颜色列表
                defaultColor: "",               // 当前默认所有歌词颜色
                activeColor: "",                // 当前播放所属行的歌词颜色
                lrcColorList: [                 // 歌词颜色列表数组
                    {
                        defaultColor: "#b2f5b5",
                        activeColor: "#d1c90e",
                        currentImgSrc: "../../static/img/current-type1.png"
                    },
                    {
                        defaultColor: "#c1f3dc",
                        activeColor: "#33a3f5",
                        currentImgSrc: "../../static/img/current-type2.png"
                    },
                    {
                        defaultColor: "#a0f533",
                        activeColor: "#f32d2d",
                        currentImgSrc: "../../static/img/current-type3.png"
                    },
                    {
                        defaultColor: "#eff366",
                        activeColor: "#21d10e",
                        currentImgSrc: "../../static/img/current-type4.png"
                    },
                    {
                        defaultColor: "#efe8b2",
                        activeColor: "#d200d2",
                        currentImgSrc: "../../static/img/current-type5.png"
                    }
                ]
            }
        },
        computed: {
            ...mapState([
                "view",
                "curPlayIndex",
                "songList",
                "audio",
                "isPlayed",
                "showDetail",
                "paused",
                "curPlayImgSrc",
                "curPlayLrcArr",
                "lock",
                "modeType"
            ]),
            ...mapGetters([
                "curPlayFileName",
                "listTotal"
            ])
        },
        created() {
            let currentColorObj = "";
            let modeType = "";
            let mode = 1;
            if(window.localStorage.currentColorObj) {
                currentColorObj = JSON.parse(window.localStorage.currentColorObj);
            }
            else {
                currentColorObj = this.lrcColorList[0];
            }
            if(window.localStorage.modeType) {
                modeType = window.localStorage.modeType;
            }
            else {
                modeType = "order";
            }
            if(modeType === "loop") {
                mode = 2;
            }
            else if(modeType === "random") {
                mode = 3;
            }
            else {
                mode = 1;
            }
            this.mode = mode;
            this.$store.commit("setModeType", modeType);
            this.currentImgSrc = currentColorObj.currentImgSrc;
            this.defaultColor = currentColorObj.defaultColor;
            this.activeColor = currentColorObj.activeColor;
        },
        watch: {
            isPlayed(newIsPlayed, oldIsPlayed) {
                if(newIsPlayed) {
                    this.initPlay();
                }
            },
            paused(newPaused, oldPaused) {
                if(newPaused) {
                    this.clearTimer();
                }
                else {
                    this.progressTimer = setTimeout(() => {
                        this.progressGo();
                    }, 1000);
                    this.rollTimer = setTimeout(() => {
                        this.lrcRoll();
                    }, 100);
                }
            },
            curLrcIndex(newCurLrcIndex, oldCurLrcIndex) {
                if(!this.showDetail) return;

                const lrcBox = this.$refs.lrcBox;
                const lrcBoxHeight = lrcBox.offsetHeight;
                const childHeight = lrcBox.firstChild.offsetHeight;
                const curShowNum = Math.floor(lrcBoxHeight / childHeight);
                if(newCurLrcIndex >= curShowNum - 1) {
                    this.translateY = childHeight * (newCurLrcIndex - curShowNum + 1);
                }
                else {
                    this.translateY = 0;
                }
            }
        },
        methods: {
            // 初始化播放信息
            initPlay() {
                const songData = this.songList[this.curPlayIndex];
                this.songData = songData;
                this.progress = 0;
                this.curPlayTime = 0;
                this.audio.currentTime = 0;
                this.endTime = parseInt(this.audio.duration);
                this.progressSpeed = Number((100 / this.endTime).toFixed(2));
                if(this.progressTimer) {
                    this.clearTimer();
                }
                this.progressGo();
                this.lrcRoll();
            },
            // 时间进度条前进
            progressGo() {
                this.curPlayTime++;
                this.progress += this.progressSpeed;
                if(this.progress < 100) {
                    this.progressTimer = setTimeout(() => {
                        this.progressGo();
                    }, 1000);
                }
                else {
                    this.progress = 100;
                    this.curPlayTime = this.endTime;
                    this.dealMode();
                }
            },
            // 歌词滚动
            lrcRoll() {
                const curPlayLrcArr = this.curPlayLrcArr;
                const currentTime = Number(this.audio.currentTime.toFixed(2));

                for(let [index, curPlayLrc] of curPlayLrcArr.entries()) {
                    if(Number(curPlayLrc.startTime) >= currentTime) {
                        if(index === 0) {
                            index = 1;
                        }
                        else if(index === curPlayLrcArr.length - 1) {
                            index = curPlayLrcArr.length - 1;
                        }
                        this.curLrcIndex = index - 1;
                        break;
                    }
                    else {
                        this.curLrcIndex = curPlayLrcArr.length - 1;
                    }
                }
                if(currentTime < this.endTime) {
                    this.rollTimer = setTimeout(() => {
                        this.lrcRoll();
                    }, 100);
                }
                else {
                    return;
                }
            },
            // 点击进度条更新时间
            updateProgress(e) {
                const offsetX = e.offsetX;
                const targetWidth = this.$refs.progressBar.offsetWidth;
                this.progress = Number((offsetX / targetWidth * 100).toFixed(2));
                this.curPlayTime = parseInt((this.endTime * this.progress / 100).toFixed(2));
                this.audio.currentTime = this.curPlayTime;

                this.$store.commit("setLock", true);
            },
            // 切换播放模式
            switchMode() {
                if(this.modeSwitch) return;

                let modeType = "";
                let loop = false;
                this.mode++;
                this.modeSwitch = true;
                this.showModeTip = true;
                if(this.mode % 3 === 1) {
                    this.modeTip = "顺序播放";
                    modeType = "order";
                }
                else if(this.mode % 3 === 2) {
                    this.modeTip = "循环播放";
                    modeType = "loop";
                    loop = true;
                }
                else {
                    this.modeTip = "随机播放";
                    modeType = "random";
                }

                this.$store.commit("setLoop", loop);
                this.$store.commit("setModeType", modeType);
                window.localStorage.modeType = modeType;
                setTimeout(() => {
                    this.modeSwitch = false;
                    this.showModeTip = false;
                }, 3000);
            },
            // 歌曲结束时根据播放模式来处理
            dealMode() {
                this.$store.commit("setLock", false);
                if(this.modeType === "random") {
                    const randomIndex = Math.floor(Math.random() * this.listTotal);

                    this.$store.commit("setCurPlayIndex", randomIndex);
                    this.$store.dispatch("playSong");
                }
                else if(this.modeType === "loop") {
                    this.initPlay();
                }
            },
            // 清除定时器
            clearTimer() {
                clearTimeout(this.progressTimer);
                clearTimeout(this.rollTimer);
            },
            // 点击列表时播放歌曲
            playSong(CurPlayIndex) {
                this.$store.commit("setCurPlayIndex", CurPlayIndex);
                this.$store.dispatch("playSong");
                this.isShowList = false;
            },
            // 点击改变歌词颜色
            changeLrcColor(index) {
                const currentItem = this.lrcColorList[index];
                this.currentImgSrc = currentItem.currentImgSrc;
                this.defaultColor = currentItem.defaultColor;
                this.activeColor = currentItem.activeColor;
                this.isShowColorList = false;
                const currentColorObj = {
                    currentImgSrc: this.currentImgSrc,
                    defaultColor: this.defaultColor,
                    activeColor: this.activeColor
                }
                // 存入localStorage中
                window.localStorage.currentColorObj = JSON.stringify(currentColorObj);
            }
        },
        filters: {
            // 进度条时间过滤器
            formatDate(time) {
                let minutes = parseInt(time / 60);
                let seconds = parseInt(time % 60);
                if(minutes < 10) {
                    minutes = `0${minutes}`;
                }
                if(seconds < 10) {
                    seconds = `0${seconds}`;
                }
                return `${minutes}:${seconds}`;
            }
        },
        components: {
            'play-operate': playOperate,
            // collect
        }
    }
</script>

<style lang = "less">
    @import (reference) '../less/mixin.less';
    .playDetail, .playDetail-mark {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
    }
    .playDetail {
        display: flex;
        flex-direction: column;
        background-size: cover;
        background-color: #fff;
        background-repeat: no-repeat;
        background-position: center;
        .playDetail-top {
            position: relative;
            padding: 0.4167rem 0;
            .fontSize(30);
            .goback {
                top: 50%;
                left: 0.2778rem;
                width: 0.5556rem;
                height: 0.5556rem;
                position: absolute;
                transform: translate3d(0, -50%, 0);
                .bgImgContain;
                .bgImg("icon-goback");
            }
            .playDetail-title {
                color: #fff;
                text-align: center;
                padding: 0 0.9722rem;
            }
        }
        .playDetail-center {
            color: #fff;
            overflow: hidden;
            position: relative;
            margin: 2rem 0;
            flex: 1;
            .lrc-box {
                height: 100%;
                transition: all .5s;
                p {
                    padding: 0.1389rem 0;
                    text-align: center;
                    .fontSize(28);
                    &.current {
                        color: #d1c90e;
                    }
                }
            }
        }
        .playDetail-bottom {
            position: relative;
            .collect-box {
                position: absolute;
                left: 0.8333rem;
                top: -0.5556rem;
            }
            .lrcColor-box {
                position: absolute;
                right: 0.8333rem;
                top: -0.8333rem;
                .cur-lrcColor, .color-list li {
                    width: 0.8333rem;
                    height: 0.8333rem;
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: center;
                }
                .color-list {
                    position: fixed;
                    bottom: 4.1667rem;
                    right: 0.5556rem;
                    padding: 0.2778rem;
                    background-color: #000;
                    li {
                        margin-bottom: 0.2778rem;
                        &:last-of-type {
                            margin-bottom: 0;
                        }
                    }
                }
            }
            .time-wrap {
                color: #dcdcdc;
                display: flex;
                align-items: center;
                padding: 0 0.4167rem;
                margin: 0.2778rem 0;
                .progress-wrap {
                    flex: 1;
                    height: 0.0833rem;
                    position: relative;
                    margin: 0 0.2778rem;
                    background-color: #6c6b70;
                    .progress-bar {	
                        width: 100%;
                        height: 100%;
                        position: relative;
                        z-index: 1;
                    }
                    .progress {
                        left: 0;
                        top: 0;
                        height: 100%;
                        position: absolute;
                        background-color: #3195fd
                    }
                    .progress-dot {
                        top: 50%;
                        position: absolute;
                        width: 0.3333rem;
                        height: 0.3333rem;
                        border-radius: 100%;
                        background-color: #3195fd;
                        transform: translate3d(0, -50%, 0);
                    }
                }
            }
            .play-operateBox {
                display: flex;
                align-items: center;
                margin-bottom: 0.2778rem;
                .listen-mode {
                    width: 0.8333rem;
                    height: 0.75rem;
                    margin-left: 0.8333rem;
                    .bgImgContain;
                    .mode-tip {
                        left: 50%;
                        bottom: 18%;
                        .fontSize(22);
                        color: #d1c90e;
                        position: fixed;
                        transform: translate3d(-50%, 0, 0);
                    }
                }
                .order-play {
                    .bgImg("order-play");
                }
                .loop-play {
                    .bgImg("loop-play");
                }
                .random-play {
                    .bgImg("random-play");
                }
                .list-detail {
                    margin-right: 0.8333rem;
                    .icon-list {
                        width: 0.8333rem;
                        height: 0.8333rem;
                        .bgImgContain;
                        .bgImg("icon-list");
                    }
                    .active-list {
                        .bgImg("active-list");
                    }
                    .play-list {
                        color: #fff;
                        position: fixed;
                        right: 0.8333rem;
                        bottom: 1.9444rem;
                        width: 6.6667rem;
                        border-radius: 4px;
                        max-height: 10.0rem;
                        overflow-y: scroll;
                        background-color: rgba(0, 0, 0, .9);
                        li {
                            padding: 0.1944rem 0.2778rem;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            &.active {
                                color: #2ca2f9;
                            }
                        }
                    }
                }
            }
        }
    }
    .playDetail-mark {
        background-color: rgba(0, 0, 0, .6);
    }
    .move-enter-active, .move-leave-active {
        transition: all .5s;
    }
    .move-enter, .move-leave-active {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    } 
    .fade-enter-active, .fade-leave-active {
        transition: all .5s;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }  
</style>