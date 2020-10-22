<template>
  <div>
    <Top></Top>
    <div class="Personal">
      <div class="Personal-left">
        <p class="Personal-ties">PERSONAL</p>
        <div class="Personal-info">
          <!-- 头像 -->
          <!-- <img :src="info.pic" > -->
          <img @click="show2()" class="tximg" :src="tximg" />

          <!-- 用户名 -->
          <!-- <p>{{info.username}}</p> -->
          <p>{{email}}</p>
        </div>
        <!-- 修改昵称输入框 -->
        <div v-show="nicheng" class="nicheng">
          <!-- 隐藏 -->
          <button @click="hide()">&#10006</button>
          <input v-model="username" type="text" />
          <!-- 确认 -->
          <button @click="send()">&#10004</button>
        </div>
        <!-- 修改头像输入框 -->
        <div v-show="touxing" class="touxingbox">
          <div class="changeimgbox">
            <button @click="hide2()" class="btn-false">&#10006</button>
            <div class="txfile">
              <div>{{txname}}</div>
              <input @change="filechange($event)" type="file" />
            </div>
            <button @click="send2()" class="btn-true">&#10004</button>
          </div>
        </div>
        <div class="hooby">
          <div @click="show1()" class="button-content">修改昵称</div>
          <div @click="show2()" class="button-content">修改头像</div>
          <!-- <div @click="destroy()" class="button-content">注销账号</div> -->
          <div @click="signout()" class="button-content">退出登录</div>
          <!-- 上面添加的 -->
          <div class="button-content" style>风景控</div>
          <div class="button-content">资深发烧友</div>
          <div class="button-content">猫奴</div>
          <div class="button-content">星空爱好者</div>
          <div class="button-content">旅行</div>
        </div>
      </div>

      <div class="Personal-right">
        <div class="btn">
          <p :class="{xuanzhong}" @click="fn('collection')">我的收藏库</p>
          <p :class="{xuanzhong2}" @click="fn('upload')">我的上传作品</p>
        </div>

        <keep-alive>
          <component :is="com"></component>
        </keep-alive>
      </div>

      <!-- 收藏和上传=====结尾 -->
    </div>
  </div>
</template>

<script>
import Top from "@/views/index/Top.vue";
import collection from "@/views/Persona/collection.vue";
export default {
  props: [],
  data() {
    return {
      com: "collection",
      username: "", //昵称
      touxing: false, //更改头像选择框
      txname: "更换头像",
      nicheng: false, //更改昵称选择框
      xuanzhong: true, //我的收藏库选中时样式
      xuanzhong2: false, //我的上传作品选中时样式
      myemail: "",
      email: "",
      tximg: "",
      file1: "",
      data1: [],
      data2: [],
    };
  },
  mounted() {
    console.log(999);
    this.$axios.get("/userinfo").then((res) => {
      this.xxupload = res.data;
      console.log("000000000", res.data);
      console.log("99999", res.data[0]);
      if (res.data[0]) {
        // this.email = `${res.data[0].email}`;
        this.myemail = `${res.data[0].email}`;
        this.tximg = res.data[0].img;
        if (res.data[0].username) {
          this.email = `${res.data[0].username}`;
        } else {
          this.email = `${res.data[0].email}`;
        }
      } else {
        this.email = "未登录！";
        this.tximg = "http://localhost:7001/upload/touxiang.jpg";
      }
    });
  },
  methods: {
    // 上传头像
    filechange(e) {
      //e.target.files[0]获取图片信息
      //把他设置到file1里面，然后我们就可以在send()里面用这个信息
      this.file1 = e.target.files[0];
      this.txname = this.file1.name;
    },
    //提交上传头像
    send2() {
      var f = new FormData();
      f.append("file1", this.file1);
      f.append("myemail", this.myemail);
      var res = this.$axios
        .post("/setUserImg", f, {
          header: { "content-Tyoe": "application/x-www-form-urlencoded" },
        })
        .then((res) => {
          console.log(res);
          this.$axios.get("/userinfo").then((res) => {
            // console.log(res.data);
            this.tximg = `${res.data[0].img}`;
          });
        });
    },
    //修改昵称
    show1() {
      if (this.email == "未登录！") {
        alert("请先登录！");
      } else {
        this.nicheng = true;
      }
    },
    //修改头像
    show2() {
      console.log(this.email);
      if (this.email == "未登录！") {
        alert("请先登录！");
      } else {
        this.touxing = true;
      }
    },
    //隐藏修改昵称输入框
    hide() {
      this.nicheng = false;
    },
    //隐藏修改头像输入框
    hide2() {
      this.touxing = false;
    },
    //改昵称
    send() {
      if (this.username) {
        console.log(this.username);
        console.log(encodeURIComponent(this.username));
        this.$axios
          .get(
            `/username?username=${encodeURIComponent(this.username)}&myemail=${
              this.myemail
            }`,
            {
              headers: {
                "Content-Type":
                  "application/x-www-form-urlencoded;charset=utf-8",
              },
            }
          )
          .then((res) => {
            console.log(res);
            if (res.data.code === 2009) {
              console.log(res.data.info);
              this.$axios.get("/userinfo").then((res) => {
                if (res.data[0]) {
                  this.email = `${res.data[0].username}`;
                }
              });
            }
          });
      } else {
        alert("昵称为空！");
      }
    },
    //注销账号
    // destroy() {
    //   this.$axios.get("/destroy").then((res) => {
    //     console.log(res);
    //   });
    //   this.email = "未登录！";
    //   this.tximg = "http://localhost:7001/public/upload/touxiang.jpg";
    //   // require("@/assets/logo.png");
    //   // http://localhost:7001/public/upload/touxiang.jpg
    // },

    //退出登录
    signout() {
      this.email = "未登录！";
      this.tximg = "http://localhost:7001/upload/touxiang.jpg";
      this.$axios.get("/destroy").then((res) => {
        console.log(res);
      });
    },

    //上传作品和收藏动态组件切换
    fn(arg) {
      this.com = arg;
      if (arg == "collection") {
        this.xuanzhong = true;
        this.xuanzhong2 = false;
      } else {
        this.xuanzhong = false;
        this.xuanzhong2 = true;
      }
    },
  },
  components: {
    collection,
    Top,
    upload: () => import("@/views/Persona/upload.vue"),
  },
};
</script>

<style scoped>
.Personal {
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding-left: 30px;
  box-sizing: border-box;
  padding-top: 20px;
}
.Personal-left {
  width: 200px;
  height: 688px;
  background-color: #f4f8f7;
  border-radius: 5px;
  transition: all 0.3s;
}
.Personal-ties {
  width: 200px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  padding-top: 30px;
  font-family: "arial black";
  margin-bottom: 10px;
}
.Personal-info {
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.Personal-info img {
  width: 120px;
  height: 120px;
  border-radius: 60px;
}

.hooby {
  width: 200px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.button-content {
  width: 100px;
  height: 30px;
  background-color: #5cd36c;
  font-size: small;
  line-height: 30px;
  text-align: center;
  position: relative;
  margin-bottom: 10px;
}
.button-content:before {
  content: "";
  width: 20px;
  height: 0%;
  border: 15px solid;
  border-color: transparent #d19b70 transparent transparent;
  position: absolute;
  right: 100px;
  top: 0px;
}

.Personal-right {
  width: 80%;
  /* border: 1px solid #F4A460; */
  box-sizing: border-box;
}
.btn {
  width: 400px;
  height: 55px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.btn p {
  display: inline-block;
  width: 160px;
  height: 50px;
  border-radius: 25px;
  line-height: 50px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  background-color: #eff2f2;
  color: #b8bbba;
  cursor: pointer;
  transition: all 0.3s;
}
.btn p:hover {
  box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 8px 1px;
}

.line {
  width: 90%;
  height: 1px;
  box-sizing: border-box;
  border: 0.5px solid #b8bbba;
  background-color: #b8bbba;
  margin-top: 10px;
}

.btn .xuanzhong {
  background-color: #66a6e0;
  color: #dee1b5;
}
.btn .xuanzhong2 {
  background-color: #66a6e0;
  color: #dee1b5;
}
.content {
  margin-top: 20px;
  width: 90%;
  height: 400px;
  /* background-color: #B8BBBA; */
  box-sizing: border-box;
  padding: 5px 10px;
  /* float: left; */
  display: flex;
  flex-wrap: wrap;
}
.img-box {
  width: 24%;
  height: 200px;
  box-sizing: border-box;
  margin: 2px 3px;
}
.img-box img {
  width: 100%;
  height: 200px;
}
.img-box:hover {
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.48), 0 5px 12px rgba(0, 0, 0, 0.34);
}

/* 昵称修改 */
.nicheng {
  /* display: none; */
  /* height: 50px; */
  top: 372px;
  left: 80px;
  position: absolute;
  background-color: #d0eeff;
}
.nicheng input {
  outline: none;
  height: 30px;
  width: 120px;
  border: 1px solid #d0eeff;
  /* background-color: aqua; */
}
.nicheng button {
  width: 20px;
  height: 30px;
  outline: none;
  border: 1px solid #d0eeff;
  background-color: #d0eeff;
}
.nicheng button:hover {
  background: #aadffd;
  border-color: #78c3f3;
  color: #004974;
}

/* 更改头像 */
.touxingbox {
  /* display: none; */
  /* height: 50px; */
  top: 372px;
  left: 80px;
  position: absolute;
  /* background-color: #66a6e0; */
}
.changeimgbox {
  display: flex;
  justify-content: space-between;
  width: 150px;
  /* background-color: coral; */
}
.changeimgbox button {
  width: 30px;
  outline: none;
  border: 1px solid #99d3f5;
  background-color: #d0eeff;
}
.changeimgbox button:hover {
  background: #aadffd;
  border-color: #78c3f3;
  color: #004974;
}
.changeimgbox .btn-false {
  border-right: 1px solid transparent;
}
.changeimgbox .btn-true {
  border-left: 1px solid transparent;
}
.txfile {
  position: relative;
  display: inline-block;
  background: #d0eeff;
  border: 1px solid #99d3f5;
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
  /* border-radius: 4px; */
  padding: 4px 12px;
  color: #1e88c7;
  text-decoration: none;
  text-align: center;
  text-indent: 0;
  line-height: 20px;
  width: 100%;
  /* height: 30px; */
}

.txfile input {
  /* overflow: hidden; */
  position: absolute;
  font-size: 100px;
  width: 100%;
  height: 100%;
  right: 0;
  top: 0;
  opacity: 0;
}

.txfile:hover {
  background: #aadffd;
  border-color: #78c3f3;
  color: #004974;
  text-decoration: none;
}
</style>
