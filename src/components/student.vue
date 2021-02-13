<template>
  <div class="student">
    <head-top head-title="学员风采" go-back="true"></head-top>
    <h3>学员图册</h3>
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
          url:require("@/assets/images/IMG_20.jpg"),
        },
         {
          url:require("@/assets/images/IMG_27.jpg"),
        }, {
          url:require("@/assets/images/IMG_28.jpg"),
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
.student {
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
