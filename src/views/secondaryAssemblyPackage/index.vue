<template>
  <div class="p-assembly-package">
    <SecondaryDatePickerTest
      @change="getChangeVal"
      @focus="focus"
      @blur="blur"
      @command="handleCommand"
      :type="type"
      v-model="val"
      :placeholder="placeholder"
      :size="size"
      :value-format="valueFormat"
    ></SecondaryDatePickerTest>
  </div>
</template>
<script>
import SecondaryDatePickerTest from "../../components/SecondaryDatePickerTest.vue";
export default {
  name: "AssemblyPackage",
  components: {
    SecondaryDatePickerTest,
  },
  data() {
    return {
      type: "date",
      placeholder: "请输入日期...",
      size: "small",
      valueFormat: 'yyyy-MM-dd',
      val: '2022-12-11'
    };
  },
  methods: {
    getChangeVal(val) {
      console.log('改变事件')
      this.val = val
    },
    focus() {
      console.log('获取焦点')
    },
    blur() {
      console.log('失去焦点')
    },
    handleCommand(command) {
      this.type = command
      // this.$message('click on item ' + command);
    }
  },
};
</script>
