<template>
  <div class="p-form">
    <IIput :list="list"></IIput>
  </div>
</template>
<script>
import IIput from './comp/input.vue'
import { list } from './config.js'
export default {
  name: "formView",
  components: {
    IIput
  },
  data() {
    return {
      list
    }
  },
  created() {
    setTimeout(() => {
      console.log(this.list)
    }, 5000);
  }
};
</script>