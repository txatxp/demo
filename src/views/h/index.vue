<template>
  <div class="p-bar">
    <el-button @click="visibility = !visibility">改变</el-button>
    <Hcomp>
      <Title></Title>
      <Describe></Describe>
      <Content></Content>
    </Hcomp>
    <Content>
      <span v-if="visibility">急急如令令</span>
    </Content>
  </div>
</template>
<script>
import Vue from 'vue'
import Describe from './components/desc.vue'
import Title from './components/title.vue'
import Content from './components/content.js'
Vue.component('Hcomp', {
  render: function (h) {
    // 打印vnode，查看结构
    console.log(this.$slots)

    // 为了说明vnode可以灵活运用，这里分类组件进行渲染
    const titleComponent = this.$slots.default[0]
    const descComponent = this.$slots.default[1]

    /**
     * h函数接受的参数不同的使用方式接受不同
     * 这里结合渲染vnode，只传两个参数，参数1：容器；参数2：vnode
     */
    return h(
      'div',   // 标签名称
      [
        titleComponent,
        h(
          'p', 
          [descComponent]
        )
      ], // 子节点数组
    )
  }
})
export default {
  name: 'H',
  components: {
    Describe,
    Title,
    Content
  },
  data() {
    return {
      visibility: true
    }
  }
}
</script>