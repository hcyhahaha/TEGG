<template>
	<div class="one">
		<div v-for="(el,index) in data1" class="onebox" >
			<img :src="el.upimgsrc">
			<p>{{el.imgtype}}</p>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				data1:[],
			}
		},
		mounted() {
			this.$axios.get("/keydords", { params: { keydords: "风景" } })
			  .then((re) => {
			    console.log(re.data);
			    this.data1 = re.data;
			  });
		},
	}
</script>

<style scoped>
	.one{
		width: 100%;
		/* border: 1px solid red; */
		padding-top: 15px;
		margin: 0 auto;
	}
	.onebox{
		height: 210px;
		/* border: 1px solid red; */
		margin: 0 auto;
	}
	.one p{
		font-size: 14px;
		position: relative;
		top: -30px;
		left: -120px;
		color: white;
		/* color: yellow; */
		opacity: 0.8;
		display: none;
		transition:all 1.3s;
	}
	.onebox:hover p{
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
