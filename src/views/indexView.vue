<template>
  <div class="p-home">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="h函数组件渲染$slots" name="first"
        >h函数组件</el-tab-pane
      >
      <el-tab-pane label="jsx方式组件渲染$slots" name="second"
        >jsx方式组件</el-tab-pane
      >
      <el-tab-pane label="局部组件渲染$slots" name="third"
        >components局部组件</el-tab-pane
      >
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "HomeView",
  components: {},
};
</script>
