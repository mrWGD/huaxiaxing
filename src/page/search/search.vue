<template>
  <div class="paddingTop search_page">
    <head-top head-title="动态" goBack="true"></head-top>
    <form class="search_form">
      <input
        type="search"
        name="search"
        placeholder="请输入关键字"
        class="search_input"
        v-model="searchValue"
        @input="checkInput"
      />
      <input
        type="submit"
        name="submit"
        value="搜索"
        class="search_submit"
        @click.prevent="searchTarget('')"
      />
    </form>
    <section class="search_history" v-if="searchHistory.length && showHistory">
      <p class="title_restaurant">搜索历史</p>
      <ul>
        <li
          v-for="(item, index) in searchHistory"
          :key="index"
          class="history_list"
        >
          <span class="history_text ellipsis" @click="searchTarget(item)">{{
            item
          }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            class="delete_icon"
            @click="deleteHistory(index)"
          >
            <line
              x1="8"
              y1="8"
              x2="18"
              y2="18"
              style="stroke: #999; stroke-width: 1"
            />
            <line
              x1="18"
              y1="8"
              x2="8"
              y2="18"
              style="stroke: #999; stroke-width: 1"
            />
          </svg>
        </li>
      </ul>
      <footer class="clear_history" @click="clearAllHistory">
        清空搜索历史
      </footer>
    </section>
    <div class="search_none" v-if="emptyResult">很抱歉！无搜索结果</div>
    <div class="information">
      <h3><i class="el-icon-star-off"></i>星资讯</h3>
      <ul>
        <li v-for="(i, index) in zixunList" :key="index">
          <p>
            {{ i.text }}
          </p>
        </li>
      </ul>
    </div>
    <div class="wiki">
      <h3><i class="el-icon-star-off"></i>星百科</h3>
      <ul>
        <li
          v-for="(i, index) in baikeList"
          :key="index"
          @click="rowClick(i.text)"
        >
          <img :src="require('@/assets/images/logo1.png')" />
          <p>
            {{ i.title }}
            <b>阅读量 {{ i.readnum }}</b>
          </p>
        </li>
      </ul>
    </div>
    <div class="link">
      <b>友情链接</b>
      <a :href="i.url" v-for="i in linkArr" :key="i.index">{{ i.text }}</a>
    </div>
    <el-dialog
      title="星百科"
      :visible.sync="dialogVisible"
      width="90%"
      :before-close="handleClose"
    >
      <p v-for="j in text"  :key="j.index">{{j}}</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >关  闭</el-button
        >
      </span>
    </el-dialog>
    <foot-guide></foot-guide>
  </div>
</template>

<script>
import headTop from "../../components/header/head";
import footGuide from "../../components/footer/footGuide";
import { searchRestaurant } from "../../service/getData";
import { imgBaseUrl } from "../../config/env";
import { getStore, setStore } from "../../config/mUtils";
import newsData from "../../../news.json";

export default {
  data() {
    return {
      geohash: "", // msite页面传递过来的地址信息
      searchValue: "", // 搜索内容
      zixunList: [],
      baikeList: [
        {
          title: "【舞蹈知识】请了解造成舞蹈伤害的基本常识！",
          text:
            "关于舞蹈伤害的基本常识及造成舞蹈伤害的原因分述如下：	一、 解剖构造上的因素：每个人均有其身体结构上的条件限制， 其生理限制是影响技巧发展的因素， 若强迫超越其生理限制就容易受到伤害。 例如： 天生柔软度欠佳， 髋部外旋角度较小的学生， 就需要花较多的些时间加强练习， 以克服先天条件的限制， 亦可降低舞蹈伤害的机率。二、 技巧知识认知不足：	学生在学习舞蹈动作对其技巧的认知不足时， 易造成肌肉运用方式不正确而造成伤害， 因此学生上课的学习态度， 是影响其技巧学习与舞蹈伤害发生因素之一。	三、 不良的师资：	舞蹈教师若不了解学生能力的极限， 对学生要求的程度太高、 要求速度太快， 也是容易造成舞蹈伤害， 例如教师太早要求学生练习硬鞋芭蕾技巧就是一例。	四、 未应用正确的技巧：	学生为求技巧的表现， 而寻求不正确的方式达成其目的易导致受伤。 例如： 举腿、 踢腿时为达到较高的高度， 而忽略髋部与膝盖的正确位置， 不但未能学成技 巧更可能因此而造成舞蹈伤害。	一般因舞蹈伤害而产生的并发症包括心肺适能的减低、 体力的流失、 体重增加以及心理上的影响。 因此， 在受伤期间只要避免伤处的活动范围过大即可， 仍需保持一定的运动量以免心肺适能及体力的减低过多， 并且保持一定的肢体活动， 可促进身体的血液循环加强肌肉的代谢功能， 透过血液提供患处复原必要的细胞、 蛋白质、 矿物质等有助患处复原的速度。 其实舞蹈伤害的并发症不一定发生在每位患者身上， 需依其受伤程度、 部位而定， 重要的是建立正确的舞蹈伤害处理观念， 适时的休息、 复健才能确保患处的复原以及降低心理压力的产生。 ",
          imgurl: require("@/assets/images/logo1.png"),
          readnum: 909,
        },
      ],
      text: "",
      dialogVisible: false,
      dynamicList1: [],
      imgBaseUrl, // 图片域名地址
      searchHistory: [], // 搜索历史记录
      showHistory: true, // 是否显示历史记录，只有在返回搜索结果后隐藏
      emptyResult: false, // 搜索结果为空时显示
      linkArr: [
        {
          text: "中国舞蹈家协会",
          url: "https://www.cdanet.org/index",
        },
        {
          text: "中国艺考网",
          url: "http://www.yk211.com/ykzx/",
        },
        {
          text: "中国文艺网",
          url: "http://www.cflac.org.cn/",
        },
        {
          text: "肚皮舞国际协会",
          url: "http://www.imdpw.cn/",
        },
        {
          text: "中国舞蹈教学网",
          url: "http://www.danceinchina.org/",
        },
        {
          text: "少儿艺术教育网",
          url: "http://www.ccae.org.cn/",
        },
      ],
    };
  },
  created() {},
  mounted() {
    this.geohash = this.$route.params.geohash;
    //获取搜索历史记录
    if (getStore("searchHistory")) {
      this.searchHistory = JSON.parse(getStore("searchHistory"));
    }
    this.zixunList = newsData.zixunList;
    this.baikeList = newsData.baikeList;
    this.dynamicList1 = this.dynamicList;
  },
  components: {
    headTop,
    footGuide,
  },
  methods: {
    //点击提交按钮，搜索结果并显示，同时将搜索内容存入历史记录
    async searchTarget(historyValue) {
      if (historyValue) {
        this.searchValue = historyValue;
      } else if (!this.searchValue) {
        return;
      }
      //隐藏历史记录
      this.showHistory = false;
      //获取搜索结果
      this.dynamicList = this.dynamicList.filter((i) => {
        return i.text.includes(this.searchValue);
      });
      this.emptyResult = !this.dynamicList.length;
      /**
       * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
       * 如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
       */
      let history = getStore("searchHistory");
      if (history) {
        let checkrepeat = false;
        this.searchHistory = JSON.parse(history);
        this.searchHistory.forEach((item) => {
          if (item == this.searchValue) {
            checkrepeat = true;
          }
        });
        if (!checkrepeat) {
          this.searchHistory.push(this.searchValue);
        }
      } else {
        this.searchHistory.push(this.searchValue);
      }
      setStore("searchHistory", this.searchHistory.reverse());
    },
    //搜索结束后，删除搜索内容直到为空时清空搜索结果，并显示历史记录
    checkInput() {
      if (this.searchValue === "") {
        this.showHistory = true; //显示历史记录
        this.dynamicList = this.dynamicList1; //清空搜索结果
        this.emptyResult = false; //隐藏搜索为空提示
      }
    },
    //点击删除按钮，删除当前历史记录
    deleteHistory(index) {
      this.searchHistory.splice(index, 1);
      setStore("searchHistory", this.searchHistory);
    },
    //清除所有历史记录
    clearAllHistory() {
      this.searchHistory = [];
      setStore("searchHistory", this.searchHistory);
    },
    rowClick(text) {
      this.text = text;
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/mixin";

.search_page {
  margin-bottom: 2rem;
}
.search_form {
  background-color: #fff;
  padding: 0.5rem;
  display: flex;
  input {
    height: 1.5rem;
  }
  .search_input {
    flex: 4;
    border: 0.025rem solid $bc;
    @include sc(0.65rem, #333);
    border-radius: 0.125rem;
    background-color: #f2f2f2;
    font-weight: bold;
    padding: 0 0.25rem;
  }
  .search_submit {
    flex: 1;
    border: 0.025rem solid $blue;
    margin-left: 0.2rem;
    @include sc(0.65rem, #fff);
    border-radius: 0.125rem;
    background-color: $blue;
    font-weight: bold;
    padding: 0 0.25rem;
  }
}
.title_restaurant {
  font-size: 0.6rem;
  line-height: 2rem;
  text-indent: 0.5rem;
  font-weight: bold;
  color: #666;
}
.list_container {
  background-color: #fff;
}
.list_li {
  display: flex;
  justify-content: "center";
  padding: 0.5rem;
  border-bottom: 0.025rem solid $bc;
  .item_left {
    margin-right: 0.25rem;
    .restaurant_img {
      @include wh(1.7rem, 1.7rem);
    }
  }
  .item_right {
    font-size: 0.55rem;
    flex: 1;
    .item_right_text {
      padding-bottom: 0.25rem;
      border-bottom: 0.025rem solid $bc;
      p {
        line-height: 0.9rem;
      }
      .pay_icon {
        margin-bottom: -0.08rem;
      }
    }
    .item_right_detail {
      margin-top: 0.25rem;
      li {
        font-size: 0;
        span {
          font-size: 0.5rem;
          vertical-align: middle;
          display: inline-block;
          margin-bottom: 0.2rem;
        }
        .activities_icon {
          @include sc(0.5rem, #fff);
          font-weight: bold;
          padding: 0.04rem;
          border-radius: 0.15rem;
          margin-right: 0.125rem;
        }
        .only_phone {
          color: #ff6000;
        }
      }
    }
  }
}
.search_history {
  .title_restaurant {
    color: #999;
  }
  ul {
    height: 2.3rem;
    overflow: hidden;
    padding: 0 0.2rem;
    .history_list {
      float: left;
      width: 2.6rem;
      background-color: #fff;
      border: 0rem solid $blue;
      border-radius: 10%;
      @include font(0.6rem, 1rem);
      margin-left: 0.3rem;
      margin-bottom: 0.3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .history_text {
        display: inline-block;
        width: 80%;
        color: #999;
      }
      .delete_icon {
        @include wh(1rem, 1rem);
      }
    }
  }
  .clear_history {
    color: $blue;
    @include font(0.6rem, 1rem);
    text-align: center;
  }
}
.search_none {
  @include font(0.65rem, 1.75rem);
  color: #333;
  background-color: #fff;
  text-align: center;
  margin: 0.125rem;
}
.information {
  padding: 0.6rem;

  h3 {
    font: 600 16px/32px "";
  }

  ul {
    li {
      font: 400 14px/20px "";
      background: #fff;
      border-radius: 10px;
      margin-bottom: 0.6rem;
      padding: 0.6rem;

      p {
        background-image: -webkit-linear-gradient(left, red, #f90, #333);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
}

.wiki {
  padding: 0 0.6rem;
  margin-bottom: 6.6rem;

  h3 {
    font: 600 16px/32px "";
  }

  ul {
    width: 100%;
    li {
      height: 7rem;
      font: 400 14px/20px "";
      background: #fff;
      border-radius: 10px;
      margin-bottom: 0.6rem;
      padding: 1rem 0.6rem;
      img {
        float: left;
        width: 5rem;
        height: 5rem;
        margin-right: 0.6rem;
      }
      p {
        float: left;
        width: 7rem;
        b {
          display: block;
          font: 400 14px/90px "";
          color: #666;
        }
      }
    }
  }
}
.link {
  width: 100%;
  height: 5rem;
  background: #fff;
  position: fixed;
  bottom: 1rem;
  text-align: center;
  overflow: hidden;
  b {
    display: block;
    color: #666;
    @include font(0.55rem, 1rem);
  }
  a {
    display: inline-block;
    width: 4.3rem;
    color: #999;
    @include font(0.55rem, 1rem);
  }
  a:nth-child(0) {
  }
}
</style>
