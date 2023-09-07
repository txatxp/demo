<template>
  <el-date-picker
    v-model="dateVal"
    :type="type"
    placeholder="请输入日期"
    :size="size"
    :value-format="valueFormat"
    :format="valueFormat"
    @change="change"
    @focus="focus"
    @blur="blur"
      />
</template>
<script>
export default {
  name: "DatePickerTest",
  props: {
    type: {
      type: String,
      default: 'date'
    },
    placeholder: {
      type: String,
      default: '请输入日期'
    },
    size: {
      type: String,
      default: 'default'
    },
    valueFormat: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    val: {
      type: [String, Object, Date],
      default: '2023-12-30'
    }
  },
  components: {},
  data() {
    return {
      dateVal: ''
    }
  },
  created() {
    this.dateVal = this.val
  },
  methods: {
    // 日期发生改变时，抛出事件把新的日期提交给父组件
    change(val) {
      this.$emit('change', val)
    },
    // 获取焦点事件，抛出事件
    focus() {
      this.$emit('focus')
    },
    // 失去焦点事件，抛出事件
    blur() {
      this.$emit('blur')
    }
  }
};
</script>