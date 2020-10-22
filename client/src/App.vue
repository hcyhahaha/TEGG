<template>
  <div id="app" style="display: none" :style="{ display: 'block' }">
    <!-- <components :is="com1" ></components> -->
    <!-- <Top></Top> -->
    <router-view />
  </div>
</template>
<script>
export default {
  // props:["com1"],
  data() {
    return {};
  },
  components: {
    // Top,
  },
  methods: {},
};
</script>

<style>
/* 加的防止页面抖动的，有bug  */
* {
  margin: 0;
  padding: 0;
}
</style>
