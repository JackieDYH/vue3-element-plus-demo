<!--
 * @Author: Jackie
 * @Date: 2023-07-11 15:15:14
 * @LastEditTime: 2023-07-11 15:33:42
 * @LastEditors: Jackie
 * @Description: 上传组件
 * @FilePath: /vue3-element-plus-demo/src/components/Update/index.vue
 * @version: 
-->
<template>
  <el-upload
    class="upload-box"
    ref="uploadRef"
    drag
    multiple
    action=""
    :limit="1"
    :on-change="handleChange"
    :http-request="uploadBpmn"
    :auto-upload="true"
    :before-upload="(file) => beforeUpload(file)"
  >
    <img src="@/assets/futures/upload.png" />
    <div class="el-upload__text">
      <div class="upload-green-text">上传文件</div>
      <div class="upload-text">或拖拽放入</div>
    </div>
  </el-upload>
</template>

<script setup>
import { computed, ref } from 'vue';
const uploadRef = ref();

const fileType = ref({
  limitSize: 2,
  type: 'png'
});

const handleChange = (uploadFile, uploadFiles) => {
  console.log('handleChange', uploadFile, uploadFiles);
};

const beforeUpload = (file) => {
  console.log('beforeUpload', file);
  // 上传文件之前钩子
  const type = file.name.split('.')[file.name.split('.').length - 1];
  console.log(type, '文件格式！');

  if (file && file.size / 1024 / 1024 > fileType.value.limitSize) {
    ElMessage.error(`文件大小不能超过${fileType.value.limitSize}`);
    return false;
  }
  if (file && !fileType.value.type.indexOf(file.type) == -1) {
    ElMessage.error(`只能上传${fileType.value.type}类型的文件`);
    return false;
  }
};
const uploadBpmn = (param) => {
  console.log('uploadBpmn', param);
  const formData = new FormData();
  formData.append('file', param.file); // 传入bpmn文件
  console.log(formData.get('file'), param, 888);
};
</script>

<style></style>
