<template>
  <div class="p-slots-scope">
    <el-button @click="visibility = !visibility">改变{{ visibility }}</el-button>
    <Box>
      <Item>
        <!-- 默认作用域 -->
        <template #default="{ name, age }">
          {{ name }}--{{ age }}
          <div v-if="visibility">kkkkkkkk</div>
        </template>
      </Item>
      
      <Item>
        <!-- 具名作用域 -->
        <template #append="row">
          <div>{{ row.name }}***{{ row.age }}</div>
        </template>
      </Item>
    </Box>
  </div>
</template>
<script>

export default {
  name: "SlotsScope",
  components: {
  },
  data() {
    return {
      visibility: true
    }
  }
};
</script>
