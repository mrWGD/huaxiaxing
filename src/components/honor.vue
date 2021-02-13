<template>
  <div class="honor">
    <head-top head-title="奖项荣誉" go-back="true"></head-top>
    <h3>荣誉图册</h3>
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
          url: require("@/assets/images/honor.jpg"),
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

.honor {
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
