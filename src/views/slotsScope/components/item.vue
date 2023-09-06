<template>
  <div class="p-slots-scope">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "Item",
  components: {
  },
  created() {
      this.$store.state.slotJsxVnode.push(this.$scopedSlots.default({name: '张三', 'age': 33}))
  },
};
</script>
