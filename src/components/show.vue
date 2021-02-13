<template>
  <div class="show">
    <head-top head-title="活动演出" go-back="true"></head-top>
    <h3>演出图册</h3>
    <img v-for="i in imgArr" :key="i.index" :src="i.url" lazy/>
  </div>
</template>

<script>
import headTop from "src/components/header/head";

export default {
  data() {
    return {
      imgArr: [
        {
          url:require("@/assets/images/IMG_16.jpg"),
        },
         {
          url:require("@/assets/images/IMG_21.jpg"),
        }, {
          url:require("@/assets/images/IMG_22.jpg"),
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
.show {
  padding:1.95rem 0.3rem;
  h3{
      font:600 0.8rem/1.6rem '';
      color: #333;
  }
  img{
      display: block;
      width: 100%;
      margin-bottom: 0.3rem;
  }
}
</style>
