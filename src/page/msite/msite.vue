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

    <p class="theme">
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
    ></iframe>

    <foot-guide v-if="footShow"></foot-guide>
    <i class="back" @click="backupClick">返回</i>
    <i class="packup" @click="packupClick"
      >{{ footShow ? "收起" : "显示" }}
      <p>底部</p></i
    >
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
      msiteTitle: "请选择地址...", // msite页面头部标题
      carouselArr: [
        {
          url: require("@/assets/images/logo.png"),
        },
        {
          url: require("@/assets/images/IMG_16.jpg"),
        },
        {
          url: require("@/assets/images/IMG_20.jpg"),
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
          path: "/teacher",
        },
        {
          icon: "el-icon-alarm-clock",
          title: "课堂瞬间",
          path: "/teacher",
        },
        {
          icon: "el-icon-trophy",
          title: "奖项荣誉",
          path: "/teacher",
        },
        {
          icon: "el-icon-video-play",
          title: "活动演出",
          path: "/teacher",
        },
        {
          icon: "el-icon-chat-line-round",
          title: "校园简介",
          path: "/teacher",
        },
        {
          icon: "el-icon-school",
          title: "校园环境",
          path: "/teacher",
        },
        {
          icon: "el-icon-phone-outline",
          title: "联系我们",
          path: "/teacher",
        },
      ], // 分类列表
      hasGetData: false, //是否已经获取地理位置数据，成功之后再获取商铺列表信息
      imgBaseUrl: "https://fuss10.elemecdn.com", //图片域名地址
      videoArr: [
        {
          id: "zsg",
          title: "【周世刚】国际舞台的中国民族特色",
          url: require("@/assets/images/zsg.png"),
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
                src: require("@/assets/zsg.mp4"),
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
        },
        {
          id: "mv1",
          title: "【古典舞】王斯斯带你走进柔情似水的古风世界",
          url: require("@/assets/images/mv1.jpg"),

          playerOptions: {
            playbackRates: [0.5, 1.0, 1.5, 2.0], //播放速度
            autoplay: false, //如果true,浏览器准备好时开始回放。
            muted: false, // 默认情况下将会消除任何音频。
            loop: false, // 导致视频一结束就重新开始。
            preload: "auto",
            language: "zh-CN",
            aspectRatio: "16:9",
            fluid: true,
            sources: [
              {
                type: "video/mp4",
                src: require("@/assets/mv1.mp4"),
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
        },
        {
          id: "mv2",
          title: "【东方舞融合风】cici老师，风情万种尽显旗袍美",
          url: require("@/assets/images/mv2.jpg"),

          playerOptions: {
            playbackRates: [0.5, 1.0, 1.5, 2.0], //播放速度
            autoplay: false, //如果true,浏览器准备好时开始回放。
            muted: false, // 默认情况下将会消除任何音频。
            loop: false, // 导致视频一结束就重新开始。
            preload: "auto",
            language: "zh-CN",
            aspectRatio: "16:9",
            fluid: true,
            sources: [
              {
                type: "video/mp4",
                src: require("@/assets/mv2.mp4"),
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
        },
      ],

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
    playClick(i){
      this.$router.push(`/contact?id=${i.id}`)
    },
    // 收起
    backupClick() {
      this.$router.go(0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    // 收起
    packupClick() {
      this.footShow = !this.footShow;
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
  right: 1rem;
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
</style>
