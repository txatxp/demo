<template>
  <div class="p-jsx">
    <Content>
        <Title></Title>
        <DingGuaGua></DingGuaGua>
        <div>我是一个jsx组件</div>  
    </Content>
  </div>
</template>
<script>
import Content from './components/content.js'
import Title from './components/title.vue'
import DingGuaGua from './components/dingGuaGua.vue'
export default {
  name: 'JSX',
  components: {
    Content,
    Title,
    DingGuaGua
  },
  data() {
    return {
    }
  }
}
</script>