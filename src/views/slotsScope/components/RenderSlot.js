
export default {
  name: 'RenderSlot',
  data() {
      return {
          obj: {
              name: 'txp',
              age: 34
          }
      }
  },
  render() {
      const { $store , obj} = this
      // 这里也可以根据自己的需求组装、分类this.$scopedSlots.default在不同时机不同地方渲染
      return (<div>
          {
              $store.state.slotJsxVnode.map(item => {
                return item(obj)
              })
          }
      </div>)
  }
}