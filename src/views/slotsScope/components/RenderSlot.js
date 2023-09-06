
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
      return (<div>
          {
              $store.state.slotJsxVnode.map(item => {
                return item(obj)
              })
          }
      </div>)
  }
}