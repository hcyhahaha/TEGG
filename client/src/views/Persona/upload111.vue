<template>
  <div class="Personal-right">
    <div class="btn">
      <!-- <p id="xuanzhong" @click="fn('register')">我的收藏库</p> -->
      <!-- <p>我的上传作品</p> -->
      <button @click="upload()">上传</button>
      <input @change="uploadchange($event)" type="file" />
      <input v-model="uploadpic[0].imgtitle" type="text" placeholder="图片标题" />
      <input v-model="uploadpic[0].imgname" type="text" placeholder="图片名字" />
      <input v-model="uploadpic[0].imgtype" type="text" placeholder="图片分类" />
      <input v-model="uploadpic[0].description" type="text" placeholder="图片描述" />
      <div v-show="uptextshoe" id="updescription">
        <span>{{info}}</span>
        <button @click="hidden">&#10006</button>
      </div>
    </div>
    <div class="line"></div>
    <div class="content">
      <div v-for="(el,index) in data2" class="img-box" :key="index">
        <img :src="el.upimgsrc" />
        <p>{{el.imgtitle}}</p>
        <p>{{el.description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      file1: "",
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
      data2: [
        // {
        //   imgsrc:
        //     "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3321001490,2413995741&fm=26&gp=0.jpg",
        // },
        // {
        //   imgsrc:
        //     "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=364397611,3916868751&fm=26&gp=0.jpg",
        // },
        // {
        //   imgsrc:
        //     "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1534288623,1292557607&fm=26&gp=0.jpg",
        // },
        // {
        //   imgsrc:
        //     "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2711638588,2028725496&fm=26&gp=0.jpg",
        // },
      ],
    };
  },
  mounted() {
    this.$axios.get("/userinfo").then((res) => {
      //   this.xxupload = res.data;
      console.log("传了吗？", res.data[0]);
      var a = res.data;
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
              header: { "content-Tyoe": "application/x-www-form-urlencoded" },
            })
            .then((res) => {
              console.log(res);
              if ((res.data.code = 2004)) {
                //上传成功
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
      //   console.log(e.target.files[0]);
      this.file1 = e.target.files[0];
    },
    //隐藏提示框
    hidden() {
      this.uptextshoe = false;
    },
  },
};
</script>

<style scoped>
.Personal {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-left: 30px;
  box-sizing: border-box;
  padding-top: 20px;
}
.Personal-left {
  width: 200px;
  height: 688px;
  background-color: #f4f8f7;
  border-radius: 5px;
  transition: all 0.5s;
}
.Personal-left:hover {
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.48), 0 6px 14px rgba(0, 0, 0, 0.32);
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
}
.btn p:hover {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.49), 0 2px 5px rgba(0, 0, 0, 0.44);
}

.line {
  width: 90%;
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

/* 图片上传成功的提示文字 */
#updescription {
  position: absolute;
  right: 300px;
  width: 200px;
  background-color: #d19b70;
}
</style>