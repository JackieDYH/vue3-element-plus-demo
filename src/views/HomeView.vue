<!--
 * @Author: Jackie
 * @Date: 2023-06-25 09:58:10
 * @LastEditTime: 2023-07-12 16:50:50
 * @LastEditors: Jackie
 * @Description: file content
 * @FilePath: /vue3-element-plus-demo/src/views/HomeView.vue
 * @version: 
-->
<template>
  <div class="home">
    <h1>This is an home page</h1>
    <el-row class="mb-4">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </el-row>
    <DemoTest2></DemoTest2>
  </div>
</template>
<script setup>
import DemoTest from '@/components/DemoTest.vue';
import DemoTest2 from '@/components/DemoTest2.vue';
</script>
<script>
export default {
  name: 'HomeView',
  components: {}
};
</script>
