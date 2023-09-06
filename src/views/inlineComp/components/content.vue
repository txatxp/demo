<template>
  <div class="p-content">
    <VNodes v-if="vnode" :vnodes="vnode"></VNodes>
  </div>
</template>
<script>
export default {
  name: 'Content',
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  data() {
    return {
      vnode: null
    }
  },
  created() {
    this.vnode = this.$slots.default
  }
}
</script>