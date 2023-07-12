<!--
 * @Author: Jackie
 * @Date: 2023-07-12 16:49:04
 * @LastEditTime: 2023-07-12 16:54:49
 * @LastEditors: Jackie
 * @Description: file content
 * @FilePath: /vue3-element-plus-demo/src/components/DemoTest2.vue
 * @version: 
-->
<template>
  <div class="test">
    <GreySelect v-model="val" :list="selectList" filterable align="left" />
  </div>
</template>

<script setup>
import GreySelect from '@/components/GreySelect/index.jsx';
import { ref } from 'vue';
const val = ref('all');
const selectList = ref([
  {
    label: '全部合约',
    value: 'all'
  },
  {
    label: 'eth',
    value: 'eth'
  },
  {
    label: 'usdt',
    value: 'usdt'
  }
]);
</script>

<style lang="scss" scoped></style>
