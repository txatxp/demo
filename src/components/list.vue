<template>
  <div class="p-list">
    <slot :text="'文本'" :count="1"></slot>
  </div>
</template>
<script>
export default {
  name: "List",
  components: {},
};
</script>
