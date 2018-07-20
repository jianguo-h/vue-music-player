<template>
    <div class="content">
        <banner v-if = "routerPath === 'new'"></banner>
        <div class = "list" :class = "[routerPath + '-songList', {noSongData: songList.length === 0}]">
            <ul v-if = "songList.length > 0">
                <li
                    v-for = "(song, index) of songList"
                    :key = 'index'
                    :class = "{active: view === routerPath && index === curPlayIndex && isPlayed}"
                    @click = "play(index)"
                >
                    <p class = "filename">{{ song.FileName }}</p>
                </li>
            </ul>
            <p v-else>暂无数据！</p>
        </div>
    </div>
</template>

<script>
    import banner from "./banner";
    import { mapState } from "vuex";

    export default {
        name: "list",
        data() {
            return {
                songList: [],       // 存储歌曲列表的数组
                page: 1,            // 加载的页数
                totalPage: 0,       // 总页数
                allLoaded: false,   // 数据是否全部加载完毕
                isLoading: false    // 是否处于加载中
            }
        },
        computed: {
            ...mapState([
                "curPlayIndex",
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
        mounted() {
            // 防止多次绑定
            document.onscroll = null;
            document.onscroll = () => {
                if(this.routerPath === 'search') {
                    this.scrollLoad();
                }
            }
        },
        watch: {
            "$route": "getList"
        },
        methods: {
            // 渲染列表数据
            getList() {
                const routerPath = this.routerPath;
                this.$Indicator.open('加载中...');
                if(routerPath === "search") {
                    this.songList = [];
                    this.searchList();
                }
                else {
                    this.api.getList(routerPath).then(res => {
                        console.log('>>> [res] 渲染列表数据', res);
                        if(res.status === 200 && res.statusText === 'OK') {
                            this.songList = res.data.data.slice(0) || [];
                            this.$Indicator.close();
                        }
                        else {
                            this.songList = [];
                            this.$Toast({
                                message: '获取歌曲列表失败',
                                duration: 3
                            });
                        }
                    }).catch(err => {
                        this.$Indicator.close();
                        console.log('>>> [err] 渲染列表数据', err);
                        this.$Toast('网络出现错误或服务暂时不可用');
                    });
                }
            },
            // 根据搜索关键字得到歌曲列表
            searchList() {
                const page = this.page;
                const keyword = this.$route.query.keyword;

                this.isLoading = true;
                this.$Indicator.open('加载中...');
                this.api.getSongInfo(keyword, page).then(res => {
                    console.log('>>> [res] 获取歌曲列表', res);
                    const data = res.data.data;
                    if(res.status === 200 && res.statusText === 'OK') {
                        const searchCount = data.total;
                        this.totalPage = Math.ceil(searchCount / 20);
                        const songList = this.songList.slice(0);
                        const searchSongList = data.lists.map(song => {
                            return {
                                SingerName: song.SingerName,
                                SongName: song.SongName,
                                FileName: song.FileName
                            };
                        });
                        this.isLoading = false;
                        this.$Indicator.close();
                        this.songList = songList.concat(searchSongList);
                        this.$store.commit("setSearchCount", searchCount);
                    }
                }).catch(err => {
                    this.$Indicator.close();
                    console.log('>>> [err] 获取歌曲列表', err);
                    this.$Toast('网络出现错误或服务暂时不可用');
                });
            },
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
                if(this.isLoading || this.allLoaded) {
                    return;
                }
                const docEl = document.documentElement;
                /*
                 scrollTop 元素滚动的高度
                 scrollHeight 元素的实际高度(包括滚动的高度)
                 clientHeight 元素在窗口可见的高度(不包括滚动的高度)
                */
                const { scrollTop, scrollHeight, clientHeight } = docEl;
                const offsetHeight = scrollHeight - scrollTop - clientHeight;

                if(offsetHeight <= 100) {
                    if(this.page < this.totalPage) {
                        this.page++;
                        this.searchList();
                    }
                    else {
                        this.allLoaded = true;
                        this.$Toast('已加载全部数据！');
                    }
                }
            }
        },
        components: {
            banner
        }
    }
</script>

<style lang = "less">
    @import (reference) '../less/mixin.less';
    .content {
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