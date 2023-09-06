<template>
  <div class="p-home">
    首页
    <List v-slot="{ text,  count}">
      <span>{{ text }} {{ count }}</span>
    </List>
  </div>
</template>
<script>
import List from '../components/list.vue'
export default {
  name: "HomeView",
  components: {
    List
  },
};
</script>
