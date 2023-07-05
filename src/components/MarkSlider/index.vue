<!--
 * @Author: Jackie
 * @Date: 2023-07-05 21:30:36
 * @LastEditTime: 2023-07-05 21:43:44
 * @LastEditors: Jackie
 * @Description: 滑块
 * @FilePath: /vue3-element-plus-demo/src/components/MarkSlider/index.vue
 * @version: 
-->
<template>
  <div :class="['mark-slider', { 'mark-slider-text': showText }]">
    <el-slider v-model="sliderPercent" :min="min" :max="max" />
    <div
      v-for="(item, idx) in marks"
      :key="item.text"
      :class="[
        'mark-slider-graph',
        { slider_paragraph_highlight: sliderPercent >= item.percent }
      ]"
      :style="{ left: `${((item.percent - min) / (max - min)) * 100}%` }"
      @click="sliderPercent = idx * (max / (marks.length - 1))"
    />
    <div
      v-show="showText && item.text"
      v-for="item in marks"
      :key="item.text"
      class="mark-slider-text"
      :style="{ left: `${((item.percent - min) / (max - min)) * 100}%` }"
    >
      {{ item.text || '' }}
    </div>
  </div>
</template>
<script>
import { ElSlider } from 'element-plus';
import { computed } from 'vue';
export default {
  name: 'MarkSlider',
  components: {
    ElSlider
  },
  props: {
    // v-model
    value: {
      type: [Number, String],
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    count: {
      type: [Number, String],
      default: 2
    },
    marks: {
      type: Array,
      default: () => [] // [{percent, text}]
    }
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const sliderPercent = computed({
      set(val) {
        emit('update:value', +val);
      },
      get() {
        return +props.value;
      }
    });

    const markCount = computed(() => +props.count);
    const showText = props.marks.some((mark) => !!mark.text);
    return {
      showText,
      sliderPercent,
      markCount
    };
  }
};
</script>
<style lang="scss" scoped>
.mark-slider {
  position: relative;
  margin: 20px 5px;
  height: 22px;
  user-select: none;
  &.mark-slider-text {
    height: 52px;
  }
  :deep(.el-slider) {
    --el-slider-runway-bg-color: #404040;
    --el-slider-main-bg-color: #fff;
    .el-slider__button-wrapper {
      z-index: 2;
      .el-slider__button {
        background-color: transparent;
        border: none;
        border-radius: 0;
        width: 22px;
        height: 22px;
        background-image: url(@/assets/futures/slider_button.png);
        background-size: contain;
        background-repeat: no-repeat;
      }
    }
  }
  .mark-slider-graph {
    position: absolute;
    z-index: 1;
    cursor: pointer;
    width: 15px;
    height: 15px;
    background-image: url(@/assets/futures/slider_paragraph.png);
    background-size: 15px 15px;
    background-repeat: no-repeat;
    top: 12px;
    transform: translate(-50%, -25%);
    &.slider_paragraph_highlight {
      background-image: url(@/assets/futures/slider_paragraph_highlight.png);
    }
  }
  .mark-slider-text {
    position: absolute;
    z-index: 1;
    bottom: 0;
    transform: translateX(-50%);
    color: #838b97;
    font-size: 14px;
    font-family: DIN-Medium;
  }
}
</style>
