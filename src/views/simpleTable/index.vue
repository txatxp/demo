<template>
  <div>
    <SimpleTable
      :data="tableData"
      ref="simpleTable"
      :width="'800'"
      :height="'500'"
      :total="1000"
      :current-page="currentPage"
      @selection-change="handleSelectionChange"
      @loadMore="loadMore"
    >
      <SimpleTableColumn type="selection" width="50"> </SimpleTableColumn>
      <SimpleTableColumn width="100" label="solt列">
        <template slot-scope="scope">
          <img src="https://cdn.qjdchina.com/static-online/riskExperts2/img/ssc-product-buy-icon.png" style="width: 18px" />
          <span>{{ scope.row.name }}</span>
        </template>
      </SimpleTableColumn>
      <SimpleTableColumn
        prop="name"
        label="姓名"
        width="200"
        sortable
      ></SimpleTableColumn>
      <SimpleTableColumn
        prop="date"
        label="日期"
        width="200"
        sortable
      ></SimpleTableColumn>
      <SimpleTableColumn prop="address" label="绝招"></SimpleTableColumn>
    </SimpleTable>
    <button style="width: 100px; height: 50px" @click="add">添加数据</button>
    <button style="width: 100px; height: 50px" @click="figureChoose">
      指定选择
    </button>
    <!-- <button style="width: 100px; height: 50px" @click="cancel">取消选择</button> -->
  </div>
</template>

<script>
import SimpleTable from "./components/simple-table.vue";
import SimpleTableColumn from "./components/simple-table-column.js";
// import Mbutton from "./components/mbutton";
export default {
  name: "simpleTable",
  components: { SimpleTableColumn, SimpleTable },
  data() {
    return {
      tableData: [
        {
          no: 0,
          date: "2023-09-12",
          name: "乔峰",
          address: "一个降龙十八掌",
        },
        {
          no: 1,
          date: "2023-09-13",
          name: "张无忌",
          address: "乾坤大挪移",
        },
        {
          no: 2,
          date: "2023-09-14",
          name: "杨过",
          address: "独孤求败剑法",
        },
        {
          no: 3,
          date: "2023-09-15",
          name: "蓉儿",
          address: "打狗棒法",
        },
      ],
      currentPage: 1,
    };
  },
  methods: {
    // 动态插入数据
    add() {
      let one = {
        no: 5,
        date: "2023-09-15",
        name: "我是一个吊儿郎当的好男儿！",
        address: "不详",
      };
      this.tableData.push(one);
    },
    // 指定选择哪条数据
    figureChoose() {
      this.$refs.simpleTable.toggleRowSelection([
        this.tableData[1],
        this.tableData[2],
      ]);
    },
    // 记录选择事件
    handleSelectionChange(val) {
      console.log("handleSelectionChange", val);
    },
    // 取消选择记录
    cancel() {
      this.$refs.simpleTable.clearSelection();
      console.log("cancel");
    },
    loadMore(val) {
      console.log(val);
      this.currentPage = val;
    },
  },
};
</script>

<style scoped></style>
