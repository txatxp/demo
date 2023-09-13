<template>
  <div
    class="el-table"
    :class="[
      {
        'el-table--border': border,
      },
    ]"
    :style="tableStyle"
  >
    <!-- 隐藏列 关键妙用 -->
    <div class="hidden-columns"><slot></slot></div>



    <div class="pos-relative">
      <div class="header-warp" :ref="headRef">
        <!-- 表格头部 -->
        <!-- store 存储了列、记录等相关数据 -->
        <SimpleTableHead class="simple-table-head" :store="store"></SimpleTableHead>
      </div>
      <!-- 遮挡竖直滚动条 -->
      <!-- <div class="hiddenBlock"></div> -->
    </div>
    <div class="pos-relative" :class="textAlign">
      <div
        :style="bodyWrapperStyle"
        class="body-wrap"
        :ref="bodyRef"
        @scroll="handleScroll"
      >
        <!-- 表格主体 -->
        <!-- store 存储了列、记录等相关数据 -->
        <SimpleTableBody :store="store"></SimpleTableBody>
      </div>
      <div class="noData flex-midcenter" v-show="!data.length">暂无数据</div>
    </div>
  </div>
</template>

<script>
import SimpleTableStore from "./simple-table-store.js";
import SimpleTableHead from "./simple-table-head.js";
import SimpleTableBody from "./simple-table-body.js";
import { calcColumnWidth } from "./utils.js";
let tableIdSeed = 0;
export default {
  name: "el-table",
  data() {
    return {
      store: null,
      curPage: 1,
      allPages: 0,
      // 容器央视
      bodyWrapperStyle: {
        height: this.height + "px",
        "text-align": this.align,
        overflow: "auto",
      },
      // table央视
      tableStyle: {
        width: this.width,
      },
      // 修正由水平滚动条带来的高度计算误差
      fixedHeight: 1,
      // 源数据用来存比较选中数据
      tableData: [],
      // 存储选中数据
      selectRowData: [],
      // 是否全选表示
      isSelectedAll: false,
      // 排序
      order: "asc",
    };
  },
  computed: {
    tableId() {
      return "tableId-" + tableIdSeed++;
    },
    bodyRef() {
      return "tableBody-" + tableIdSeed;
    },
    tBody() {
      return this.$refs[this.bodyRef];
    },
    headRef() {
      return "tableHead-" + tableIdSeed;
    },
    tHead() {
      return this.$refs[this.headRef];
    },
    textAlign() {
      return "align-" + this.align;
    },
  },
  components: {
    SimpleTableHead,
    SimpleTableBody,
  },
  props: {
    // table数据
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    // 宽度
    width: {
      type: String,
      default: "100%",
    },
    // 总条数
    total: {
      type: [Number, String],
      default: 0,
    },
    // 对齐方式
    align: {
      type: String,
      default: "center",
    },
    // 高度
    height: {
      type: String,
      default: "300",
    },
    // 是否边框表格
    border: Boolean,
    // 当前页数
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    initData() {
      // 初始化当前页码
      this.curPage = 1;
      // 初始化table数据
      this.tableData = [];
      // 计算总页数
      this.allPages = Math.ceil(parseInt(this.total) / this.data.length);
      //this.tBody.scrollTop = 0
    },
    handleScroll(e) {
      this.tHead.scrollLeft = this.tBody.scrollLeft;
      // fixedHeight修正由水平滚动条带来的高度计算误差
      if (
        this.tBody.scrollTop + this.tBody.clientHeight + this.fixedHeight >=
          this.tBody.scrollHeight &&
        this.curPage < this.allPages
      ) {
        this.$emit("loadMore", ++this.curPage);
      }
    },
    // 全选
    toggleRowSelection(rows) {
      // 交集
      this.tableData.forEach((item) => {
        rows.forEach((itm) => {
          if (item == itm) {
            this.$set(item, "$checked", true);
          }
        });
      });
      this.selectRowData = rows;
      console.log(this.selectRowData);
    },
    // 清楚所有选中、包括数据
    clearSelection() {
      this.selectRowData = [];
      this.isSelectedAll = false;
      this.tableData.forEach((item) => {
        this.$set(item, "$checked", false);
      });
    },
    // 列布局样式初始化设置
    doLayout() {
      // 设置列宽
      calcColumnWidth(this.store.columns, this);
    },
  },
  
  watch: {
    // table数据变更时初始化的一些处理
    data: {
      // 深度监听
      deep: true,
      // immediate:true; 立即执行,当刷新页面时会立即执行一次handler函数
      immediate: true,
      handler(n, o) {
        if (this.currentPage === 1) {
          // 初始化页码、总页码、置空table数据...
          this.initData();
        }
        // 重新存储table数据
        this.tableData = [...this.tableData, ...n];
      },
    },
  },
  created() {
    // 实例初始化表格列数据、宽、列id等数据
    let store = new SimpleTableStore(this.tableId);
    // 存储到当前
    this.store = store;
  },
  mounted() {
    // 列布局样式初始化设置
    this.doLayout();
    // 窗口有变动的时候也要进行列布局样式初始化设置
    window.addEventListener("resize", () => {
      this.doLayout();
    });
  },
};
</script>

<style>
.el-table {
  width: 100%;
  padding: 5px 20px 5px 20px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
.el-table .header-warp {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 12px;
  padding: 10px 0 10px 0;
}

.body-wrap {
  position: relative;
}

.el-table-tr {
  height: 60px;
  background-color: white;
  border-top: 1px solid #eeeeee;
  display: flex;
  align-items: center;
  font-size: 14px;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
  flex-shrink: 0;
}

.el-table-tr:hover {
  padding: 0 0 0 0;
  background-color: #e8f8f7;
}

/**当选中，item背景状态**/
.el-table-tr-choose {
  padding: 0 0 0 0;
  background-color: #e8f8f7 !important;
}

.checkboxshow {
  visibility: visible !important;
}

.el-table .item input[type="checkbox"] {
  visibility: visible;
}

.el-table .item:hover .share {
  display: block;
}

.el-table .item:hover .itesd-time > span {
  display: none;
}

.hiddenBlock {
  position: absolute;
  background: #dedede;
  width: 25px;
  height: calc(100% - 1px);
  top: 0;
  right: 0;
  border-bottom: 1px solid #ccc;
}

.forbidden-child-pointer-events > * {
  pointer-events: none;
}

.el-table .caret-wrapper {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  height: 34px;
  width: 24px;
  vertical-align: middle;
  overflow: initial;
  position: relative;
}
.sort-caret.ascending {
  border-bottom-color: #c0c4cc;
  top: 5px;
}
.sort-caret-ascending {
  border-bottom-color: #409eff;
}

.sort-caret.descending {
  border-top-color: #409eff;
}
.sort-caret.descending {
  border-top-color: #c0c4cc;
  bottom: 7px;
}

.sort-caret {
  width: 0;
  height: 0;
  border: 5px solid transparent;
  position: absolute;
  left: 7px;
}
</style>
