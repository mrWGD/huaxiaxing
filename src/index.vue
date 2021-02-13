<template>
  <div class="index" v-if="showMobile">
    <div v-if="posterShow">
      <img class="poster" src="./assets/images/poster.png" />
      <span class="time">{{ time }}s</span>
    </div>
    <div v-else>
      <img class="background" src="./assets/images/loginimg2.gif" />

      <img class="logo" src="./assets/images/logo.png" />
      <button class="user" @click="userLogin">会员登录</button>
      <button @click="go">直接进入</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      guessCity: "", //当前城市
      guessCityid: "", //当前城市id
      hotcity: [], //热门城市列表
      groupcity: {}, //所有城市列表
      posterShow: false,
      time: 9,
      showMobile: true,
    };
  },
  created() {
    this.isMobile();
  },
  mounted() {
    this.timer = setInterval(() => {
      this.time--;
      if (this.time == 0) {
        clearInterval(this.timer);
        this.posterShow = false;
      }
    }, 1000);
  },

  components: {},

  computed: {},

  methods: {
    // 判断设备是手机端还是pc端
    isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      if (flag) {
        this.showMobile = true;
        // alert("手机端");
      } else {
        this.showMobile = false;
        alert("pc端暂不支持访问，请在手机端访问");
      }
    },
    //点击图标刷新页面
    userLogin() {
      this.$router.push("/login");
    },
    go() {
      this.$router.push("/msite");

      //  this.$router.push("/home");
    },
  },
};
</script>

<style lang="scss" scoped>
.index {
  height: 100%;
  width: 100%;
  img.poster {
    position: fixed;
    height: 100%;
    width: 100%;
  }
  .time {
    position: absolute;
    right: 20px;
    bottom: 10px;
    width: 30px;
    height: 30px;
    border: 1px solid #666;
    border-radius: 50%;
    font: 300 18px/28px "";
    text-align: center;
    color: #666;
  }
  img.background {
    position: fixed;
    height: 100%;
    width: 100%;
  }
  img.logo {
    position: relative;
    display: block;
    width: 356px;
    height: 300px;
    margin: auto;
  }
  button {
    display: block;
    width: 260px;
    height: 30px;
    margin: 30px auto;
    background: #fff;
    border-radius: 6px;
    font: 600 16px "微软雅黑";
    color: rgb(5, 5, 5);
    opacity: 0.6;
  }
  .user {
    color: #f00;
  }
}
</style>
