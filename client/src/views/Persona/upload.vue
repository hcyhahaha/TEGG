<template>
  <div class="Personal-right">
    <div class="btn">
      <div class="upfile-box">
        <p>+</p>
        <input type="file" @change="uploadchange($event)" class="filebox" />
      </div>
      <div class="int-box">
        <input
          v-model="uploadpic[0].imgtitle"
          type="text"
          placeholder="图片标题"
        />
        <input
          v-model="uploadpic[0].imgname"
          type="text"
          placeholder="图片名字"
        />
        <input
          v-model="uploadpic[0].imgtype"
          type="text"
          placeholder="图片分类"
        />
        <input
          v-model="uploadpic[0].description"
          type="text"
          placeholder="图片描述"
        />
      </div>
      <button @click="upload()">上传</button>
    </div>
    <div v-show="showfile1Name">已选择:{{ file1Name }}</div>
    <div v-show="uptextshoe" id="updescription">
      <span>{{ info }}</span>
      <!-- &#10006 叉叉 -->
      <button @click="hidden" class="btn-count">{{ count }}</button>
    </div>
    <div class="line"></div>

    <div class="content">
      <div v-for="(el, index) in data2" class="img-box" :key="index">
        <img :src="el.upimgsrc" />
        <!-- <p class="imgtitle">{{el.imgtitle}}</p>
				<p class="imgtype">{{el.imgtype}}</p> -->
        <div class="description">{{ el.description }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "测试",
      id: "",
      file1: "",
      file1Name: "",
      showfile1Name: false, //已选择图片xxx
      count: 3, //倒计时
      login: false,
      info: "提示信息", //图片上传成功提示文字
      uptextshoe: false,
      uploadpic: [
        {
          imgtitle: "",
          imgname: "",
          imgtype: "",
          description: "",
        },
      ],
      data2: [],
    };
  },
  mounted() {
    this.$axios.get("/userinfo").then((res) => {
      //   this.xxupload = res.data;
      // console.log("传了吗？", res.data[0]);
      var a = res.data;
      console.log(a);
      if (a) {
        this.login = true;
        this.id = res.data[0].id;
        console.log("已登录");
      } else {
        this.login = false;
        console.log("未登录");
      }
    });

    this.$axios.get("/allproduction").then((res) => {
      // console.log("获取所有作品", res.data);
      // console.log(res.data[0].id);
      var arr = [];
      for (let i = 0; i < res.data.length; i++) {
        //console.log(res.data[i].userid);
        if (res.data[i].userid == this.id) {
          arr.push(res.data[i]);
        }
      }
      this.data2 = arr;
    });
  },
  methods: {
    //提交上传作品
    upload() {
      // console.log(this.login);
      if (this.login) {
        console.log("已经登录");
        if (
          this.uploadpic[0].imgtitle &&
          this.uploadpic[0].imgname &&
          this.uploadpic[0].imgtype &&
          this.uploadpic[0].description
        ) {
          var f = new FormData();
          f.append("file1", this.file1);
          f.append("username", this.username);
          f.append("imgtitle", this.uploadpic[0].imgtitle);
          f.append("imgname", this.uploadpic[0].imgname);
          f.append("imgtype", this.uploadpic[0].imgtype);
          f.append("description", this.uploadpic[0].description);
          var res = this.$axios
            .post("/uploadImg", f, {
              header: {
                "content-Tyoe": "application/x-www-form-urlencoded",
              },
            })
            .then((res) => {
              console.log(res);
              if ((res.data.code = 2004)) {
                //上传成功
                setTimeout(() => {
                  // this.info = res.data.info;
                  clearInterval(timer);
                  this.count = 0;
                  this.uptextshoe = false;
                }, 3000);
                var timer = setInterval(() => {
                  --this.count;
                }, 1000);
                this.info = res.data.info;
                this.uptextshoe = true;
                this.$axios.get("/allproduction").then((res) => {
                  console.log("获取所有作品", res.data);
                  // console.log(res.data[0].id);
                  var arr = [];
                  for (let i = 0; i < res.data.length; i++) {
                    //console.log(res.data[i].userid);
                    if (res.data[i].userid == this.id) {
                      arr.push(res.data[i]);
                    }
                  }
                  this.data2 = arr;
                });
              }
            });
        } else {
          alert("图片信息尚未填写完整！");
        }
      } else {
        alert("请先登录！");
      }
    },
    uploadchange(e) {
      this.file1 = e.target.files[0];
      this.file1Name = this.file1.name;
      this.showfile1Name = true;
      // console.log(this.file1.name);
    },
    //隐藏提示框
    hidden() {
      this.uptextshoe = false;
    },
  },
};
</script>

<style scoped>
.Personal-right {
  width: 80%;
  /* border: 1px solid #F4A460; */
  box-sizing: border-box;
}

.btn {
  width: 800px;
  height: 55px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-left: 30px;
}
.btn button {
  width: 80px;
  height: 40px;
  border-radius: 20px;
  outline: none;
  border: 1px solid #e7e7e5;
  background-color: #e7e7e5;
  color: coral;
  font-size: 18px;
  font-weight: 600;
  font-family: "隶书";
  position: relative;
  left: 20px;
}

.line {
  width: 1173px;
  height: 1px;
  box-sizing: border-box;
  border: 0.5px solid #b8bbba;
  background-color: #b8bbba;
  margin-top: 10px;
}

#xuanzhong {
  background-color: #66a6e0;
  color: #dee1b5;
}

.upfile-box {
  width: 50px;
  height: 50px;
  border: 1px solid cadetblue;
  box-sizing: border-box;
  border-radius: 40px;
  background-color: #e7e7e5;
  cursor: default;
  position: relative;
}

.upfile-box p {
  width: 25px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  border-radius: 15px;
  font-size: 30px;
  margin: 0;
  left: 11px;
  top: 10px;
  position: absolute;
  color: red;
}

.upfile-box input {
  width: 25px;
  height: 25px;
  position: absolute;
  left: 10px;
  top: 10px;
  opacity: 0;
  z-index: 9999;
}

.int-box {
  width: 700px;
  height: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.int-box input {
  width: 120px;
  height: 30px;
  border: 2px solid #cccccc;
  border-radius: 15px;
  text-align: center;
  line-height: 30px;
  outline: none;
}

.content {
  margin-top: 20px;
  width: 1191px;
  /* height: 400px; */
  /* border: 1px solid red; */
  box-sizing: border-box;
  padding: 5px 10px;
  display: flex;
  flex-wrap: wrap;
}

.img-box {
  /* width: 24%; */
  width: 286px;
  height: 238px;
  /* border: 1px solid red; */
  box-sizing: border-box;
  margin: 2px 3px;
  transition: all 0.5s;
  border-radius: 3px;
}

.img-box img {
  width: 100%;
  height: 200px;
  border-radius: 3px;
}

.img-box:hover {
  box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.35);
}
.img-box p {
  float: left;
  /* padding-left: 10px; */
}
.imgtitle {
  font-size: 14px;
  padding-left: 2px;
  opacity: 0.8;
}
.imgtype {
  font-size: 14px;
  position: relative;
  left: 220px;
  opacity: 0.8;
}
.description {
  height: 32px;
  text-align: center;
  line-height: 32px;
}
/* 图片上传成功的提示文字 */
#updescription {
  width: 100px;
  height: 40px;
  border-radius: 25px;
  line-height: 40px;
  padding-left: 20px;
  color: coral;
  font-size: 18px;
  font-weight: 600;
  font-family: "楷体";
  position: absolute;
  right: 165px;
  top: 210px;
  /* background-color: #d19b70; */
  background-color: rgb(44, 174, 255);
}
/* 图片上传成功后倒计时按钮 */
.btn-count {
  width: 20px;
  font-size: 18px;
  color: inherit;
  font-weight: inherit;
  border: 1px solid transparent;
  background-color: transparent;
}
</style>
