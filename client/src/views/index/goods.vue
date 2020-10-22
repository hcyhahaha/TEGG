
<template>
  <div id="goods">
    <!-- 商品展示 -->
    <div class="content">
      <div v-for="(el, index) in data2" class="img-box" :key="index">
        <img :src="el.upimgsrc" />
        <button @click="collection(el.id, $event)">收藏</button>
        <!--    <p class="shoucang">
			<button @click="collection(el.id,$event)">
				<img  src="@/assets/shoucangqian.png">
			</button>
		</p> -->
        <span>{{ el.imgtitle }}</span>
        <!-- style="position: relative; right: -140px" -->
        <span class="type">类型:{{ el.imgtype }}</span>
        <div>{{ el.description }}</div>
      </div>
    </div>

    <!-- 分页 -->
    <div class="block">
      <!-- <span class="demonstration"
        >图片总数：{{ data1.length }}，每页显示12张图片</span
      > -->
      <el-pagination
        layout="prev, pager, next"
        :total="(data1.length / 12) * 10"
        :background="false"
        :page-size="12"
        @current-change="handleCurrentChange($event)"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data1: [],
      data2: [],
    };
  },
  mounted() {
    this.$axios.get("/allproduction").then((res) => {
      console.log("获取所有作品", res.data);
      this.data1 = res.data;
      var data2 = this.data1.slice(1, 1 + 12);
      console.log("截取后的数组", data2);
      this.data2 = data2;
    });
  },
  methods: {
    // 点击收藏时
    collection(e, event) {
      console.log("收藏31", event.target);
      this.$axios
        .get("/collectionProduction", { params: { id: e } })
        .then((res) => {
          console.log("收藏接口", res.data);
          if (res.data.code == 4006) {
            alert("您还未登录!");
          } else {
            alert("收藏成功！");
            event.target.disabled = true;
          }
        });
    },
    // 当前页
    handleCurrentChange(e) {
      console.log("当前页数", e);
      console.log("图片总数", this.data1.length);
      this.data2 = this.data1.slice(e * 12 + 1 - 12, e * 12 + 1);
    },
  },
};
</script>

<style scoped>
.content {
  margin-top: 20px;
  width: 90%;
  /* height: 400px; */
  /* background-color: #B8BBBA; */
  box-sizing: border-box;
  padding: 5px 10px;
  /* float: left; */
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
}
.img-box {
  width: 24%;
  height: 250px;
  box-sizing: border-box;
  margin: 2px 3px;
}
.img-box img {
  width: 100%;
  height: 200px;
  transition: 2s linear;
}

.img-box:hover {
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.48), 0 5px 12px rgba(0, 0, 0, 0.34);
}
.img-box button {
  width: 45px;
  height: 20px;
  border-radius: 40px;
  border: none;
  margin-left: 2px;
  background: rgb(103, 155, 155);
  transition: 0.3s linear;
  color: white;
  outline: none;
}
.img-box span {
  font-size: 14px;
  padding-left: 2px;
  opacity: 0.8;
}
.img-box .type {
  background-color: brown;
}
/*===========分页============*/
.block {
  /* background-color: brown; */
  margin: 20px 0;
  text-align: center;
}
</style>