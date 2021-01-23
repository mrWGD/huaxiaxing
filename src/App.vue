<template>
  <div v-loading="loading">
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
import svgIcon from "./components/common/svg";
export default {
  data() {
    return {
      loading: false,
    };
  },
  mounted() {},
  components: {
    svgIcon,
  },
  watch: {
    $route(to, from) {
      if (to.path != from.path) {
        const loading = this.$loading({
          lock: true,
          text: "小星星",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.8)",
        });
        setTimeout(() => {
          loading.close();
        }, 1000);
      }
    },
  },
};
</script>

<style lang="scss">
@import "./style/common";
.router-fade-enter-active,
.router-fade-leave-active {
  transition: opacity 0.3s;
}
.router-fade-enter,
.router-fade-leave-active {
  opacity: 0;
}
</style>
