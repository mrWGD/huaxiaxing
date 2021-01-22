<template>
  <div class="profile_page">
    <head-top go-back="true" :head-title="profiletitle"></head-top>
    <section>
      <section class="profile-number">
        <router-link
          :to="userInfo && userInfo.phone ? '/profile/info' : '/login'"
          class="profile-link"
        >
          <img
            :src="require('@/assets/images/logo1.png')"
            class="privateImage"
            v-if="userInfo && userInfo.phone"
          />
          <span class="privateImage" v-else>
            <svg class="privateImage-svg">
              <use
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#avatar-default"
              ></use>
            </svg>
          </span>
          <div class="user-info">
            <p>{{ username }}</p>
            <p>
              <span class="user-icon">
                <svg class="icon-mobile" fill="#fff">
                  <use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xlink:href="#mobile"
                  ></use>
                </svg>
              </span>
              <span class="icon-mobile-number">{{ mobile }}</span>
            </p>
          </div>
          <span class="arrow">
            <svg class="arrow-svg" fill="#fff">
              <use
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#arrow-right"
              ></use>
            </svg>
          </span>
        </router-link>
      </section>
      <section class="info-data" v-if="userInfo && userInfo.phone">
        <ul class="clear">
          <router-link to="/balance" tag="li" class="info-data-link">
            <span class="info-data-top"
              ><b>{{ parseInt(balance).toFixed(2) }}</b
              >元</span
            >
            <span class="info-data-bottom">我的余额</span>
          </router-link>
          <router-link to="/benefit" tag="li" class="info-data-link">
            <span class="info-data-top"
              ><b>{{ count }}</b
              >个</span
            >
            <span class="info-data-bottom">我的优惠</span>
          </router-link>
          <router-link to="/points" tag="li" class="info-data-link">
            <span class="info-data-top"
              ><b>{{ pointNumber }}</b
              >分</span
            >
            <span class="info-data-bottom">我的积分</span>
          </router-link>
        </ul>
      </section>
      <section class="profile-1reTe" v-if="userInfo && userInfo.phone">
        
        <!-- 随心约课 -->
        <router-link to="/order" class="myorder">
          <aside>
            <svg fill="#4aa5f0">
              <use
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#order"
              ></use>
            </svg>
          </aside>
          <div class="myorder-div">
            <span>随心约课</span>
            <span class="myorder-divsvg">
              <svg fill="#bbb">
                <use
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  xlink:href="#arrow-right"
                ></use>
              </svg>
            </span>
          </div>
        </router-link>
        <!-- 积分商城 -->
        <a
          href="https://home.m.duiba.com.cn/#/chome/index"
          class="myorder"
          v-if="userInfo && userInfo.phone"
          >
          <aside>
            <svg fill="#fc7b53">
              <use
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#point"
              ></use>
            </svg>
          </aside>
          <div class="myorder-div">
            <span>积分商城</span>
            <span class="myorder-divsvg">
              <svg fill="#bbb">
                <use
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  xlink:href="#arrow-right"
                ></use>
              </svg>
            </span>
          </div>
        </a>
        <!-- 会员中心 -->
        <router-link
          to="/vipcard"
          class="myorder"
          v-if="userInfo && userInfo.phone"
        >
          <aside>
            <svg fill="#ffc636">
              <use
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#vip"
              ></use>
            </svg>
          </aside>
          <div class="myorder-div">
            <span>会员中心</span>
            <span class="myorder-divsvg">
              <svg fill="#bbb">
                <use
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  xlink:href="#arrow-right"
                ></use>
              </svg>
            </span>
          </div>
        </router-link>
      </section>
      <section class="profile-1reTe">
        <!-- 服务中心 -->
        <router-link to="/service" class="myorder">
          <aside>
                                 <i class="el-icon-headset" style="color:#0f9"></i>

          </aside>
          <div class="myorder-div">
            <span>服务中心</span>
            <span class="myorder-divsvg">
              <svg fill="#bbb">
                <use
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  xlink:href="#arrow-right"
                ></use>
              </svg>
            </span>
          </div>
        </router-link>
        <!-- 证书查询 -->
        <router-link to="/download" class="myorder">
          <aside>
                      <i class="el-icon-medal-1" style="color:#f00"></i>

          </aside>
          <div class="myorder-div" style="border-bottom: 0">
            <span>证书查询</span>
            <span class="myorder-divsvg">
              <svg fill="#bbb">
                <use
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  xlink:href="#arrow-right"
                ></use>
              </svg>
            </span>
          </div>
        </router-link>
      </section>
    </section>
    <foot-guide></foot-guide>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import headTop from "src/components/header/head";
import footGuide from "src/components/footer/footGuide";
import { mapState, mapMutations } from "vuex";
import { imgBaseUrl } from "src/config/env";
import { getImgPath } from "src/components/common/mixin";

export default {
  data() {
    return {
      profiletitle: "我的",
      username: "登录", //用户名
      resetname: "",
      mobile: "暂无绑定手机号", //电话号码
      balance: 0, //我的余额
      count: 0, //优惠券个数
      pointNumber: 0, //积分数
      avatar: "", //头像地址
      imgBaseUrl,
    };
  },
  mounted() {
    this.initData();
    console.log("000", this.userInfo);
  },
  mixins: [getImgPath],
  components: {
    headTop,
    footGuide,
  },

  computed: {
    ...mapState(["userInfo"]),
    //后台会返回两种头像地址格式，分别处理
    imgpath: function () {
      let path;
      if (this.avatar.indexOf("/") !== -1) {
        path = imgBaseUrl + this.avatar;
      } else {
        path = this.getImgPath(this.avatar);
      }
      this.SAVE_AVANDER(path);
      return path;
    },
  },

  methods: {
    ...mapMutations(["SAVE_AVANDER"]),
    initData() {
      if (this.userInfo && this.userInfo.phone) {
        // this.avatar = this.userInfo.avatar;
        this.username = this.userInfo.name;
        this.mobile = this.userInfo.phone || "暂无绑定手机号";
        this.pointNumber = this.userInfo.points;

        // this.balance = this.userInfo.balance;
        // this.count = this.userInfo.amount;
      } else {
        this.username = "登录";
        this.mobile = "暂无绑定手机号";
      }
    },
  },
  watch: {
    userInfo: function (value) {
      this.initData();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/style/mixin";

.profile_page {
  p,
  span {
    font-family: Helvetica Neue, Tahoma, Arial;
  }
}
.profile-number {
  padding-top: 1.95rem;
  .profile-link {
    display: block;
    display: flex;
    box-align: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background: $blue;
    padding: 0.666667rem 0.6rem;
    .privateImage {
      display: inline-block;
      @include wh(2.5rem, 2.5rem);
      border-radius: 50%;
      background: #fff;
      vertical-align: middle;
      .privateImage-svg {
        background: $fc;
        border-radius: 50%;
        @include wh(2.5rem, 2.5rem);
      }
    }
    .user-info {
      margin-left: 0.48rem;
      -webkit-box-flex: 1;
      -ms-flex-positive: 1;
      flex-grow: 1;
      p {
        font-weight: 700;
        @include sc(0.8rem, $fc);
        .user-icon {
          @include wh(0.5rem, 0.75rem);
          display: inline-block;
          vertical-align: middle;
          line-height: 0.75rem;
          .icon-mobile {
            @include wh(100%, 100%);
          }
        }
        .icon-mobile-number {
          display: inline-block;
          @include sc(0.57333rem, $fc);
        }
      }
    }
    .arrow {
      @include wh(0.46667rem, 0.98rem);
      display: inline-block;
      svg {
        @include wh(100%, 100%);
      }
    }
  }
}
.info-data {
  width: 100%;
  background: $fc;
  box-sizing: border-box;
  ul {
    .info-data-link {
      float: left;
      width: 33.33%;
      display: inline-block;
      border-right: 1px solid #f1f1f1;
      span {
        display: block;
        width: 100%;
        text-align: center;
      }
      .info-data-top {
        @include sc(0.55rem, #333);
        padding: 0.853333rem 0 0.453333rem;
        b {
          display: inline-block;
          @include sc(1.2rem, #f90);
          font-weight: 700;
          line-height: 1rem;
          font-family: Helvetica Neue, Tahoma;
        }
      }
      .info-data-bottom {
        @include sc(0.57333rem, #666);
        font-weight: 400;
        padding-bottom: 0.453333rem;
      }
    }
    .info-data-link:nth-of-type(2) {
      .info-data-top {
        b {
          color: #ff5f3e;
        }
      }
    }
    .info-data-link:nth-of-type(3) {
      border: 0;
      .info-data-top {
        b {
          color: #6ac20b;
        }
      }
    }
  }
}
.profile-1reTe {
  margin-top: 0.4rem;
  background: $fc;
  .myorder {
    padding-left: 1.6rem;
    display: flex;
    align-items: center;
    aside {
      @include wh(0.7rem, 0.7rem);
      margin-left: -0.9rem;
      margin-right: 0.3rem;
      display: flex;
      align-items: center;
      svg {
        @include wh(100%, 100%);
      }
    }
    .myorder-div {
      width: 100%;
      border-bottom: 1px solid #f1f1f1;
      padding: 0.433333rem 0.266667rem 0.433333rem 0.18rem;
      @include sc(0.7rem, #333);
      display: flex;
      justify-content: space-between;
      span {
        display: block;
      }
      .myorder-divsvg {
        @include wh(0.46667rem, 0.466667rem);
        svg {
          @include wh(100%, 100%);
        }
      }
    }
  }
  .myorder:nth-of-type(3) .myorder-div {
    border: 0;
  }
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
