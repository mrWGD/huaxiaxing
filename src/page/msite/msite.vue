<template>
  <div>
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
      <el-carousel trigger="click" height="180px">
        <el-carousel-item v-for="item in carouselArr" :key="item">
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
                path: '',
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

    <div class="shop_list_container">
      <img class="poster" :src="require('@/assets/images/poster.png')" style="width:100%"/>

      <!-- <shop-list v-if="hasGetData" :geohash="geohash"></shop-list> -->
    </div>
    <foot-guide></foot-guide>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
// import {imgBaseUrl} from 'src/config/env'
import headTop from "src/components/header/head";
import footGuide from "src/components/footer/footGuide";
import shopList from "src/components/common/shoplist";
import { msiteAddress, msiteFoodTypes, cityGuess } from "src/service/getData";
import "src/plugins/swiper.min.js";
import "src/style/swiper.min.css";

export default {
  data() {
    return {
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
        },
        {
          icon: "el-icon-view",
          title: "学员风采",
        },
        {
          icon: "el-icon-alarm-clock",
          title: "课堂瞬间",
        },
        {
          icon: "el-icon-trophy",
          title: "奖项荣誉",
        },
        {
          icon: "el-icon-video-play",
          title: "活动演出",
        },
        {
          icon: "el-icon-chat-line-round",
          title: "校园简介",
        },
        {
          icon: "el-icon-school",
          title: "校园环境",
        },
        {
          icon: "el-icon-phone-outline",
          title: "联系我们",
        },
      ], // 分类列表
      hasGetData: false, //是否已经获取地理位置数据，成功之后再获取商铺列表信息
      imgBaseUrl: "https://fuss10.elemecdn.com", //图片域名地址
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
    //获取导航食品类型列表
    msiteFoodTypes(this.geohash)
      .then((res) => {
        let resLength = res.length;
        let resArr = [...res]; // 返回一个新的数组
        let foodArr = [];
        for (let i = 0, j = 0; i < resLength; i += 8, j++) {
          foodArr[j] = resArr.splice(0, 8);
        }
        this.foodTypes = foodArr;
      })
      .then(() => {
        //初始化swiper
        new Swiper(".swiper-container", {
          pagination: ".swiper-pagination",
          loop: true,
        });
      });
  },
  components: {
    headTop,
    shopList,
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
}
.carousel {
  margin-top: 1.95rem;
  img {
    display: block;
    width: 100%;
    height: 180px;
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
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
</style>
