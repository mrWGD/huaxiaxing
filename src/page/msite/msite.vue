<template>
  <div v-loading="loading">
    <head-top signin-up="msite">
      <router-link :to="'/search/geohash'" class="link_search" slot="search">
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <circle
            cx="8"
            cy="8"
            r="7"
            stroke="rgb(255,255,255)"
            stroke-width="1"
            fill="none"
          />
          <line
            x1="14"
            y1="14"
            x2="20"
            y2="20"
            style="stroke: rgb(255, 255, 255); stroke-width: 2"
          />
        </svg>
      </router-link>
      <router-link to="/home" slot="msite-title" class="msite_title">
        <span class="title_text ellipsis">{{ msiteTitle }}</span>
      </router-link>
    </head-top>
    <div class="carousel">
      <el-carousel trigger="click" height="7.8rem">
        <el-carousel-item v-for="item in carouselArr" :key="item.index">
          <img class="logo" :src="item.url" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide food_types_container">
            <router-link
              v-for="(item, index) in navTypes"
              :key="index"
              :to="{
                path: item.path,
                query: {
                  geohash,
                },
              }"
              class="link_to_food"
            >
              <figure>
                <i :class="item.icon"></i>
                <figcaption>{{ item.title }}</figcaption>
              </figure>
            </router-link>
          </div>
        </div>
        <!-- <div class="swiper-pagination"></div> -->
      </div>
    </nav>
    <div class="free">
      <p>
        新人<b>免费</b>体验课<a href="https://form.ebdan.net/ls/DCBvggnf"
          >点击报名>></a
        >
      </p>
    </div>
    <p class="theme" style="margin: 0rem 0 0.6rem">
      <i
        class="el-icon-video-camera-solid"
        style="color: #0ff; margin-right: 0.1rem"
      ></i
      >最星MV集锦
    </p>
    <ul class="mv">
      <li v-for="i in videoArr" :key="i.index" @click="playClick(i)">
        <p><i>MV</i>{{ i.title }}</p>
        <img class="video" :src="i.url" />
      </li>
    </ul>
    <p class="theme" style="margin: 0rem 0 0.6rem">
      <i
        class="el-icon-shopping-cart-2"
        style="color: #f00; margin-right: 0.1rem"
      ></i
      >超值课程抢购
    </p>
    <ul class="buy">
      <li v-for="i in buyArr" :key="i.index">
        <img class="video" :src="i.url" @click="playClick(i)" />
        <p>{{ i.title }}</p>
        <div class="price">
          <i class="newprice">￥{{ i.newprice }}</i>
          <i class="oldprice">￥{{ i.oldprice }}</i>
          <button class="buyBtn" @click="buyClick(i.newprice)">立即抢购</button>
        </div>
        <b class="try" @click="playClick(i)"
          ><i class="el-icon-video-play"></i>免费试看</b
        >
        <el-dialog
          :title="title"
          :visible.sync="dialogVisible"
          :close-on-click-modal="false"
          :center="true"
          :show-close="false"
          width="66%"
        >
          <img class="paycode" :src="codeUrl" />
          <p style="text-align: center">长按二维码识别</p>
          <p v-if="!payShow" style="text-align: center">扫一扫添加客服微信</p>
          <p v-if="!payShow" style="text-align: center">
            核实订单信息，领取课程资料
          </p>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">{{
              payShow ? "取消" : "已添加"
            }}</el-button>
            <el-button type="primary" @click="payClick" v-if="payShow"
              >已付款</el-button
            >
          </span>
        </el-dialog>
      </li>
    </ul>

    <!-- <p :class="navBarFixed == true ? 'navBarWrap' : 'theme'">
      <i
        class="el-icon-magic-stick"
        style="color: #f09; margin-right: 0.1rem"
      ></i
      >热门视频集锦
    </p>
      <iframe
      class="iframe"
      width="100%"
      height="1050"
      :src="iframeUrl"
      scrolling="no"
      frameborder="0"
      style="margin-left: 0px; margin-top: -38px"
    ></iframe> -->

    <foot-guide v-if="footShow"></foot-guide>
    <i class="back" @click="backupClick">返回</i>
    <i class="packup" @click="packupClick"
      >{{ footShow ? "收起" : "显示" }}
      <p>底部</p></i
    >
    <img
      :src="require('@/assets/images/redbag.gif')"
      class="redbag"
      @click="redbagClick"
    />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
// import {imgBaseUrl} from 'src/config/env'
import headTop from "src/components/header/head";
import footGuide from "src/components/footer/footGuide";
import teacher from "src/components/teacher";
import shopList from "src/components/common/shoplist";
import { msiteAddress, msiteFoodTypes, cityGuess } from "src/service/getData";
import "src/plugins/swiper.min.js";
import "src/style/swiper.min.css";

export default {
  data() {
    return {
      loading: true,
      geohash: "", // city页面传递过来的地址geohash
      msiteTitle: "华夏星元素", //"请选择地址...", // msite页面头部标题
      carouselArr: [
        {
          url: require("@/assets/images/logo.png"),
        },
        {
          url: require("@/assets/images/IMG_16.jpg"),
        },
        {
          url: require("@/assets/images/IMG_30.jpg"),
        },
      ],
      navTypes: [
        {
          icon: "el-icon-star-off",
          title: "师资力量",
          path: "/teacher",
        },
        {
          icon: "el-icon-view",
          title: "学员风采",
          path: "/student",
        },
        {
          icon: "el-icon-alarm-clock",
          title: "课堂瞬间",
          path: "/class",
        },
        {
          icon: "el-icon-trophy",
          title: "奖项荣誉",
          path: "/honor",
        },
        {
          icon: "el-icon-video-play",
          title: "活动演出",
          path: "/show",
        },
        {
          icon: "el-icon-chat-line-round",
          title: "校园简介",
          path: "/introduction",
        },
        {
          icon: "el-icon-school",
          title: "校园环境",
          path: "/environment",
        },
        {
          icon: "el-icon-phone-outline",
          title: "联系我们",
          path: "/service",
        },
      ], // 分类列表
      hasGetData: false, //是否已经获取地理位置数据，成功之后再获取商铺列表信息
      imgBaseUrl: "https://fuss10.elemecdn.com", //图片域名地址
      videoArr: [
        {
          id: "mv",
          title: "【周世刚】国际舞台的中国民族特色",
          url: require("@/assets/images/mv.jpg"),
          type: "MV",
        },
        {
          id: "mv0",
          title: "【李静】舞蹈课堂上的火辣传说",
          url: require("@/assets/images/mv0.jpg"),
          type: "MV",
        },
        {
          id: "mv1",
          title: "【东方舞融合风】cici老师，风情万种尽显旗袍美",
          url: require("@/assets/images/mv1.jpg"),
          type: "MV",
        },
        {
          id: "mv2",
          title: "【古典舞】王斯斯带你走进柔情似水的古风世界",
          url: require("@/assets/images/mv2.jpg"),
          type: "MV",
        },
        {
          id: "mv3",
          title: "【户外美】Lily户外热舞为你展现成熟的魅力",
          url: require("@/assets/images/mv3.jpg"),
          type: "MV",
        },
      ],
      buyArr: [
        {
          id: "dyht",
          title: "【大鱼海棠】国风特色融合分解课程",
          url: require("@/assets/images/dyht.png"),
          oldprice: 199,
          newprice: 99,
          type: "免费试看",
        },
        {
          id: "zzdq",
          title: "【自作多情】港风融合东方舞分解课程",
          url: require("@/assets/images/zzdq.png"),
          oldprice: 189,
          newprice: 99,
          type: "免费试看",
        },
        {
          id: "hyj",
          title: "【红颜旧】原创融合分解课程",
          url: require("@/assets/images/hyj.jpg"),
          oldprice: 169,
          newprice: 69,
          type: "免费试看",
        },
      ],
      dialogVisible: false,
      title: "扫码付款",
      codeUrl: require("@/assets/images/paycode.png"),
      payShow: true,
      navBarFixed: false,
      iframeUrl:
        "https://m.dance365.com/moment-list-by-classification?classificationType=information&channel_id=recommend",
      footShow: true,
    };
  },
  async beforeMount() {
    if (!this.$route.query.geohash) {
      const address = await cityGuess();
      this.geohash = address.latitude + "," + address.longitude;
    } else {
      this.geohash = this.$route.query.geohash;
    }
    //保存geohash 到vuex
    this.SAVE_GEOHASH(this.geohash);
    //获取位置信息
    let res = await msiteAddress(this.geohash);
    // this.msiteTitle = res.name ? res.name : "华夏星元素";
    this.msiteTitle = "华夏星元素";
    // 记录当前经度纬度
    this.RECORD_ADDRESS(res);

    this.hasGetData = true;
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
    window.addEventListener("scroll", this.hidemenu); //监听滚动事件
  },
  components: {
    headTop,
    shopList,
    teacher,
    footGuide,
  },
  computed: {},
  methods: {
    ...mapMutations(["RECORD_ADDRESS", "SAVE_GEOHASH"]),
    // 解码url地址，求去restaurant_category_id值
    getCategoryId(url) {
      let urlData = decodeURIComponent(
        url.split("=")[1].replace("&target_name", "")
      );
      if (/restaurant_category_id/gi.test(urlData)) {
        return JSON.parse(urlData).restaurant_category_id.id;
      } else {
        return "";
      }
    },
    // 播放
    playClick(i) {
      this.$router.push(`/contact?id=${i.id}&title=${i.title}&type=${i.type}`);
    },
    // 抢购
    buyClick(newprice) {
      this.payShow = true;
      this.title = "扫码付款";
      if (newprice == 69) {
        this.codeUrl = require("@/assets/images/paycode.png");
      } else if (newprice == 99) {
        this.codeUrl = require("@/assets/images/paycode1.png");
      }
      this.dialogVisible = true;
    },
    // 已付款
    payClick() {
      this.payShow = false;
      this.title = "添加客服";
      this.codeUrl = require("@/assets/images/servicecode.png");
    },
    // 返回
    backupClick() {
      //this.$router.go(0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    // 收起
    packupClick() {
      this.footShow = !this.footShow;
    },
    // 抽奖
    redbagClick() {
      this.$router.push(`/draw`);
    },
    //实现吸顶效果
    hidemenu() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      console.log(scrollTop);
      if (scrollTop > 180) {
        this.navBarFixed = true;
      } else {
        this.navBarFixed = false;
      }
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
@import "src/style/mixin";
.link_search {
  left: 0.8rem;
  @include wh(0.9rem, 0.9rem);
  @include ct;
  overflow: hidden;
}
.carousel {
  margin-top: 1.95rem;
  img {
    display: block;
    width: 100%;
    height: 7.8rem;
  }
}

.msite_title {
  @include center;
  width: 50%;
  color: #fff;
  text-align: center;
  margin-left: -0.5rem;
  .title_text {
    @include sc(0.8rem, #fff);
    text-align: center;
    display: block;
  }
}
.msite_nav {
  padding-top: 1rem;
  background-color: #fff;
  border-bottom: 0.025rem solid $bc;
  height: 6.6rem;
  .swiper-container {
    @include wh(100%, auto);
    padding-bottom: 0.6rem;
    .swiper-pagination {
      bottom: 0.2rem;
    }
  }
  .fl_back {
    @include wh(100%, 100%);
  }
}
.free {
  width: 100%;
  height: 3rem;
  font: 800 18px/3rem "微软雅黑";
  background-image: -webkit-linear-gradient(left, red, #f99, #ff0);
  color: #fff;

  p {
    margin-left: 2rem;
    b {
      font-size: 22px;
      margin: 0 0.2rem;
    }

    a {
      margin-left: 3rem;
      color: #000;
      font-size: 16px;
    }
  }
}
.mv {
  margin-bottom: 0.1rem;
  li {
    font: 600 16px/28px "微软雅黑";
    background: #fff;
    color: #000;
    padding: 0 0.38rem;

    i {
      display: inline-block;
      width: 30px;
      height: 18px;
      border: 1px solid #f00;
      border-radius: 3px;
      font: 600 12px "微软雅黑";
      color: #666;
      text-align: center;
    }
  }
}
.buy {
  margin-bottom: 6rem;

  overflow: hidden;
  li {
    font: 600 16px/28px "微软雅黑";
    background: #fff;
    color: #000;
    padding: 0.3rem 0.38rem;
    position: relative;
    img {
      display: block;
      width: 100%;
      height: 8rem;
      margin: auto;
    }
    .price {
      overflow: hidden;
      .newprice {
        float: left;
        font: 600 26px "微软雅黑";
        color: #f00;
        margin: 0 0.3rem;
      }
      .oldprice {
        float: left;
        font: 400 16px/43px "微软雅黑";
        color: #666;
        text-decoration: line-through;
      }
      .buyBtn {
        float: right;
        margin-right: 2rem;
        width: 2.6rem;
        height: 1.2rem;
        font: 400 12px/1.2rem "微软雅黑";
        background: #f80;
        color: #fff;
      }
    }
    .try {
      position: absolute;
      top: 34%;
      left: 43%;
      width: 3rem;
      height: 1.2rem;
      font: 400 13px/1.2rem "微软雅黑";
      background: #000;
      color: #fff;
      text-align: center;
      opacity: 0.8;
    }
    .paycode {
      display: block;
      width: 3.9rem;
      height: 3.9rem;
      margin: auto;
    }
  }
}

.video {
  display: inline-block;
  width: 100%;
}
p.theme {
  width: 100%;
  height: 2.2rem;
  font: 600 16px/38px "微软雅黑";
  text-align: center;
  background: #fff;
  color: #000;
  position: relative;
  top: 0.5rem;
}
.teacher {
  height: 24.3rem;
  overflow: hidden;
  margin-top: -3rem;
}
.food_types_container {
  display: flex;
  flex-wrap: wrap;
  .link_to_food {
    width: 25%;
    padding: 0.1rem 0rem;
    @include fj(center);
    figure {
      i {
        text-align: center;
        color: #900;
        @include wh(1.8rem, 1.2rem);
      }
      figcaption {
        text-align: center;
        @include sc(0.55rem, #666);
      }
    }
  }
}
.shop_list_container {
  margin-top: 0.4rem;
  border-top: 0.025rem solid $bc;
  background-color: #fff;
  .shop_header {
    .shop_icon {
      fill: #999;
      margin-left: 0.6rem;
      vertical-align: middle;
      @include wh(0.6rem, 0.6rem);
    }
    .shop_header_title {
      color: #999;
      @include font(0.55rem, 1.6rem);
    }
  }
}
.packup,
.back {
  position: fixed;
  bottom: 3rem;
  right: 0.2rem;
  display: block;
  @include wh(2rem, 2rem);
  background: #000;
  opacity: 0.6;
  font-size: 12px;
  line-height: 1rem;
  color: #fff;
  border-radius: 50%;
  text-align: center;
  p {
    color: #fff;
  }
}
.back {
  bottom: 6rem;
  line-height: 2rem;
}
.redbag {
  position: fixed;
  bottom: 2rem;
  left: 0rem;
  display: block;
  @include wh(2.2rem, 2.2rem);
}

.navBarWrap {
  position: fixed;
  top: 1.95rem;
  z-index: 999;
  width: 100%;
  height: 2.2rem;
  font: 600 16px/38px "微软雅黑";
  text-align: center;
  background: #fff;
  color: #000;
}
</style>
