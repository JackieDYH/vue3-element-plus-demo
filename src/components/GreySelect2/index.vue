<!--
 * @Author: Jackie
 * @Date: 2023-07-12 17:07:28
 * @LastEditTime: 2023-07-12 17:07:31
 * @LastEditors: Jackie
 * @Description: file content
 * @FilePath: /vue3-element-plus-demo/src/components/GreySelect2/index.vue
 * @version: 
-->
<template>
    <ElSelect
      class="follow-records-pairs-select"
      v-model="selectVal"
      :filterable="filterable"
      :placeholder="placeholder"
      @change="selectChange"
    >
      <ElOption
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </ElSelect>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, ref, reactive } from 'vue';
  import { ElSelect, ElOption } from 'element-plus';
  const props = defineProps({
    modelValue: {
      type: String
      // default: false
    },
    options: {
      type: Array,
      default: () => []
    },
    filterable: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  });
  const emits = defineEmits(['update:modelValue', 'onChangeSelect']);
  const selectVal = computed({
    get() {
      return props.modelValue;
    },
    set(val) {
      emits('update:modelValue', val);
    }
  });
  
  const selectChange = (val) => {
    //   console.log(val);
    emits('onChangeSelect', val);
  };
  </script>
  <style lang="scss" scoped>
  .follow-records-pairs-select {
    background-color: #f5f5f5;
    height: 31px;
    width: 132px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    // margin-left: 16px;
  }
  </style>
  
  <!-- <DarkSelect
  v-model="selectVal"
  :options="options"
  @onChangeSelect="selectChange"
  />
  import DarkSelect from './DarkSelect.vue';
  const selectVal = ref('all');
  const options = [
      {
      label: '全部合约',
      value: 'all'
      },
      {
      label: '全部合约2',
      value: 'all2'
      }
  ];
  
  const selectChange = (val) => {
      console.log(val);
  }; -->