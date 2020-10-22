<template>
  <div class="Searchbarbox">
    <div class="Searchbar">
      <input type="text" v-model="value" placeholder="搜索" />
      <button @click="fn" class="searchbtn">搜索</button>
    </div>
    <!-- <sear></sear> -->
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
// import sear from '@/views/topnav/sear.vue'
export default {
  data() {
    return {
      value: "",
    };
  },
  components: {
    // sear,
  },
  methods: {
    async fn() {
      console.log(111);
      this.$axios
        .get("/keydords", { params: { keydords: this.value } })
        .then((re) => {
          console.log("搜索", re.data);
          this.$store.commit("increment", { n: re.data });
          console.log(this.$store.state.arr);
          this.$router.push("/sear");
        });
    },
  },
};
</script>

<style>
.Searchbar {
  width: 420px;
  height: 70px;
  /* border: 1px solid red; */
  position: relative;
}
.Searchbar input {
  width: 400px;
  height: 35px;
  border-radius: 50px;
  outline: none;
  border: 1px solid #cccccc;
  padding-left: 15px;
  border-right: none;
}
.Searchbar button {
  width: 120px;
  height: 38px;
  position: absolute;
  top: 22px;
  left: 300px;
  background-color: #2caeff;
  border: none;
  border-radius: 50px;
  font-size: 18px;
  color: white;
  outline: none;
}
.searchbtn {
  line-height: 19px;
}
</style>
