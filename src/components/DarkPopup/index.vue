<template>
  <el-popover
    v-model:visible="visible"
    :placement="placement"
    trigger="click"
    :disabled="disabled"
    :show-arrow="false"
    :popper-class="['market-operate-popper', popperClass]"
    effect="dark"
    :width="width"
  >
    <template #reference>
      <div
        v-if="arrowTitle"
        :class="['dark-popup-arrow-title', arrowTitleClass]"
      >
        {{ arrowTitle }}
      </div>
      <slot v-else />
    </template>
    <div
      v-for="(item, idx) in list"
      :key="item.value || item.text || item"
      :class="[
        'popup-list-btn',
        {
          'popup-list-btn--active':
            value && [item.value, item.text, item].includes(value)
        }
      ]"
      @click="onClick(item, idx)"
    >
      {{ item.text || item.value || item }}
    </div>
    <div class="dark-popup-options">
      <slot name="custom" />
    </div>
  </el-popover>
</template>
<script>
import { ElPopover } from 'element-plus';
import { ref, watch } from 'vue';
export default {
  name: 'DarkPopup',
  components: { ElPopover },
  props: {
    value: {
      type: [Number, String],
      default: undefined
    },
    list: {
      type: Array,
      default: () => [] // [{text, value}]
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    width: {
      type: [String, Number],
      default: 150
    },
    popperClass: {
      type: String,
      default: ''
    },
    arrowTitle: {
      type: String,
      default: ''
    },
    arrowTitleClass: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['select', 'visibleChange'],
  setup(props, { emit, expose }) {
    const visible = ref(false);
    const dismiss = () => {
      visible.value = false;
    };
    watch(visible, (v) => {
      emit('visibleChange', v);
    });
    const onClick = (item, idx) => {
      visible.value = false;
      dismiss();
      emit('select', item, idx);
    };
    expose({ dismiss });
    return {
      visible,
      onClick
    };
  }
};
</script>
<style lang="scss" scoped>
.dark-popup-arrow-title {
  display: flex;
  align-items: center;
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    width: 6px;
    height: 5px;
    margin-left: 4px;
    background-size: 6px 5px;
    background-image: url(@/assets/images/futures/arrow_down.svg);
    background-repeat: no-repeat;
  }
}
.popup-list-btn {
  width: 100%;
  height: 43px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-left: 16px;
  &:hover {
    color: #b8bdc5;
    background-color: rgba(83, 89, 97, 0.2);
  }
  &.popup-list-btn--active {
    color: #31daff;
  }
}
.dark-popup-options {
  max-height: 180px;
  overflow: auto;
}
</style>

<style lang="less">
.market-operate-popper.el-popper.is-dark.el-popover {
  --el-popover-bg-color: #1a1a1a;
  --el-popover-border-color: #2e2e2e;
  --el-popover-padding: 0;
}
</style>
