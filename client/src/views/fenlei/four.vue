<template>
    <div class="four">
        <div class="fourbox" v-for="(el,index) in data1" >
            <img :src="el.upimgsrc" >
			<p>{{el.imgtype}}</p>
          </div>
    </div>
  </template>
  <script>
    export default{
      data() {
        return {
			data1:[],
        //   data4: [{img:"https://img.dpm.org.cn/Uploads/Picture/2020/08/29/s5f49d0c1b0b87.jpg",id:1},
        //         {img:"https://img.dpm.org.cn/Uploads/Picture/2020/08/29/s5f49d0c1b0b87.jpg",id:2},
        //         {img:"https://img.dpm.org.cn/Uploads/Picture/2020/08/29/s5f49d0c1b0b87.jpg",id:3},
        //         {img:"https://img.dpm.org.cn/Uploads/Picture/2020/08/29/s5f49d0c1b0b87.jpg",id:4},
        //         {img:"https://img.dpm.org.cn/Uploads/Picture/2020/08/29/s5f49d0c1b0b87.jpg",id:4},
        //         {img:"https://img.dpm.org.cn/Uploads/Picture/2020/08/29/s5f49d0c1b0b87.jpg",id:4},
        //         {img:"https://img.dpm.org.cn/Uploads/Picture/2020/08/29/s5f49d0c1b0b87.jpg",id:4}]
        }
      },
	  mounted() {
	  	this.$axios.get("/keydords", { params: { keydords: "建筑" } })
	  	  .then((re) => {
	  	    console.log(re.data);
	  	    this.data1 = re.data;
	  	  });
	  },
    }
  </script>

<style>
   .four {
   	width: 100%;
   	/* border: 1px solid red; */
   	padding-top: 15px;
   	margin: 0 auto;
   }
   .fourbox{
   	height: 210px;
   	/* border: 1px solid red; */
   	margin: 0 auto;
   }
   .fourbox p{
   	font-size: 14px;
   	position: relative;
   	top: -30px;
   	left: 0px;
   	color: white;
   	/* color: yellow; */
   	opacity: 0.8;
   	display: none;
   	transition:all 1.3s;
   }
   .fourbox:hover p{
   	width: 93%;
   	height: 30px;
   	/* border: 1px solid red; */
   	position: relative;
   	top: -35px;
   	left: 11px;
   	line-height: 30px;
   	border-radius: 5px;
   	background-color: rgba(0, 0, 0, 0.459);
   	display: block;
   }
</style>