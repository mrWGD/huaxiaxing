<template>
  <div class="introduction">
    <head-top head-title="校园简介" go-back="true"></head-top>
    <img :src="url" />
    <p>华夏星元素</p>
    <p>(全称"华夏星元素舞蹈.瑜伽综合艺术中心")</p>
    <p>前身是"ZSG国际东方舞团",</p>
    <p>于2020年10月01日迁址青岛市市北区山东路138号，</p>
    <p>
      ZSG国际东方舞团始创于2010年，由周世刚老师亲手创办。
      舞团作品新颖有特色，大胆使用并融合不同的舞蹈元素，如传统埃及，现代埃及、弗拉明戈、tango、非洲融合、印度宝莱坞融合等几十种风格，每一支舞码都是由周世刚老师精心编排。
      舞团每一位成员都具有很强的实力及多年的舞台经验，曾多次获得全国肚皮舞比赛大奖。
    </p>
    <p>被誉为“青岛肚皮舞第一天团”</p>
  </div>
</template>

<script>
import headTop from "src/components/header/head";

export default {
  data() {
    return {
      url: require("@/assets/images/logo.png"),
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
.introduction {
  padding: 1.95rem 0.3rem;
  p {
    font: 300 0.6rem/1.2rem "";
    color: #333;
    text-align: center;
  }
  img {
    display: block;
    width: 100%;
    margin-bottom: 0.3rem;
  }
}
</style>
