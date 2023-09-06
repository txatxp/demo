<template>
  <div class="p-inline-comp">
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
    }
  }
}
</script>