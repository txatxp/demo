<template>
  <div class="p-secondary-date-picker-test">
    
      <div class="u-inline" v-for="item in list">
        <!-- 封装日期 -->
        <!-- 使用继承属性、事件 -->
        <el-input v-if="item.type === 'input'" v-bind="item.$attrs" v-on="item.$listeners"/> 
      </div> 
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  name: "IIput",
  props: {
    list: {
      type: [Array]
    }
  },
  components: {},
  data() {
    return {
    }
  },
  created() {
    console.log(this)
  },
  methods: {
  }
};
</script>
<style scoped>

</style>