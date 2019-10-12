<template>
  <div class="play-operate" :class="{ 'play-detail': showDetail }">
    <span class="prev" @click="changePlay('prev')"></span>
    <span
      class="play"
      :class="{ pause: paused }"
      @click="togglePlayState"
    ></span>
    <span class="next" @click="changePlay('next')"></span>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class PlayOperate extends Vue {
  get paused() {
    return this.$store.state.paused;
  }

  get showDetail() {
    return this.$store.state.showDetail;
  }

  get curPlayIndex() {
    return this.$store.state.curPlayIndex;
  }

  // 切换状态 play or paused
  togglePlayState() {
    this.$store.commit('setPaused');
  }

  // 切歌 上一首 or 下一首
  changePlay(operate: 'prev' | 'next') {
    let curPlayIndex = this.curPlayIndex;
    operate === 'next' ? curPlayIndex++ : curPlayIndex--;

    this.$store.commit('setCurPlayIndex', curPlayIndex);
    // this.$store.commit("setLock", false);
    this.$store.dispatch('playSong');
  }
}
</script>

<style lang="less">
@import (reference) '../less/mixin.less';
.play-operate {
  & > span {
    display: inline-block;
    width: 0.6944rem;
    height: 0.6944rem;
    .bgImgContain;
  }
  .prev {
    .bgImg('icon-prev');
  }
  .play {
    margin: 0 0.3333rem;
    .bgImg('icon-play');
  }
  .pause {
    .bgImg('icon-pause');
  }
  .next {
    .bgImg('icon-next');
  }
}
.play-detail {
  flex: 1;
  text-align: center;
  padding: 0.2778rem 0;
  & > span {
    width: 0.9167rem;
    height: 0.9167rem;
    vertical-align: middle;
  }
  .prev {
    .bgImg('play-prev');
  }
  .play {
    margin: 0 0.5556rem;
    width: 1.25rem;
    height: 1.25rem;
    .bgImg('play-play');
  }
  .pause {
    .bgImg('play-pause');
  }
  .next {
    .bgImg('play-next');
  }
}
</style>
