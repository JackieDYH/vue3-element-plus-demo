<!--
 * @Author: Jackie
 * @Date: 2023-07-05 21:34:14
 * @LastEditTime: 2023-07-11 15:26:22
 * @LastEditors: Jackie
 * @Description: 测试
 * @FilePath: /vue3-element-plus-demo/src/components/DemoTest.vue
 * @version: 
-->
<template>
  <div>
    <MarkSlider
      v-model:value="sliderValue"
      :marks="sliderMarks"
      :min="SLIDER_MIN"
      :max="SLIDER_MAX"
      class="follow-form-slider"
    />
    <MarkSlider
      v-model:value="sliderValue"
      :marks="sliderMarks2"
      :min="SLIDER_MIN"
      :max="SLIDER_MAX"
    />
    <el-button @click="onShowDialog(true)">按钮</el-button>
    <ClosingDialog v-model="isShow" @onChangeDialog="onChangeDialog" />
    <Update />
  </div>
</template>

<script setup>
import MarkSlider from '@/components/MarkSlider/index.vue';
import { computed, reactive, ref, watch } from 'vue';
import ClosingDialog from '@/components/ClosingDialog/index.vue';
import Update from '@/components/Update/index.vue';
const isShow = ref(false);
const onShowDialog = (show) => {
  isShow.value = show;
};
const onChangeDialog = (val) => {
  console.log('onChangeDialog', val);
  isShow.value = false;
};
const sliderValue = ref(0);
const SLIDER_MIN = 0;
const SLIDER_MAX = 180;
const sliderMarks = computed(() => [
  { percent: SLIDER_MIN, text: `${SLIDER_MIN}%` },
  {
    percent: Math.ceil((1).div(6).mul(SLIDER_MAX)),
    text: `${(1).div(6).mul(SLIDER_MAX)}%`
  },
  {
    percent: Math.ceil((2).div(6).mul(SLIDER_MAX)),
    text: `${(2).div(6).mul(SLIDER_MAX)}%`
  },
  {
    percent: Math.ceil((3).div(6).mul(SLIDER_MAX)),
    text: `${(3).div(6).mul(SLIDER_MAX)}%`
  },
  {
    percent: Math.ceil((4).div(6).mul(SLIDER_MAX)),
    text: `${(4).div(6).mul(SLIDER_MAX)}%`
  },
  {
    percent: Math.ceil((5).div(6).mul(SLIDER_MAX)),
    text: `${(5).div(6).mul(SLIDER_MAX)}%`
  },
  { percent: SLIDER_MAX, text: `${SLIDER_MAX}%` }
]);
const sliderMarks2 = computed(() => [
  { percent: SLIDER_MIN, text: `${SLIDER_MIN}x` },
  {
    percent: Math.ceil(0.2 * SLIDER_MAX),
    text: `${Math.ceil(0.2 * SLIDER_MAX)}x`
  },
  {
    percent: Math.ceil(0.4 * SLIDER_MAX),
    text: `${Math.ceil(0.4 * SLIDER_MAX)}x`
  },
  {
    percent: Math.ceil(0.6 * SLIDER_MAX),
    text: `${Math.ceil(0.6 * SLIDER_MAX)}x`
  },
  {
    percent: Math.ceil(0.8 * SLIDER_MAX),
    text: `${Math.ceil(0.8 * SLIDER_MAX)}x`
  },
  { percent: SLIDER_MAX, text: `${SLIDER_MAX}x` }
]);
</script>

<style lang="scss" scoped>
:deep(.follow-form-radio) {
  --el-radio-font-size: 12px;
  --el-radio-text-color: #868e9b;
  --el-radio-input-border-color-hover: #31daff; // @long-color;
  --el-radio-input-border-radius: 2px;
  .el-radio__input.is-checked + .el-radio__label {
    color: #31daff; //@long-color;
  }
  /* .el-radio__input.is-checked .el-radio__inner {
    border-color: #31daff; //@long-color;
    background: #fff;
    &::after {
      background: center/contain url(@/assets/images/followOrder/checked.png)
        no-repeat;
      z-index: 2;
      width: 16px;
      height: 16px;
    }
  } */
}
</style>
