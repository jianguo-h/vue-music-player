<template>
    <div id="header">
        <div class="header-search">
            <div class="logo"></div>
            <div class="search-form">
                <input type = 'text' v-model = "keyword" @input = "input" @keyup.enter = 'search(keyword)' placeholder="歌手/歌名" />
                <div class="search-list" v-if = "keyword.trim() !== ''">
                    <ul v-if = 'resultCount > 0'>
                        <li v-for = "(data, index) in resultList" :key='index' @click = "search(data.HintInfo)">{{ data.HintInfo }}</li>
                    </ul>
                    <p v-else>{{ searchTip }}</p>
                </div>
            </div>
            <div class="search" @click = "search(keyword)"></div>
        </div>
        <div class="header-tab" v-if = "$route.path !== '/search'">
            <ul>
                <li v-for = "(tab, index) of tabs" :key='index'>
                    <router-link :to = "tab.path">{{ tab.name }}</router-link>
                </li>
            </ul>
        </div>
        <div class="header-search-result" v-else>
            <div class="goback" @click = "$router.go(-1)"></div>
            <div class="searchCount">共有<em>{{ searchCount }}</em>条结果</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'v-header',
        data() {
            return {
                keyword: '',                // 搜索的关键字
                resultCount: 0,             // 得到的结果数量
                resultList: [],             // 搜索得到的结果列表
                searchTip: '正在搜索...',   // 搜索时的提示信息
                tabs: [
                    {
                        path: "new",
                        name: "新歌"
                    },
                    {
                        path: "recommend",
                        name: "推荐"
                    },
                    {
                        path: "local",
                        name: "本地"
                    }
                ]
            }
        },
        computed: {
            searchCount() {
                return this.$store.state.searchCount;
            }
        },
        methods: {
            // 点击搜索事件, keyword为关键字
            search(keyword) {
                if(!keyword || keyword.trim() === '') {
                    this.$MessageBox.alert("请输入搜索内容");
                    return;
                }
                this.$router.push('/search?keyword=' + keyword);
                this.keyword = '';
            },
            // 搜索框input事件, keyword为关键字
            input() {
                const keyword = this.keyword;
                if(!keyword || keyword.trim() === '') return;

                this.resultCount = 0;
                this.searchTip = '正在搜索...';
                this.api.search(keyword).then(res => {
                    console.log('>>> [res] 根据关键字搜索', res);
                    if(res.status === 200 && res.statusText === 'OK') {
                        this.resultList = res.data.data[0].RecordDatas;
                        this.resultCount = res.data.data[0].RecordCount;
                        if(this.resultList.length <= 0) {
                            this.resultCount = 0;
                            this.searchTip = '暂无结果...';
                        }
                    }
                    else {
                        this.searchTip = '搜索出错, 请稍后重试';
                    }
                }).catch(err => {
                    this.resultCount = 0;
                    this.searchTip = '网络出现错误或服务不可用';
                    console.log('>>> [err] 根据关键字搜索', err);
                });
            }
        }
    }
</script>

<style lang = 'less'>
    @import (reference) '../less/mixin.less';

    #header {
        position: fixed;
        width: 100%;
        z-index: 10;
        top: 0;
        left: 0;
        background-color: #fff;
        .header-search {
            display: flex;
            align-items: center;
            height: 1.25rem;
            padding: 0 0.2778rem;
            background-color: #2ca2f9;
            .logo {
                width: 2.8333rem;
                height: 0.6528rem;
                .bgImg("logo");
                .bgImgContain;
            }
            .search-form {
                flex: 1;
                height: 0.7778rem;
                margin: 0.2361rem 0.2778rem;
                border: 1px solid #fff;
                border-radius: 4px;
                position: relative;
                input {
                    vertical-align: top;
                    height: 100%;
                    color: #fff;
                    &::-webkit-input-placeholder {
                        color: #fff;
                    }
                }
                .search-list {
                    position: absolute;
                    left: 0;
                    top: 0.75rem;
                    width: 100%;
                    border: 1px solid #2ca2f9;
                    border-radius: 4px;
                    background-color: #fff;
                    z-index: 10;
                    li, p {
                        padding: 0.2778rem;
                        .fontSize(28);
                    }
                }
            }
            .search {
                width: 0.4722rem;
                height: 0.4722rem;
                .bgImgContain;
                .bgImg("search");
            }
        }
        .header-tab {
            ul {
                display: flex;
                padding: 0 0.2778rem;
                li {
                    flex: 1;
                    line-height: 1.3889rem;
                    text-align: center;
                    .fontSize(32);
                    a {
                        display: block;
                        &.active {
                            border-bottom: 2px solid #33a3f5;
                            color: #33a3f5;
                        }
                    }
                }
            }
        }
        .header-search-result {
            position: relative;
            background-color: #dedede;
            .goback {
                top: 50%;
                left: 0.1389rem;
                width: 0.5556rem;
                height: 0.5556rem;
                position: absolute;
                transform: translate3d(0, -50%, 0);
                .bgImgContain;
                .bgImg("icon-goback");
            }
            .searchCount {
                color: #5d5d5d;
                line-height: 0.8889rem;
                padding-left: 0.8333rem;
                em {
                    color: #2ca2f9;
                    margin: 0 0.1389rem;
                }
            }
        }
    }
</style>