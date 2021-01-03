<template>
  <div class="index">
    <img src="./assets/images/logo.png" />
    <button class="user" @click="userLogin">会员登录</button>
    <button @click="go">直接进入</button>
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
    };
  },

  mounted() {},

  components: {},

  computed: {},

  methods: {
    //点击图标刷新页面
    userLogin() {
      this.$router.push("/login");
    },
    go() {
      this.$router.push("/home");
    },
  },
};
</script>

<style lang="scss" scoped>
.index {
  position: fixed;
  height: 100%;
  width: 100%;
  background: url("./assets/images/loginimg2.gif") no-repeat center;
  background-size: cover;
  img {
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
