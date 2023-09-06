export default {
  name: 'Content',
  data() {
      return {}
  },
  render(h){
     return h('div', this.$slots.default)
  }
}