import Describe from "./desc.js";
export default {
  name: "Content",
  data() {
    return {};
  },
  created() {
    // this.$scopedSlots.default({ row: { name: 'txp' }})
  },
  render() {

    // 获取vnode
    const slot = this.$slots.default;
    // 过滤自定义组件vnode
    const vnode = slot.filter((item) => {
      return (
        // 过滤出name是DingGuaGua的组件
        (item.componentOptions && item.componentOptions.Ctor.options.name === "DingGuaGua")
        ||
        // 过滤出name是Title组件
        (item.componentOptions && item.componentOptions.Ctor.options.name === "Title")
      );
    });

    // 过滤原生vnode DOM
    const dom = slot.filter(item => !item.componentOptions)

    // 打印
    console.log(slot);
    return (
      <div>
        { dom }

        <Describe vnodes={vnode}></Describe>
      </div>
    );
  },
};
