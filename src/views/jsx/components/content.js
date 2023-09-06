import Describe from "./desc.js";
export default {
  name: "Content",
  data() {
    return {};
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
        {/* 直接渲染 */}
        { dom }

        {/* 通过参数传递vnode */}
        <Describe vnodes={vnode}></Describe>
      </div>
    );
  },
};
