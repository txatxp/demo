import Describe from "./desc.js";
export default {
  name: "Content",
  data() {
    return {};
  },
  render(h) {
    // 获取vnode
    const slot = this.$slots.default;
    // 过滤自定义组件vnode
    const vnode = slot.filter((item) => {
      return (
        (item.componentOptions && item.componentOptions.Ctor.options.name === "DingGuaGua")
        ||
        (item.componentOptions && item.componentOptions.Ctor.options.name === "Title")
      );
    });
    // 过滤原生vnode DOM
    const dom = slot.filter(item => !item.componentOptions)
    console.log(slot);
    return (
      <div>
        { dom }
        <Describe vnodes={vnode}></Describe>
      </div>
    );
  },
};
