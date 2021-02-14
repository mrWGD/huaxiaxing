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

    <video
      class="video-player"
      :src="playerOptions.sources[0].src"
      controls="controls"
      width="100%"
    ></video>
    <p>{{ title }}</p>
    <div>
      <iframe
        class="iframe"
        width="100%"
        height="500"
        src="https://m.eqxiu.com/s/Ea2U1mbK"
        scrolling="no"
        frameborder="0"
        style="position: relative; top: 0.2rem;"
      ></iframe>
    </div>
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
            src: require("@/assets/mv.mp4"),
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
      title: "",
    };
  },
  mounted() {
    this.playerOptions.sources[0].src = require("@/assets/" +
      this.$route.query.id +
      ".mp4");
    this.title = this.$route.query.title;
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
    z-index: 99;
  }
  p {
    font-size: 0.68rem;
  }
}
</style>
