<template>
  <div class="p-slots-scope">
    <div v-show="visibility">
      <slot></slot>
    </div>
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
