<template>
  <div>
    <!-- <Top></Top> -->
    <!-- 搜索框-----start -->
    <div class="search bar7">
      <div class="form">
        <input
          v-model="value"
          type="text"
          placeholder="请输入关键字搜索"
          name="crid"
        />
        <button @click="send()" type="submit"></button>
      </div>
    </div>
    <!-- 搜索框-----end -->
    <!-- <div class="Personal1">
      <div v-for="(el, index) in data1" class="img-box1" :key="index">
        <img :src="el.upimgsrc" />
        <span>{{ el.imgtitle }}</span>
        <div>{{ el.description }}</div>
      </div>
    </div> -->
    <!-- 图片展示--------star -->
    <div class="container">
      <div class="test" v-for="(el, index) in data1" :key="index">
        <img :src="el.upimgsrc" style="max-width: 100%" />
        <div class="hover">
          <div>{{ el.description }}</div>
        </div>
      </div>
    </div>
    <!-- 图片展示--------end -->
  </div>
</template>

<script>
// import Top from "@/views/index/Top.vue"
export default {
  data() {
    return {
      value: "",
      data1: [],
    };
  },
  components: {
    // Top
  },
  methods: {
    // 提交搜索按钮
    send() {
      this.$axios
        .get("/keydords", { params: { keydords: this.value } })
        .then((re) => {
          console.log(re.data);
          this.data1 = re.data;
        });
    },
  },
  mounted() {
    console.log("sear", this.$store.state.arr);
    // console.log("sear",this.value);
    // this.$axios.get("/keydords",{params:{keydords:this.value}}).then((re)=>{
    // 	console.log(re.data);
    this.data1 = this.$store.state.arr;
    // });
  },
};
</script>

<style scoped>
/* .Personal1 {
  width: 100%;
  height: 500px;
  background-color: gray;
  background-color: #dcdcdc;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}

.Personal1 img {
  width: 300px;
  height: 200px;
} */
/* 搜索框 */

div.search {
  padding: 10px 0;
}
.form {
  position: relative;
  width: 300px;
  margin: 0 auto;
}
input,
button {
  border: none;
  outline: none;
}
input {
  width: 100%;
  height: 42px;
  padding-left: 13px;
}
button {
  height: 42px;
  width: 42px;
  cursor: pointer;
  position: absolute;
}
.bar7 .form {
  height: 42px;
}
.bar7 input {
  width: 250px;
  border-radius: 42px;
  border: 2px solid #145374;
  background: #f6f5f5;
  transition: 0.3s linear;
  float: right;
}
.bar7 input:focus {
  width: 300px;
}
.bar7 button {
  background: none;
  top: 2px;
  right: 20px;
}
.bar7 button:before {
  content: "搜索";
  font-family: FontAwesome;
  color: #324b4e;
}

/* 图片展示 自适应*/
.test {
  float: left;
  width: 320px;
  height: 210px;
  /* border: 1px solid red; */
  box-sizing: border-box;
  padding: 10px;
  position: relative;
  left: 40px;
  /* min-width: 150px; */
  /* background-color: seagreen; */
}

.container {
  margin-left: 70px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  /* text-align: center; */
}

.test img {
 width: 440px;
  height: 200px;
}
.test img:hover + .hover {
  transition: all .8s;
  color: white;
  background-color: rgba(0, 0, 0, 0.459);
  transform: translateY(-43px);
}
/* 图片下面的隐藏框 */
.hover {
  /* width: 350px; */
  height: 40px;
  line-height: 40px;
  font-family: "华文中宋";
  text-align: center;
  color: transparent;
  background-color: transparent;
  transform: translateY(-43px);
}
.hover:hover {
  transition: all 1s;
  color: white;
  background-color: rgba(0, 0, 0, 0.459);
  transform: translateY(-43px);
}
</style>
