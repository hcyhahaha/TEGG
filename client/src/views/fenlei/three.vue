<template>
	<div class="three">
		<div class="threebox" v-for="(el,index) in data1">
			<img :src="el.upimgsrc">
			<p>{{el.imgtype}}</p>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				//   data3: [{img:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3055604125,1017998288&fm=26&gp=0.jpg",id:1},
				//         {img:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3055604125,1017998288&fm=26&gp=0.jpg",id:2},
				//         {img:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3055604125,1017998288&fm=26&gp=0.jpg",id:3},
				//         {img:"https://img.dpm.org.cn/Uploads/Picture/2020/08/05/s5f2a724e907b0.jpg",id:4}]
				data1: [],
			}
		},
		mounted() {
			this.$axios.get("/keydords", {
					params: {
						keydords: "唯美"
					}
				})
				.then((re) => {
					console.log(re.data);
					this.data1 = re.data;
				});
		},
	}
</script>
<style scoped>
	.three {
		width: 100%;
		/* border: 1px solid red; */
		padding-top: 15px;
		margin: 0 auto;
	}
	.threebox{
		height: 210px;
		/* border: 1px solid red; */
		margin: 0 auto;
	}
	.threebox p{
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
	.threebox:hover p{
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
