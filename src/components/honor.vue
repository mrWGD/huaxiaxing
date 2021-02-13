<template>
  <div class="honor">
    <head-top head-title="奖项荣誉" go-back="true"></head-top>
    <h3>荣誉图册</h3>
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
          url:require("@/assets/images/honor.jpg"),
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
.honor {
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
