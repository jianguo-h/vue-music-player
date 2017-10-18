<template>
    <div class="content" @scroll = "scrollLoad" ref = "content">
        <!-- <banner v-if = "routerPath === 'new'"></banner> -->
        <div class = "list" :class = "[routerPath + '-songList', {noSongData: songList.length === 0}]">
            <ul v-if = "songList.length > 0">
                <li v-for = "(song, index) in songList" :class = "{active: view === routerPath && index === curPlayIndex && isPlayed}" @click = "play(index)">
                    <p class = "filename">{{ song.FileName }}</p>
                    <!-- <collect :songData = "songData" :songList = "songList"></collect> -->
                </li>
            </ul>
            <p v-else>暂无数据！</p>
        </div>
    </div>
</template>

<script>
    import banner from "./banner";
    // import collect from "./collect";
    import { mapState } from "vuex";

    export default {
        name: "list",
        data() {
            return {
                songList: [],		// 存储歌曲列表的数组
                page: 1,			// 加载的页数
                totalPage: 0,		// 总页数
                loaded: false		// 数据是否全部加载完毕
            }
        },
        computed: {
            ...mapState([
                "curPlayIndex",
                "loading",
                "view",
                "isPlayed"
            ]),
            routerPath() {
                return this.$route.path.slice(1);
            }
        },
        created() {
            this.getList();
        },
        watch: {
            "$route": "getList"
        },
        methods: {
            // 渲染列表数据
            getList() {
                this.$store.commit("setLoading", true);
                if(this.routerPath === "search") {
                    this.songList = [];
                    this.searchList();
                }
                else if(this.routerPath === "collect") {
                    const collectedArr = window.localStorage.collectedArr;
                    if(!collectedArr) {
                        this.songList = [];
                    }
                    else {
                        this.songList = JSON.parse(collectedArr);
                    }
                    this.$store.commit("setLoading", false);
                }
                else {
                    this.api.getList(this.routerPath).then(res => {
                        console.log('>>> [res] 渲染列表数据', res);
                        if(res.status === 200 && res.statusText === 'OK') {
                            this.songList = res.data.data.slice(0) || [];
                            this.$store.commit("setLoading", false);
                            // this.initCollect();
                        }
                        else {
                            this.songList = [];
                            this.$Message.error({
                                message: '获取歌曲列表失败',
                                duration: 3
                            });
                        }
                    }).catch(err => {
                        console.log('>>> [err] 渲染列表数据', err);
                        this.$Message.error('网络出现错误或服务暂时不可用');
                    });
                }
            },
            // 根据搜索关键字得到歌曲列表
            searchList() {
                const page = this.page;
                const keyword = this.$route.query.keyword;
                this.$http.get("/songsearch", {
                    params: {
                        page,
                        keyword,
                        // pagesize: 30,
                        platform: "WebFilter",
                        userid: -1,
                        iscorrection: 1,
                        privilege_filter: 0,
                        filter: 2
                    }
                }).then(res => {
                    const data = JSON.parse(res.body).data;
                    const searchCount = data.total;
                    this.totalPage = Math.ceil(searchCount / 20);
                    for(const list of data.lists) {
                        const songObj = {
                            SingerName: list.SingerName,
                            SongName: list.SongName,
                            FileName: list.FileName
                        }
                        this.songList.push(songObj);
                    }

                    this.initCollect();
                    this.$store.commit("setLoading", false);
                    this.$store.commit("setSearchCount", searchCount);
                }, res => {
                    alert("暂无搜索结果！");
                });
            },
            // 初始化收藏
            /*initCollect() {
                let collectedArr = window.localStorage.collectedArr;
                if(collectedArr === "" || !collectedArr) return;

                collectedArr = JSON.parse(collectedArr);
                for(let [index, songData] of this.songList.entries()) {
                    for(let collectObj of collectedArr) {
                        if(songData.FileName === collectObj.FileName) {
                            let newSongData = Object.assign({}, songData, {"collected": true});
                            this.songList.splice(index, 1, newSongData);
                            break;
                        }
                    }
                }
            },*/
            // 将部分数据传给player组件
            play(CurPlayIndex) {
                const view = this.routerPath;
                const songList = this.songList;

                this.$store.commit("setView", view);
                this.$store.commit("setSongList", songList);
                this.$store.commit("setCurPlayIndex", CurPlayIndex);
                this.$store.dispatch("playSong");
            },
            // 滑动加载
            scrollLoad() {
                if(this.loading || this.loaded || this.routerPath !== "search") {
                    return;
                }
                const content = this.$refs.content;
                const scrollTop = content.scrollTop;                // 元素滚动的高度
                const scrollHeight = content.scrollHeight;          // 元素的实际高度(包括滚动的高度)
                const clientHeight = content.clientHeight;          // 元素在窗口可见的高度(不包括滚动的高度)
                const offsetHeight = scrollHeight - scrollTop - clientHeight;

                if(offsetHeight <= 100) {
                    if(this.page < this.totalPage) {
                        this.page++;
                        this.$store.commit("setLoading", true);
                        this.searchList();
                    }
                    else {
                        this.loaded = true;
                        this.$Message.info('已加载全部数据！');
                    }
                }
            }
        },
        components: {
            // collect,
            banner
        }
    }
</script>

<style lang = "less">
    @import (reference) '../less/mixin.less';
    .content {
        flex: 1;
        overflow-y: scroll;
        .list {
            ul {
                padding: 0 0.2778rem;
                li {
                    display: flex;
                    .fontSize(28);
                    padding: 0.5556rem 0.2778rem;
                    border-bottom: 1px solid #ddd;
                    align-items: center;
                    &.active {
                        color: #2ca2f9;
                    }
                    .filename {
                        flex: 1;
                    }
                }
            }
        } 
        .noSongData {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            p {
                .fontSize(32);
            }
        }
    }
</style>