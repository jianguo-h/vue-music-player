<template>
	<div class="header">
		<div class="header-search">
			<div class="logo"></div>
			<div class="search-form">
				<input v-model = "keyword" @keyup = "keyup($event, keyword)" type="text" placeholder="歌手/歌名" />
				<div class="search-list" v-if = "keyword !== ''">
					<ul>
						<li v-for = "data in RecordDatas" @click = "search(data.HintInfo)">{{ data.HintInfo }}</li>
					</ul>
					<p v-if = "RecordCount === 0">暂无结果...</p>
				</div>
			</div>
			<div class="search" @click = "search(keyword)"></div>
		</div>
		<div class="header-tab" v-if = "$route.path.slice(1) !== 'search'">
			<ul>
				<li v-for = "tab in tabArr">
					<router-link :to = "tab.routerPath">{{ tab.tabName }}</router-link>
				</li>
			</ul>
		</div>
		<div class="header-search-result" v-if = "$route.path.slice(1) === 'search'">
			<div class="goback" @click = "$router.go(-1)"></div>
			<div class="searchCount">共有<em>{{ searchCount }}</em>条结果</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "header",
		data() {
			return {
				keyword: "",
				RecordCount: null,
				RecordDatas: null,
				tabArr: [
					{
						routerPath: "new",
						tabName: "新歌"
					},
					{
						routerPath: "recommend",
						tabName: "推荐"
					},
					{
						routerPath: "local",
						tabName: "本地"
					},
					{
						routerPath: "collect",
						tabName: "已收藏"
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
				if(!keyword || keyword.trim() === "") {
					alert("请输入关键字！");
					return;
				};
				this.$router.push({
					path: "/search",
					query: {
						keyword
					}
				});	
				this.keyword = "";
			},
			// 搜索框keyup事件, keyword为关键字
			keyup(e, keyword) {
				if(!keyword || keyword.trim() === "") {
					this.RecordCount = null;
					this.RecordDatas = null;
					return;
				};
				if(e.keyCode === 13) {
					this.search(keyword);
				}
				this.$http.get("/searchtip", {
					params: {
						keyword,
						MusicTipCount: 7
					}
				}).then(res => {
					let data = JSON.parse(res.body).data[0];
					this.RecordCount = data.RecordCount;
					this.RecordDatas = data.RecordDatas;
				}, res => {
					alert("暂无此搜索结果！");
				});
			}
		}
	}
</script>

<style lang = "less">
	@import (reference) "../assets/less/_mixin";

	.header {
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