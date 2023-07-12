<template>
  <el-table
    :data="props.data"
    stripe
    :header-cell-style="{
      height: '49px',
      fontWeight: '400',
      fontSize: '14px',
      color: '#868E9B',
      background: '#F5F5F5',
      padding: '0 20px'
    }"
    cell-class-name="my-cell"
  >
    <el-table-column
      v-for="item in props.tableColumn"
      :label="item.label"
      :prop="item.prop"
      :align="item.align"
      :key="item"
    >
      <template #header v-if="item.temp">
        <div class="center-box">
          <div
            class="delete-all-btn qx"
            v-show="props.status !== 'showDeleteText'"
            @click="closeDelete(2)"
          >
            取消
          </div>
          <div class="delete-all-btn" @click="changeDelete()">
            {{ props.status === 'showDeleteText' ? '批量移除' : '移除' }}
          </div>
        </div>
      </template>
      <template #default="scope">
        <div v-if="item.label == '用户'" class="platform-icon">
          <img :src="scope.row.avatar" />
          <span>{{ scope.row.nickName }}</span>
        </div>
        <div v-if="item.label == '跟单用户'" class="platform-icon">
          <img src="@/assets/images/followOrder/okx-icon.svg" />
          <span>{{ scope.row.person }}</span>
        </div>
        <div v-if="item.label == '平台'" class="platform-icon">
          <img src="@/assets/images/followOrder/okx-icon.svg" />
          <span>{{ scope.row.aa }}</span>
        </div>
        <div v-if="item.label == '仓位'" class="temp">
          <div class="temp-title">{{ scope.row.bb }}</div>
          <div class="temp-box">
            <div>{{ scope.row.cc }} {{ scope.row.dd }}</div>
            <div>{{ scope.row.ff }}</div>
          </div>
        </div>
        <div v-if="item.label == '开仓价格'" class="temp">
          <div class="temp-title">{{ scope.row.gg }} USDT</div>
          <div class="temp-date">{{ scope.row.hh }}</div>
        </div>
        <div v-if="item.label == '当前价格'" class="temp">
          <div class="temp-title">{{ scope.row.ii }} USDT</div>
        </div>
        <div v-if="item.label == '保证金'" class="temp">
          <div class="temp-title">{{ scope.row.jj }} USDT</div>
        </div>
        <div v-if="item.label == '合约数量'" class="temp">
          <div class="temp-title">{{ scope.row.kk }} BTC</div>
        </div>
        <div v-if="item.label == '未结盈亏'" class="temp">
          <div class="temp-noyet">+{{ scope.row.oo }}%</div>
        </div>
        <div v-if="item.label == '已结盈亏'" class="temp">
          <div class="temp-noyet">+{{ scope.row.oo }}%</div>
        </div>
        <div v-if="item.label == '操作'" class="temp">
          <div class="temp-btn1" @click="showDialog(props.status, true)">
            {{ showText }}
          </div>
        </div>
        <div v-if="item.label == '批量移除'" class="temp center-box">
          <div
            v-show="props.status === 'showDeleteText'"
            class="temp-btn2"
            @click="showDialog('delete', true)"
          >
            移除
          </div>
          <div v-show="props.status === 'showDeleteBtn'" :style="s">
            <el-checkbox
              :style="s"
              v-model="scope.row.checked"
              @change="(val) => onChange(val, scope.row)"
            ></el-checkbox>
          </div>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
const s = ref({
  width: '25px',
  height: '25px'
});
const props = defineProps({
  data: Array,
  tableColumn: Array,
  status: Boolean | String
});

const showText = computed(() => {
  switch (props.status) {
    case 'now':
      return '市价平仓';
    case 'history':
      return '分享';
    default:
      return '';
  }
});

const emits = defineEmits([
  'showDialog',
  'changeDelete',
  'checkDelete',
  'onChange'
]);

const showDialog = (text, bool) => {
  console.log(text, 888);
  if (text == 'history') {
    console.log('history');
  } else {
    emits('showDialog', bool);
  }
};

const changeDelete = () => {
  if (props.status === 'showDeleteText') {
    emits('changeDelete', true);
  } else if (props.status === 'showDeleteBtn') {
    emits('checkDelete');
  }
};

const closeDelete = (val) => {
  // props.status === 'showDeleteText';
  emits('changeDelete', val);
};

const onChange = (val, item) => {
  console.log('onChange', val, item);
  emits('onChange', { val, item });
};
</script>

<style lang="scss" scoped>
.platform-icon {
  display: flex;
  align-items: center;
  & > img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
}
.temp {
  font-family: 'DIN';
  display: flex;
  flex-direction: column;
  justify-content: center;
  &-title {
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: #000000;
    text-align: left;
  }
  &-box {
    margin-top: 10px;
    display: flex;
    justify-content: left;
    div {
      padding: 2px 6px;
      margin-right: 10px;
      font-size: 12px;
      line-height: 15px;
      text-align: center;
      color: #868e9b;
      background-color: #eee;
    }
  }
  &-date {
    font-size: 14px;
    line-height: 17px;
    color: #868e9b;
    margin-top: 5px;
  }
  &-noyet {
    font-size: 18px;
    line-height: 22px;
    color: #0ecb81;
  }
  &-btn1 {
    padding: 10px 0;
    background: #000000;
    border-radius: 51px;
    font-size: 14px;
    line-height: 20px;
    color: #ffffff;
    cursor: pointer;
  }
  &-btn2 {
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    background: #ffffff;
    border: 1px solid #2e2e2e;
    border-radius: 20px;
    font-size: 14px;
    line-height: 20px;
    color: #000000;
    cursor: pointer;
  }
}
.center-box {
  display: flex;
  align-items: center;
  justify-content: center;
}
.delete-all-btn {
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  background: #000000;
  border: 1px solid #31daff;
  border-radius: 20px;
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
  cursor: pointer;
  &.qx {
    border: 1px solid #000;
    background: #fff;
    color: #000;
  }
}
::v-deep .my-cell {
  height: 88px;
  font-family: 'DIN';
  font-size: 18px;
  line-height: 22px;
  color: #000000;
  padding: 0 20px;
}
:deep(.el-checkbox__input) {
  width: 25px !important;
  height: 25px !important;
}
:deep(.el-checkbox__inner) {
  width: 25px !important;
  height: 25px !important;
}
:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  border-color: #31daff;
  background-color: #31daff;
}

:deep(.el-checkbox__inner::after) {
  width: 7px;
  height: 10px;
  border-color: #fff;
  top: 5px;
  left: 7px;
}
</style>
