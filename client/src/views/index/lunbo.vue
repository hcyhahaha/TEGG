<template>
  <div class="round">
    <!-- 轮播图 -->
    <div class="round-img">
        <img v-for="(el,index) in imgarr" :key="index"  :src="el"  v-show="n==index" @mouseenter="stopgo" @mouseleave="go">
    </div>

    <!-- 小圆点 -->
    <ul class="round-point">
      <li v-for="(v,i) in imgarr" :key="i" :class="n == i? 'active' : 'still'"></li>
    </ul>

    <!-- 左右箭头 -->
    <span class="left arrow" @click="changeimg('last')" @mouseenter="stopgo" @mouseleave="go">←</span>
    <span class="right arrow" @click="changeimg()" @mouseenter="stopgo" @mouseleave="go">→</span>
  </div>
</template>


<script>
export default {
  data() {
    return {
      imgarr: [
        "https://static.699pic.com/index_banner/20/20/09/971c19ca2e2bb6935303fdf162afe2b8.jpg",
        "https://static.699pic.com/index_banner/20/20/09/772e1696e839d52cecf694ee15cdc6e9.jpg",
        "https://static.699pic.com/index_banner/20/20/09/8784c262f2064f9d63cd643322126702.jpg",
        "https://static.699pic.com/index_banner/20/20/04/eec18688302c464a6585f1d601865973.jpg" ,
        "https://static.699pic.com/index_banner/20/20/09/b680813c3cdfb90cae9a81140f9f0984.jpg",
      ],

      // 随着时间n会改变 从而实现图片切换
      n:0,
      stop:null
    };
  },

  // 函数调用部分
  methods: {
    // 图片自动切换
    go(){
      this.stop = setInterval(() => {
        this.n++;
        // 当到最后一张图片了 n又变成0
        if(this.n == this.imgarr.length) {
          this.n = 0
        }
      }, 1000);
    },

    // 鼠标移入停止 移出继续  在img标签里面设置@mouse事件
    stopgo() {
     clearInterval(this.stop)
    },

    // 上一页下一页
    changeimg(str){
      if(str === "last") {
         if(this.n == 0) {
          this.n = this.imgarr.length
        }
        this.n--;
        console.log(6666666)
      } else {
         this.n++;
         if(this.n == this.imgarr.length) {
          this.n = 0
        }
      }
    },

  },


  // 使用生命函数 表示页面加载后 开始调用go函数 启动定时器
  mounted() {
     this.go()
   },



};
</script>


<style>
/* 通用样式*/
* {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}
/* 设置盒子位置 */
.round {
  width: 100%;
  height: 300px;
  /* border: #a9a8a8 solid 1px; */
  margin: 0 auto;
  position: relative;
}
/* 通用结束 */

/* 设置图片大小 */
.round-img img {
  width: 100%;
  height: 300px;
}

/* 设置点点盒子位置 */
.round-point {
  position: absolute;
  bottom: 20px;
  right: 50%;
  transform: translateX(50%);
}

/* 设置小点点大小和位置 */
.still {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #a9a8a8;
  display: inline-block;
  margin: 0px 3px;
  opacity: 0.6;
}

.active {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #000000;
  display: inline-block;
  margin: 0px 3px;
  opacity: 0.6;
}

/* 设置左右箭头盒子位置 */
.arrow {
  width: 40px;
  height: 60px;
  background-color: white;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.4;
  line-height: 60px;
  text-align: center;
  font-size: 26px;
}

/* 将箭头放置在左右两边*/
.left {
  left: 0;
}

.right {
  right: 0;
}

.left:hover,
.right:hover,
.round-point li {
  cursor: pointer;
}
</style>






// https://p0.ssl.img.360kuai.com/t01d78eb8bd6ab44493.webp
// https://p0.ssl.img.360kuai.com/t01a392cee10d23a484.webp
// https://p0.ssl.img.360kuai.com/t019deda68044fa702e.webp
// https://p0.ssl.img.360kuai.com/t01338e3ff70aa79b51.webp