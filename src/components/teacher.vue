<template>
  <div class="container">
    <head-top
      go-back="true"
      :head-title="title"
      v-if="$route.path.indexOf('teacher') !== -1"
    ></head-top>
    <ul>
      <li>
        <div class="left">
          <img :src="require('@/assets/images/zsg3.jpg')" />
          <b>周世刚</b>
          <i>(校长)</i>
        </div>
        <p class="right">
          周世刚老师是中国少数男性东方舞者中的佼佼者，有肚皮舞“抒情王子”的称号！<br />
          2016青岛BDZ国际肚皮舞嘉年华发起人；<br />
          2015 BDC全球肚皮舞节特邀授课导师；<br />
          2015 YEBD雅拉埃及肚皮舞节特邀授课导师；<br />
          全国肚皮舞名师百人榜入围导师；<br />
          华东地区首位男性肚皮舞老师；<br />
          青岛健美操会肚皮舞委员会副主任；<br />
          2013、2014中国国际海洋节艺术大赛 专业组金奖兼优秀指导教师； <br />
          CCTV-5首届全国肚皮舞电视大赛率领“炫舞东方”舞团在决赛中获得土耳其风格组冠军
        </p>
      </li>
      <li>
        <div class="left">
          <img :src="require('@/assets/images/lijing.jpg')" />
          <b>李静</b>
          <i>(东方舞老师)</i>
        </div>
        <p class="right">
          2016年起曾多次师从北欧男神伊戈尔、Lisa、乌克兰名师维尼卡等国际、国内大师学习 <br />
          2017年于北京进修学习 并于2017年北京新丝路国际东方舞大赛获得三项个人奖项<br />
          2017年南京Red Queen国际东方舞大赛获得专业鼓舞舞亚军、职业东方舞组十佳。
        </p>
      </li>
     
      <li>
        <div class="left">
          <img :src="require('@/assets/images/cici.jpg')" />
          <b>CiCi</b>
          <i>(东方舞老师)</i>
        </div>
        <p class="right">
          CiCi，高级瑜伽培训师 国家一级裁判员 <br />
          擅长芭蕾形体、纤体塑型、 Modelshow 等特色课程<br />
          2015年西海岸国际肚皮舞艺术大赛冠军<br />
          2015年中国海洋节艺术大赛东方舞组冠军<br />
          2016年CCTV《梦想中国》青少年艺术大赛特邀评委嘉宾<br />
          2016年首届BDZ国际肚皮舞大赛特邀嘉宾<br />
          2017年尼罗杯-东方舞全国大赛最具魅力奖<br />
          2017年全国全民健身操舞大赛特等奖<br />
          2017年第二届中国国际东方舞嘉年华专业组亚军<br />
          
        </p>
      </li>
      <li>
        <div class="left">
          <img :src="require('@/assets/images/lily.jpg')" />
          <b>Lily</b>
          <i>(教务老师)</i>
        </div>
        <p class="right">
          山东省第九届全民健身操舞比赛 东方舞融合风 获特金奖；<br />
          第四届禅瑜舞后国际瑜伽舞蹈大赛 中国总决赛 获最美舞娘奖；<br />
          第四届中国国际舞蹈艺术节《波斯湾甩发舞》获团体二等奖；<br />
          2018年 北京WATC 东方舞业余融合组季军，民俗组季军；<br />
          2019年 第四届Nile Cup国际东方舞职业挑战赛 Pop Song 组亚军，Shaabi
          组亚军，民俗组亚军
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import headTop from "@/components/header/head";

export default {
  data() {
    return {
      title: "师资力量",
      timer: null,
    };
  },
  components: { headTop },
  mounted() {},
  props: [],
  methods: {
    closeTip() {},
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  ul {
    width: 92%;
    height: 100%;
    margin: 3rem auto;
    li {
      height: 10rem;
      margin: 1rem auto;
      background: #fff;
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3),
        0px 0px 20px rgba(0, 0, 0, 0.1) inset;
      overflow: hidden;
      .left {
        float: left;
        img {
          display: block;
          width: 3.8rem;
          height: 6rem;
          margin: 1.2rem 0.3rem 0;
        }
        b {
          display: block;
          width: 4.3rem;
          font: 600 16px "微软雅黑";
          color: #000;
          text-align: center;
        }
        i {
          display: block;
          width: 4.3rem;
          font: 600 12px "微软雅黑";
          color: #f06;
          text-align: center;
        }
      }

      p.right {
        float: right;
        width: 10rem;
        font: 300 12px/16px "微软雅黑";
        color: #600;
        margin: 0.3rem 0rem;
      }
    }
  }
}
</style>
