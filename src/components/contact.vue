<template>
  <div class="contain">
    <head-top head-title="MV" go-back="true" class="head-top"></head-top>
    <video-player
      class="video-player"
      ref="videoPlayer"
      :playsinline="true"
      :options="playerOptions"
      webkit-playsinline
      x5-playsinline
    ></video-player>
  </div>
</template>

<script>
import headTop from "src/components/header/head";

export default {
  data() {
    return {
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto",
        language: "zh-CN",
        aspectRatio: "16:9",
        fluid: true,
        sources: [
          {
            type: "video/mp4",
            src: require("@/assets/zsg.mp4"),
          },
        ],
        poster: "",
        notSupportedMessage: "此视频暂无法播放，请稍后再试",
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true, //全屏按钮
        },
      },
    };
  },
  mounted() {
    this.playerOptions.sources[0].src = require("@/assets/" +
      this.$route.query.id +
      ".mp4");
  },
  components: {
    headTop,
  },
  props: [],
  methods: {},
};
</script>

<style lang="scss" scoped>
.contain {
  overflow: hidden;

  
  .video-player {
    margin-top: 2.2rem;
  }
}
</style>
