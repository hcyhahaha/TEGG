<template>
    <div style="display: none;" :style="{display: 'block'}">
		 <Top></Top>
        <div class="fenlei">
            <h1>精选专辑</h1>
            <div class="fenlei1">
                <div @click="fn('one')">
                    <img
                        src="http://ttly.itzjj.cn/uploads/userfiles/1/images/pageimg/20200630/1-200630144R62.jpg">
                </div>
                <div @click="fn('two')">
                    <img
                        src="https://goss2.cfp.cn/creative/vcg/800/version23/VCG41507706092.jpg?x-oss-process=image/format,jpg/interlace,1">
                </div>
                <div @click="fn('three')">
                    <img
                        src="https://goss4.cfp.cn/creative/vcg/800/new/2722629196b5498d8d3b598d801ffb52.jpg?x-oss-process=image/format,jpg/interlace,1">
                </div>
                <div @click="fn('four')">
                    <img
                        src="https://goss.cfp.cn/creative/vcg/800/new/VCG41522937631.jpg?x-oss-process=image/format,jpg/interlace,1">
                </div>

            </div>
            <h2>将相机的精彩聚集在自己手中</h2>
            <components :is="conent" class="child"></components>

        </div>


    </div>
</template>

<script>
	import Top from "@/views/index/Top.vue";
    import one from "@/views/fenlei/one.vue"
    import two from "@/views/fenlei/two.vue"
    import three from "@/views/fenlei/three.vue"
    import four from "@/views/fenlei/four.vue"
    export default {
        name: "fenlei",
        data() {
            return {
                conent: one,
                one: true,
                two: false,
                three: false,
                four: false
            }
        },
        methods: {
            fn(arg) {
                this.conent = arg
            }
        },
        filters: {

        },
        components: {
            Top, four, one, two, three
        }

    }

</script>

<style scoped>

    .fenlei {
		padding-top: 10px;
        text-align: center;
		/* box-sizing: border-box; */
    }

    .fenlei1 {
        display: flex;
        justify-content: center;
        margin: 30px 0;
    }

    .fenlei1 img {
        border-radius: 10px;
        width: 200px;
        height: 110px;
        margin: 0 10px;
		/* border: 1px solid red; */
		/* box-sizing: border-box; */
    }
    .child{
        width: 1300px;
        display: flex;
        margin: 0 auto;
        flex-wrap: wrap;
    }
</style>