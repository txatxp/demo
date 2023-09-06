<template>
  <div class="p-slots-scope">
    <el-button @click="visibility = !visibility">改变{{ visibility }}</el-button>
    <Box>
      <Item>
        <template #default="{ name, age }">
          {{ name }}--{{ age }}
          <div v-if="visibility">kkkkkkkk</div>
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
