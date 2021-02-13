<template>
  <div class="prize">
    <div class="wheel-wrapper">
      <div class="wheel-pointer" @click="onClickRotate">
        <p>
          点击 <br />
          抽奖
        </p>
      </div>
      <div class="triangle"></div>
      <div class="triangle1"></div>
      <div
        class="wheel-bg"
        :class="{ freeze: freeze }"
        :style="`transform: rotate(${wheelDeg}deg)`"
      >
        <div class="prize-list" :style="{ 'border-radius': borderRadius }">
          <div
            class="prize-item-wrapper"
            v-for="(item, index) in prizeList"
            :key="index"
          >
            <div
              class="prize-item"
              :style="`transform: rotate(${
                (360 / prizeList.length) * index
              }deg)`"
            >
              <div class="prize-name">
                {{ item.text }}
              </div>
              <div class="prize-icon"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <span>当前剩余次数: {{ prizeNumber }} 次</span>
    <div class="rule">
      <h3>华夏星元素抽奖活动规则</h3>
      <p>(1)活动时间：2021-02-12</p>
      <p>(2)奖项设置：</p>
      <p v-for="i in prizeList" :key="i.index">{{ i.text }}：{{ i.name }}</p>
      <p>(3)活动有效期：2021-02-12至2021-03-12，活动到期奖项不可兑换</p>
    </div>
    <div class="back display" id="pop" v-if="popshow">
      <div class="pop_content">
        <h3>恭喜你获得</h3>
        <p>{{ text }}</p>
        <p>({{ name }})</p>
        <p>中奖码：{{ code }}</p>
        <p class="advice">建议您将中奖结果截图保存，以便于作为有效凭证</p>
        <a
          class="sure pop_select"
          href="https://form.ebdan.net/ls/CaQIr9wu"
          >已截图去登记</a
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      freeze: false,
      rolling: false,
      wheelDeg: 0,
      prizeNumber: 1,
      prizeList: [
        {
          code: "hxx01",
          icon: "https://picsum.photos/40?random=1",
          text: "一等奖",
          name: "年卡一张，原价￥1299，现价￥1099",
        },

        {
          code: "hxx02",
          icon: "https://picsum.photos/40?random=2",
          text: "二等奖",
          name: "团课会员卡一张，原价￥699，现价￥609",
        },
        {
          code: "hxx03",
          icon: "https://picsum.photos/40?random=3",
          text: "三等奖",
          name: "少儿舞蹈体验课一节",
        },

        {
          code: "hxx04",
          icon: "https://picsum.photos/40?random=4",
          text: "四等奖",
          name: "现金抵扣券60，满300可用",
        },
        {
          code: "hxx05",
          icon: "https://picsum.photos/40?random=5",
          text: "五等奖",
          name: "现金抵扣券30，满100可用",
        },
        {
          code: "hxx06",
          icon: "https://picsum.photos/40?random=6",
          text: "六等奖",
          name: "19个积分",
        },
      ],
      borderRadius: "60%",
      popshow: false,
      code: "",
      text: "",
      name: "",
    };
  },
  computed: {
    prizeList() {
      return this.prizeList.slice(0, this.prizeNumber);
    },
  },
  mounted() {
    if (localStorage.getItem("prizeNumber")) {
      this.prizeNumber = localStorage.getItem("prizeNumber");
    }
  },
  methods: {
    onClickRotate() {
      if (this.prizeNumber > 0 && !localStorage.getItem("prizeNumber")) {
        this.borderRadius = "0%";
        setTimeout(() => {
          this.borderRadius = "60%";
          setTimeout(() => {
            this.borderRadius = "0%";
            setTimeout(() => {
              this.borderRadius = "60%";
              setTimeout(() => {
                this.borderRadius = "0%";
                setTimeout(() => {
                  this.borderRadius = "60%";
                }, 300);
              }, 300);
            }, 300);
          }, 200);
        }, 300);

        setTimeout(() => {
          if (this.rolling) {
            return;
          }
          this.rolling = true;
          const { wheelDeg, prizeList } = this;
          const random = Math.floor(Math.random() * prizeList.length);
          console.log(random);
          this.wheelDeg =
            wheelDeg -
            (wheelDeg % 360) +
            6 * 360 +
            (360 - (360 / prizeList.length) * random);
          this.text = prizeList[random].text;
          this.name = prizeList[random].name;
          this.code = prizeList[random].code;
          setTimeout(() => {
            this.rolling = false;
            this.popshow = true;
          }, 3500);
        }, 1500);
      } else {
        this.$message({
          message: "您的抽奖次数已用完",
          type: "warning",
        });
      }
      this.prizeNumber = 0;
      localStorage.setItem("prizeNumber", 0);
    },
  },
  watch: {
    prizeNumber() {
      this.freeze = true;
      this.wheelDeg = 0;

      setTimeout(() => {
        this.freeze = false;
      }, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.prize {
  width: 100%;
  text-align: center;
  overflow: hidden;
  background: #f96;

  .wheel-wrapper {
    width: 13.8rem;
    height: 13.8rem;
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .triangle {
    width: 0;
    height: 0;
    border: 3rem solid transparent;
    border-bottom-color: #f80;
    position: absolute;
    top: 70%;
    left: 30%;
    z-index: 0;
  }

  .triangle1 {
    width: 0;
    height: 0;
    border: 1rem solid transparent;
    border-bottom-color: #fff;
    position: absolute;
    top: 25%;
    left: 43%;
    z-index: 9;
  }

  span {
    font: 600 0.6rem/1rem "";
    color: #fff;
  }

  .wheel-pointer {
    width: 3.6rem;
    height: 3.6rem;
    border-radius: 50%;
    background: #f80;
    border: 0.2rem solid #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font: 600 0.6rem "";
    z-index: 10;

    p {
      margin-top: 0.8rem;
    }
  }

  .wheel-bg {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    transition: transform 4s ease-in-out;
    background: #f02;
    border: 1rem dashed #f80;
    border: 0.5rem solid #f80;
    opacity: 1;
    color: #fff;

    &.freeze {
      transition: none;
      background: #999;
    }
  }

  .prize-list {
    width: 100%;
    height: 100%;
    position: relative;
    text-align: center;
    border: 0.3rem dotted #fff;
    border-radius: 60%;
  }

  .prize-item-wrapper {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 8rem;
    height: 6rem;
  }

  .prize-item {
    width: 100%;
    height: 100%;
    transform-origin: bottom;
    //border-top: 2px solid #fff;
    border-bottom: 0.2rem solid #fff;
    border-radius: 50%;
    text-align: center;

    .prize-name {
      padding: 0.8rem 0;
      font-size: 0.6rem;
    }

    .prize-icon {
    }
  }

  .rule {
    width: 100%;
    margin-top: 99%;
    font-size: 0.6rem;
    font-weight: 300;
    line-height: 1rem;
    text-align: left;
    color: #333;
    padding: 2rem 1rem;

    h3 {
      font-weight: 300;
      line-height: 1.2rem;
      text-align: center;
    }
  }

  .back {
    position: fixed; //背景位置固定100%
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(
      0,
      0,
      0,
      0.8
    ); //rgba(红，绿，蓝，透明度)，0，0，0代表黑
  }

  .pop_content {
    background: #f20;
    width: 60%; //宽度
    z-index: 1; //阴影上层
    margin: 30% auto; //距离顶部及居中
    overflow: auto;
    border-radius: 0.5rem; //圆角边
    color: #fff;
    text-align: center; //文字左右居中
    line-height: 1.2rem; //上下居中
    font-size: 0.6rem;
    padding: 0.6rem;
  }

  .advice {
    //提示信息样式
    font-size: 0.6rem;
    color: #600;
  }

  .pop_select {
    display: block;
    height: 1.6rem;
    background: #fff;
    line-height: 1.6rem;
    text-align: center;
    color: #666;
    //width: calc(50% - 1rem); //宽度为50%减去边距
    font-size: 0.6rem;
    border-radius: 0.2rem; //圆角
    margin: 0.5rem auto;
  }
}
</style>
