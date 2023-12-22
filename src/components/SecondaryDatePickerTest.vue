<template>
  <div class="p-secondary-date-picker-test">
    
      <div class="u-inline">
        <!-- 封装日期 -->
        <!-- 使用继承属性、事件 -->
        <el-date-picker v-bind="$attrs" v-on="$listeners"/> 
      </div> 
      <!-- 封装下拉 -->
      <!-- 使用继承属性、事件 -->
      <el-dropdown trigger="click" v-bind="$attrs" v-on="$listeners">
        <i class="el-icon-arrow-down el-icon--right"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="date">date</el-dropdown-item>
          <el-dropdown-item command="datetime">datetime</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  name: "SecondaryDatePickerTest",
  props: {
  },
  components: {},
  data() {
    return {
    }
  },
  created() {
    console.log(this, '---')
  },
  methods: {
  }
};
</script>
<style scoped>
.u-inline {
  display: inline-block;
}
.el-icon-arrow-down {
  cursor: pointer;
}
</style>