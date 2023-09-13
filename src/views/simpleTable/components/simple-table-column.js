let columnIdSeed = 0;
export default {
  name: "simple-table-column",
  computed: {
    tableColumnId() {
      return "columnId-" + columnIdSeed++;
    },
    // 父级对象
    table() {
      return this.$parent;
    },
  },
  props: {
    // 显示列文案
    label: String,
    // 字段
    prop: String,
    // 宽
    width: String,
    // 对齐方式
    align: String,
    // 类型
    type: String,
    // 排序
    sortable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      column: {},
      value_2: false,
    };
  },
  methods: {
    // 关键方法、在simple-table.vue中隐藏slot，也是有渲染SimpleTableColumn组件的，
    // 在渲染过程中通过this.$scopedSlots.default方法手机每条记录作用域数据
    renderCell(data, index) {
      let curIndex = index + 1
      // 如果type是索引，则不渲染字段值、直接渲染索引
      if (this.type === "index") {
        return curIndex;
      }
      // 如果type是一个选择项类型，则给当前列添加个方法并返回checkbox jsx数据
      if (this.type === "selection") {
        this.column.renderCell = (data, index) => (
          <div class="cell">
            <input
              type="checkbox"
              checked={data.$checked}
              on-click={($event) => this.selectionChange($event, data)}
              id={index}
            />
          </div>
        );
        return;
      }
      // 如果有字段，则从数据里拿字段值
      if (this.prop) return data[this.prop];
      // 否则返回一个作用域
      return this.$scopedSlots.default({
        $index: curIndex,
        row: data,
      });
    },
    selectionChange(event, row) {
      let isExist = false;
      // 如果是选中的则取反
      if (row.$checked) {
        this.$set(row, "$checked", !row.$checked);
      } else {
        // 选中
        this.$set(row, "$checked", true);
      }

      if (row.$checked) {
        // 如果选中并且存储记录中没有当前选中的记录则记录一条被选中的数据
        this.table.selectRowData.forEach((item) => {
          // 这里比较的是引用，所以可以这样比较
          if (item == row) {
            isExist = true;
          }
        });
        if (!isExist) {
          this.table.selectRowData.push(row);
        }
      } else {
        // 取消选中时清除之前存储被选中的记录
        for (let i = 0; i < this.table.selectRowData.length; i++) {
          if (this.table.selectRowData[i] == row) {
            this.table.selectRowData.splice(i, 1);
          }
        }
      }
      // 选中时抛出事件selection-change
      this.table.$emit("selection-change", this.table.selectRowData);
    },
    test(event, data) {
      console.log(event.target.id);
    },
  },
  watch: {
    value_2(newVal) {
      console.log(newVal);
    },
  },
  created() {
    this.column = {
      // 表格id
      tableId: this.table.tableId,
      // 列id
      columnId: this.tableColumnId,
      // 列字标题
      label: this.label,
      // 字段
      prop: this.prop,
      // 列宽
      originWidth: this.width,
      width: 0,
      // 默认slots
      slots: this.$slots.default,
      // 对齐
      align: this.align,
      // 渲染作用域vnode节点
      renderCell: this.renderCell,
      // 当前列类型
      type: this.type,
      // 排序
      sortable: this.sortable,
    };
    // 插入store列维护数据
    this.table.store.insertColumn(this.column);
  },
  render(h) {
    return h("div", this.$slots.default);
  },
};
