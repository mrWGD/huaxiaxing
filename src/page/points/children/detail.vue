<template>
  <div class="page">
    <head-top head-title="积分政策" go-back="true"></head-top>
    <div class="markdown">
      <h3 id="q1-">Q1: 积分说明</h3>
      <ul>
        <li>（1）1个积分可抵扣1元现金</li>
        <li>（2）积分只支持兑换相应课程，不能兑换现金</li>
        <li>（3）请在有效期内使用积分，到期自动失效</li>
      </ul>
      <h3 id="q1-">Q2: 积分使用</h3>
      <ul>
        <li>积分可以到店兑换价值相等的课程</li>
      </ul>
      <h3 id="q1-">Q3: 积分活动</h3>
      <ul>
        <li>（1）会员首次登录即送99个积分</li>
        <li>（2）办理会员赠送相应积分</li>
        <li>（3）推荐一个新好友成为会员赠送198个积分</li>
        <li>（4）到店上课每打卡签到一次赠送2个积分</li>
        <li>（5）线上直播课程每打卡签到一次赠送1个积分</li>
      </ul>
    </div>
  </div>
</template>

<script>
import headTop from "src/components/header/head";
import { mapState, mapMutations } from "vuex";
import { payRequest } from "src/service/getData";
import alertTip from "src/components/common/alertTip";
import loading from "src/components/common/loading";

export default {
  data() {
    return {};
  },
  components: {
    headTop,
  },
};
</script>

<style lang="scss" scoped>
@import "src/style/mixin";

.page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 1.95rem;
  z-index: 203;
  background-color: #fff;
  p,
  span {
    font-family: Helvetica Neue, Tahoma, Arial;
  }
}
.markdown {
  @include sc(0.6rem, #666);
  padding: 0 0.5rem 0.5rem;
  h3 {
    line-height: 2rem;
  }
  p,
  li {
    @include sc(0.6rem, #666);
    line-height: 1rem;
  }
}
</style>
