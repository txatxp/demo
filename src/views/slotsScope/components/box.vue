<template>
  <div class="p-slots-scope">
    <!-- 这里有个巧妙的用法，为什么要这么做？ -->
    <div v-show="visibility">
      <slot></slot>
    </div>
    <!-- 这里用来渲染最终 -->
    <RenderSlot></RenderSlot>
  </div>
</template>
<script>
import RenderSlot from './RenderSlot.js'
export default {
  name: "Box",
  components: {
    RenderSlot
  },
  data() {
    return {
      visibility: false
    }
  }
};
</script>
