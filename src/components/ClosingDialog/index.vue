<!--
 * @Author: Jackie
 * @Date: 2023-07-06 10:06:34
 * @LastEditTime: 2023-07-06 10:16:03
 * @LastEditors: Jackie
 * @Description: 弹窗
 * @FilePath: /vue3-element-plus-demo/src/components/ClosingDialog/index.vue
 * @version: 
-->
<template>
  <el-dialog
    v-model="isShow"
    :show-close="false"
    class="share-dialog-dialogs"
    style="
      width: 319px;
      height: 209px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: #fff !important;
    "
  >
    <template #default>
      <div class="dialog-text">确定以当前市场价格平仓？</div>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <div class="false" @click="isShow = false">取消</div>
        <div class="true" @click="onSureClick()">确定</div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref, reactive } from 'vue';
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});

// const Bi = reactive([]);
// const selectBi = (val) => {
//   console.log(val, 888);
//   const i = Bi.indexOf(val);
//   if (i <= -1) {
//     Bi.push(val);
//   } else {
//     Bi.splice(i, 1);
//   }
//   console.log(Bi, 88);
// };
const emits = defineEmits(['update:modelValue', 'onChangeDialog']);
const isShow = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits('update:modelValue', val);
  }
});

const onSureClick = (val) => {
  emits('onChangeDialog', true);
};
</script>

<style lang="scss">
.el-dialog__header {
  margin-right: 0;
}
</style>
<style lang="scss" scoped>
.share-dialog-dialogs {
  .dialog-text {
    font-family: 'PingFang SC';
    font-size: 18px;
    line-height: 25px;
    text-align: center;
    padding: 16px 0;
    color: #000000;
  }
  .dialog-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #000;
    .false {
      padding: 10px 50px;
      border: 1px solid #000000;
      border-radius: 4px;
      cursor: pointer;
    }
    .true {
      padding: 10px 50px;
      background: #000;
      color: #fff;
      // background: linear-gradient(266.54deg, #f1fb6f 0%, #7cf9cd 98.94%);
      border-radius: 4px;
      cursor: pointer;
    }
  }
}
</style>

<!-- 使用
    <ClosingDialog v-model="isShow" @onChangeDialog="onChangeDialog" />
    import ClosingDialog from '@//components/ClosingDialog/index.vue';
    const isShow = ref(false);
    const onShowDialog = (show) => {
      isShow.value = show;
    };
    const onChangeDialog = (val) => {
      console.log('onChangeDialog', val);
      isShow.value = false;
    }; -->
