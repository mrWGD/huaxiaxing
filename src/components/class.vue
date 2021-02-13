<template>
  <div class="class">
    <head-top head-title="课堂瞬间" go-back="true"></head-top>
    <h3>课堂图册</h3>
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
          url:require("@/assets/images/class1.png"),
        },
         {
          url:require("@/assets/images/class2.png"),
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
.class {
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
