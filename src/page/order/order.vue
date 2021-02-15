<template>
  <div class="class_page">
    <head-top head-title="课程" go-back="true"></head-top>
    <div class="open">
      <h3>开设课程</h3>
      <img :src="require('@/assets/images/class.png')" />
    </div>
    <div class="courseTopics">
      <h3>课程专题</h3>
      <ul>
        <li v-for="(i, index) in courseTopicsList" :key="index">
          <img :src="i.imgurl" />
          <p>
            {{ i.text }}
          </p>
        </li>
      </ul>
    </div>
    <div class="classtable">
      <h3>课程表</h3>

      <img :src="require('@/assets/images/classtable.jpg')" />
    </div>

    <foot-guide></foot-guide>
    <transition name="loading">
      <loading v-show="showLoading"></loading>
    </transition>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import headTop from "src/components/header/head";
import computeTime from "src/components/common/computeTime";
import loading from "src/components/common/loading";
import { getImgPath } from "src/components/common/mixin";
import footGuide from "src/components/footer/footGuide";
import { getOrderList } from "src/service/getData";
import { loadMore } from "src/components/common/mixin";
import { imgBaseUrl } from "src/config/env";

export default {
  data() {
    return {
      courseTopicsList: [
         {
          text:
            "《Mejance》2.15-2.17周世刚老师2021最新原创纱巾开场舞集训",
          imgurl: require("@/assets/images/class.jpg"),
        },
         {
          text:
            "《自作多情》2.12-2.13周世刚老师网络直播公益课",
          imgurl: require("@/assets/images/class0.jpg"),
        },
        {
          text:
            "《东方舞名师团队，迎新内训》1.30-1.31周世刚老师技巧提升，李静老师融合Paris",
          imgurl: require("@/assets/images/class1.jpg"),
        },
        {
          text: "《春节集训》2.15-2.17 名师李静，与你共舞popsong",
          imgurl: require("@/assets/images/class2.jpg"),
        },
        {
          text: "《小牛领跑》2021 少儿舞蹈，寒假派对来袭",
          imgurl: require("@/assets/images/class3.jpg"),
        },
        {
          text: "《亲密爱人》签约东方舞名师cici的精品小班课已经开启",
          imgurl: require("@/assets/images/class4.jpg"),
        },
        {
          text: "《少儿街舞》街舞试听课已经为小伙伴们打开通道，快快来报名吧！",
          imgurl: require("@/assets/images/class5.jpg"),
        },
        {
          text: "《古典舞》12月的古典情，想美就来华夏星",
          imgurl: require("@/assets/images/class6.jpg"),
        },
      ],
      preventRepeat: false, //防止重复获取
      showLoading: false, //显示加载动画
      imgBaseUrl,
    };
  },
  mounted() {},
  mixins: [loadMore],
  components: {
    headTop,
    footGuide,
    loading,
    computeTime,
  },
  computed: {
    ...mapState(["userInfo", "geohash"]),
  },
  methods: {
    ...mapMutations(["SAVE_ORDER"]),
    //初始化获取信息
    async initData() {
      if (this.userInfo && this.userInfo.user_id) {
        let res = await getOrderList(this.userInfo.user_id, this.offset);
        this.orderList = [...res];
        this.hideLoading();
      } else {
        this.hideLoading();
      }
    },
    //加载更多
    async loaderMore() {
      if (this.preventRepeat) {
        return;
      }
      this.preventRepeat = true;
      this.showLoading = true;
      this.offset += 10;
      //获取信息
      let res = await getOrderList(this.userInfo.user_id, this.offset);
      this.orderList = [...this.orderList, ...res];
      this.hideLoading();
      if (res.length < 10) {
        return;
      }
      this.preventRepeat = false;
    },
    //显示详情页
    showDetail(item) {
      this.SAVE_ORDER(item);
      this.preventRepeat = false;
      this.$router.push("/order/orderDetail");
    },
    //生产环境与发布环境隐藏loading方式不同
    hideLoading() {
      this.showLoading = false;
    },
  },
  watch: {
    userInfo: function (value) {
      if (value && value.user_id && !this.orderList) {
        this.initData();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/style/mixin";

.class_page {
  background-color: #fff;
  padding: 0 0.6rem;
  h3 {
    @include font(0.8rem, 3rem);
    font-weight: 600;
    text-align: center;
  }
  .open {
    padding-top: 2rem;

    img {
      display: block;
      width: 80%;
      margin: 0 auto;
    }
  }
  .courseTopics {
    ul {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      li {
        width: 7rem;
        height: 12rem;
        border: 1px solid #999;
        border-radius: 0px;
        margin-bottom: 0.6rem;
        text-align: left;

        img {
          display: block;
          width: 6.9rem;
          height: 9.6rem;
          margin: 0 auto;
        }

        p {
          @include font(0.55rem, 0.68rem);
          color: #333;
        }
      }
    }
  }
  .classtable {
    padding-bottom: 3.6rem;

    img {
      display: block;
      width: 100%;
      margin: 0 auto;
    }
  }
}

.loading-enter-active,
.loading-leave-active {
  transition: opacity 0.7s;
}
.loading-enter,
.loading-leave-active {
  opacity: 0;
}
.router-slid-enter-active,
.router-slid-leave-active {
  transition: all 0.4s;
}
.router-slid-enter,
.router-slid-leave-active {
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}
</style>
