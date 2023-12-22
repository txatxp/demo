<template>
  <div class="p-home">
    首页
    <a href="weixin://dl/openwebview?url=https://www.example.com">点击这里打开微信浏览器</a>
    <List v-slot="{ text,  count}">
      <span>{{ text }} {{ count }}</span>
    </List>
  </div>
</template>
<script>
import List from '../components/list.vue'
import * as echarts from 'echarts';
import * as echarts5 from 'echarts5';
import * as echarts543 from 'echarts543';
export default {
  name: "HomeView",
  components: {
    List
  },
  created() {
    console.log(echarts)
    console.log(echarts5)
    console.log(echarts543)
  }
};
</script>
