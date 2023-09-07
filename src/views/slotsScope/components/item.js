export default {
  name: 'Item',
  data() {
      return {}
  },
  created() {
    /**
     * 这里可以根据自己的需求组装、分类this.$scopedSlots.default在不同时机不同地方
     */
    // 存储默认作用域方法
    this.$scopedSlots.default && this.$store.state.slotJsxVnode.push(this.$scopedSlots.default)
    // 存储具名作用域方法
    this.$scopedSlots.append && this.$store.state.slotJsxVnode.push(this.$scopedSlots.append)
  },
  methods: {
  },
  render(){
     const { $slots } = this
      return (<div>
          {$slots.default}
      </div>)
  }
}