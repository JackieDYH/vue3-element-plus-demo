/*
 * @Author: Jackie
 * @Date: 2023-07-12 10:33:43
 * @LastEditTime: 2023-07-12 16:51:53
 * @LastEditors: Jackie
 * @Description: file content
 * @FilePath: /vue3-element-plus-demo/src/components/GreySelect/index.jsx
 * @version: 
 */
import { ElIcon, ElImage, ElOption, ElSelect } from "element-plus";
import { defineComponent, computed } from "vue";
import styles from './index.module.scss';
import orderBookArrow from '@/assets/images/futures/greyselect_arrow.svg';
import 'element-plus/es/components/select/style/css';

// 由于要自定义suffixIcon，这里使用jsx来做这个组件
export default defineComponent({
  name: 'DarkSelect',
  props: {
    value: {
      type: [Number, String],
      default: '',
    },
    list: {
      type: Array,
      default: () => ([]), // [{label, value}] || [value]
    },
    filterable: {
      type: Boolean,
      default: false,
    },
    align: {
      type: String,
      default: 'right',
    }
  },
  emits: ['update:value'],
  setup(props, {emit}) {
    const modelValue = computed({
      set(val) {
        emit('update:value', val);
      },
      get() {
        return props.value;
      }
    });
    const isValue = (val) => val !== undefined && val !== null;
    const getValue = (item) => {
      if (isValue(item.value)) return item.value;
      return item;
    };
    const getLabel = (item) => {
      if (isValue(item.label)) return item.label;
      if (isValue(item.value)) return item.value;
      return item;
    }
    return () => (
      <ElSelect
        v-model={modelValue.value}
        class={[styles.orderbookFilterSelect, styles[`textAlign${props.align}`]]}
        popper-class={styles.orderbookOptions}
        filterable={props.filterable}
        suffixIcon={
          <ElIcon size={10}>
            <ElImage
              class={styles.orderbookFilterSuffixIcon}
              src={orderBookArrow}
            />
          </ElIcon>
        }
      >
        {props.list.map((item) => (
          <ElOption
            value={getValue(item)}
            label={getLabel(item)}
          />
        ))}
      </ElSelect>
      )
    }
})