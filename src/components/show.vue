<template>
  <div class="show">
    <head-top head-title="活动演出" go-back="true"></head-top>
    <h3>演出图册</h3>
    <img v-for="i in imgArr" :key="i.index" :src="i.url" lazy />
  </div>
</template>

<script>
import headTop from "src/components/header/head";

export default {
  data() {
    return {
      imgArr: [
        {
          url: require("@/assets/images/IMG_16.jpg"),
        },
        {
          url: require("@/assets/images/IMG_21.jpg"),
        },
        {
          url: require("@/assets/images/IMG_22.jpg"),
        },
      ],
    };
  },
  components: {
    headTop,
  },
  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
@import "src/style/mixin";

.show {
  padding: 1.95rem 0.3rem;
  h3 {
    @include sc(0.6rem, #333);
    line-height: 1.2rem;
    font-weight: 600;
  }
  img {
    display: block;
    width: 100%;
    margin-bottom: 0.3rem;
  }
}
</style>
