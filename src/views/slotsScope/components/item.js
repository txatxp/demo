export default {
  name: 'Item',
  data() {
      return {}
  },
  created() {
      this.$store.state.slotJsxVnode.push(this.$scopedSlots.default)
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