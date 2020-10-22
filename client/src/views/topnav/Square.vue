<template>
  <div>
    <Top></Top>
    <div class="touxiang"></div>
    <div class="shequ">
      <h2>广场</h2>
      <div class="tubiao">
        <img src="@/assets/jiantou.png" style="margin: auto" />
      </div>
    </div>
    <div class="zuopin">
      <div
        class="imgbox"
        v-for="(al, index) in arr2"
        :key="index"
        style="margin: 10px 40px"
      >
        <img class="showimg" :src="al.upimgsrc" />

        <!-- <img src="@/assets/love.png" /> -->
        <!-- <div>
          <span>标题：{{ al.imgtitle }}</span>
        </div> -->
        <p>{{ al.description }}</p>
        <!-- <img src="@/assets/liulan.png" style="margin-left: 10px" /> -->
        <!-- <div>
            <span>类型：{{ al.imgtype }}</span>
          </div> -->

        <!-- 显示隐藏 -->
        <div class="btn-comment">
          <button @click="show1(al)">评论</button>
          <button @click="showComment(al.id)" style="width: 80px">
            显示留言
          </button>
        </div>

        <div v-if="al.flag">
          <!-- 提交评论 -->
          <div class="commentBox">
            <div class="btn-show">
              <button @click="send(al.id)">提交</button>
              <button @click="hide1(al)">隐藏</button>
            </div>
            <div class="input-box">
              <form>
                <textarea class="input" v-model="comment" rows="10" cols="20">
请输入给我的留言</textarea
                >
              </form>
            </div>
          </div>
        </div>
        <!-- 显示留言 -->
      </div>
      <div class="show" v-show="liuyan">
        <button @click="hidn2()" class="w">隐藏</button>
        <div v-for="(e, index) in commentArr" :key="index" class="liuyan">
          <div>
            <img class="tximg" :src="e.userimg" />
            <p>{{ e.username }}</p>
          </div>

          <span>{{ e.comtext }}</span>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <div class="block">
      <!-- <span class="demonstration"
        >图片总数：{{ data1.length }}，每页显示12张图片</span
      > -->
      <el-pagination
        layout="prev, pager, next"
        :total="(arr.length / 12) * 10"
        :background="false"
        :page-size="12"
        @current-change="handleCurrentChange($event)"
      >
      </el-pagination>
    </div>

    <div class="luntan">
      <div style="text-align: center">
        <h1>论坛 / luntan</h1>
      </div>
      <div
        style="
          width: 1224px;
          height: 2px;
          background-color: khaki;
          margin-left: 38px;
        "
      ></div>

      <div style="display: flex">
        <div class="luntan1">
          <div>
            <div>
              <span>|</span>
              <span>索尼相机</span>
              <span>|</span>
              <span>2020/9/12</span>
            </div>

            <img
              src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=126958151,1056147179&fm=26&gp=0.jpg"
            />
          </div>
          <div>
            <div>
              <span>|</span>
              <span>laika相机</span>
              <span>|</span>
              <span>2020/9/12</span>
            </div>

            <img
              src="https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00670-4263.jpg"
            />
          </div>
          <div>
            <div>
              <span>|</span>
              <span>尼kang相机</span>
              <span>|</span>
              <span>2020/9/14</span>
            </div>

            <img
              src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1921866217,1774386020&fm=26&gp=0.jpg"
            />
          </div>
          <div>
            <div>
              <span>|</span>
              <span>SAMSUNG相机</span>
              <span>|</span>
              <span>2020/9/18</span>
            </div>

            <img
              src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2501344271,2858374089&fm=26&gp=0.jpg"
            />
          </div>
        </div>
        <div>
          <ul style="margin: 50px 0">
            <li style="font-size: 30px; margin-left: 150px">\二手论坛/</li>
            <li>
              <a href="#">1.[北京]出尼康D3s，24-70一代，70-200二代，600 f4/G</a>
            </li>
            <li><a href="#">2.出一手自用佳能EOS 1DX一代旗舰</a></li>
            <li>
              <a href="#"
                >3.尼康40-400 1:4-5.6 G ED （二代）个人一手状况好包装附件全</a
              >
            </li>
            <li><a href="#">4.富士 X-T3 机身 + 35mm f2</a></li>
            <li>
              <a href="#">5.尼康 55 2.8 ais版微距镜头 媲美百微 超越 55 3.5</a>
            </li>
            <li>
              <a href="#"
                >6.成像出色 机动性强 佳能RF100-500mm F4.5-7.1 L IS USM试用</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import Top from "@/views/index/Top.vue";
export default {
  data() {
    return {
      liuyan: false, //留言显示和隐藏
      comment: "",
      arr: [],
      arr2: [],
      commentArr: [],
    };
  },
  mounted() {
    this.$axios.get("/allproduction").then((res) => {
      var arry2 = [];
      res.data.map((item, index) => {
        arry2.push(Object.assign({}, item, { flag: false }));
      });
      console.log("获取所有作品--广场", arry2);
      this.arr = arry2;

      var data2 = this.arr.slice(1, 1 + 12);
      console.log("截取后的数组", data2);
      this.arr2 = data2;
    });
  },
  methods: {
    //提交留言
    send(e) {
      if (!this.comment) {
        alert("未输入留言！");
      } else {
        this.$axios
          .get("/setComments", { params: { imgid: e, comtext: this.comment } })
          .then((res) => {
            console.log("评论接口", res.data);
            if (res.data.code == 4006) {
              alert("您还未登录！");
            }
            if (res.data.code == 2007) {
              alert("评论成功！");
            }
            this.comment = "";
          });
      }
    },
    show1(e) {
      e.flag = true;
    },
    hide1(e) {
      e.flag = false;
    },
    //显示留言
    showComment(e) {
      this.$axios
        .get("/getallcomments", { params: { imgid: e } })
        .then((res) => {
          console.log("图片所有留言信息", res.data);
          if (res.data[0]) {
            this.liuyan = true;
            this.commentArr = res.data;
          } else {
            alert("暂无留言！");
          }
        });
    },
    // 留言隐藏
    hidn2() {
      this.liuyan = false;
    },
    // 当前页
    handleCurrentChange(e) {
      console.log("当前页数", e);
      console.log("图片总数", this.arr.length);
      this.arr2 = this.arr.slice(e * 12 + 1 - 12, e * 12 + 1);
    },
  },
  components: {
    Top,
  },
};
</script>

<style>
.touxiang {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  border-radius: 50%;
  background: url("https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3495753411,3600431550&fm=26&gp=0.jpg");
  background-position: center;
  background-size: cover;
}

.xiantian {
  width: 400px;
  height: 2px;
  background-color: grey;
}
/* 作品区域 */
.zuopin {
  width: 1258px;
  margin: 0 auto;
  /* background-color: bisque; */
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.zuopin .imgbox {
  float: left;
  text-align: center;
  width: 400px;
  margin: 25px 0 0 15px !important;
  position: relative;
  overflow: hidden;
  border-radius: 3px;
  background-color: #f6f6f6;
  transition: all 0.8s;
}
.zuopin .imgbox:hover {
  box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.35);
}
/* 图片上面的标题显示 */
.zuopin .imgbox p {
  font-family: "宋体";
  margin: 6px auto;
  /* border: 1px solid red; */
}
.zuopin .imgbox img {
  height: 300px;
  width: auto;
  border-radius: 3px;
}

.tubiao {
  width: 40px;
  height: 40px;
  background-color: palevioletred;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.tubiao2 {
  width: 400px;
  display: flex;
}

.tubiao2 img {
  width: 20px;
  height: 20px;
}

.tubiao img {
  width: 30px;
  height: 30px;
}

.shequ {
  width: 50px;
  margin: 0 auto;
}
.luntan {
  width: 1300px;
  margin: 20px auto;
}
.luntan1 {
  width: 700px;
  display: flex;
  flex-wrap: wrap;
  margin: 0 20px;
}
.luntan1 div {
  margin: 10px;
}
.luntan1 img {
  width: 300px;
  height: 200px;
  transition: all 0.5s;
}
.luntan1 img:hover {
  transform: scale(1.07);
}
li {
  list-style: none;
  margin: 40px 0;
  font-size: 20px;
}
a {
  text-decoration: none;
  color: gray;
}
/* 评论，显示留言按钮 */
.btn-comment {
  display: flex;
  padding-bottom: 8px;
  justify-content: space-around;
}
.btn-comment button {
  outline: none;
  width: 45px;
  height: 22px;
  background-color: #679b9b;
  color: white;
  border-radius: 5px;
  border: 1px solid transparent;
}
.btn-comment button:hover {
  color: #3b818c;
  background-color: white;
}
/* 隐藏留言按钮 */
.w {
  outline: none;
  width: 40px;
  height: 22px;
  background-color: #679b9b;
  color: white;
  border-radius: 5px;
  border: 1px solid transparent;
}
.w:hover {
  color: #3b818c;
  background-color: white;
}

/* 留言区 */
.commentBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color: aqua; */
}
.input-box {
  /* background-color: blue; */
}
/* 提交，隐藏按钮 */
.btn-show {
  margin-left: 3px;
  height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.btn-show button {
  outline: none;
  width: 45px;
  height: 22px;
  background-color: #3b818c;
  color: white;
  border-radius: 5px;
  border: 1px solid transparent;
}
.btn-show button:hover {
  color: #3b818c;
  background-color: white;
}
/* 文本输入框 */
.input {
  outline: none;
  width: 340px;
  height: 50px;
  border-radius: 3px;
  border: 1px solid #3b818c;
}
/* 显示留言 */
.show {
  position: fixed;
  top: 20%;
  left: 37%;
  width: 400px;
  /* height: 90px; */
  border-radius: 5px;
  background-color: #a0c1b8;
  box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.35);
}
.liuyan {
  display: flex;
  align-items: center;
  margin: 5px;
  font-size: 14px;
  padding: 3px;
  border-radius: 5px;
  background-color: #e8e8e8;
}
/* 用户名 */
.liuyan p {
  font-size: 12px;
  /* background-color: salmon; */
}
/* 留言 */
.liuyan span {
  display: inline-block;
  text-align: center;
  line-height: 30px;
  margin-left: 5px;
  padding: 5px;
  margin-bottom: 5px;
  height: 30px;
  border-bottom: 1px solid seagreen;
  /* background-color: seagreen; */
}
/* 留言区留言者头像 */
.tximg {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
/* 展示的图片 */
.showimg {
  width: 570px;
  height: 370px;
}
/*===========分页============*/
.block {
  /* background-color: brown; */
  margin: 20px 0;
  text-align: center;
}
</style>