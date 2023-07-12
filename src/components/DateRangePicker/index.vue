<!--
 * @Author: Jackie
 * @Date: 2023-06-28 10:34:18
 * @LastEditTime: 2023-07-12 16:58:32
 * @LastEditors: Jackie
 * @Description: file content
 * @FilePath: /vue3-element-plus-demo/src/components/DateRangePicker/index.vue
 * @version: 
-->
<template>
  <ElDatePicker class="m-date-range" :clearable="false"> </ElDatePicker>
</template>

<script>
export default {
  name: 'dateRangePicker',
  methods: {},
  setup() {
    return {};
  }
};
</script>

<style lang="scss">
.m-date-range {
  box-sizing: border-box;
  border: 1px solid #2e2e2e;
  padding: 0 15px;
  width: 226px !important;

  .el-range__icon {
    display: inline-flex !important;
    position: absolute;
    right: 10px;
    background-position: right center;
    background-size: 10px 10px;
    background-repeat: no-repeat;
    background-image: url('@/assets/images/futures/calendar.png');
    svg {
      display: none;
    }
  }
}
</style>
