<template>
  <div class="p-inline-comp">
    <button @click="show = !show">改变</button>
    <Content>
      <div>内联组件使用</div>
    </Content>
  </div>
</template>
<script>
import Content from './components/content.vue'
export default {
  name: 'InlineComp',
  components: {
    Content
  },
  data() {
    return {
      show: true
    }
  }
}
</script>