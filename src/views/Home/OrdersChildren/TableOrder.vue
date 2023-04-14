<template>
  <el-table :data="list" stripe style="width: 100%;margin-top: 20px;" size="large" border>
    <el-table-column type="index" width="50"></el-table-column>
    <el-table-column prop="order_number" label="订单编号" width="317" />
    <el-table-column prop="order_price" label="订单价格" width="80" />
    <el-table-column label="是否付款">
      <template #default="scope">
        <el-tag class="ml-2" type="success" v-if="scope.row.pay_status === '1'">已付款</el-tag>
        <el-tag class="ml-2" type="danger" v-else>未付款</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="是否发货" prop="is_send">

    </el-table-column>
    <el-table-column label="下单时间">
      <template #default="scope">
        <span>{{ getTime(scope.row.create_time) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <EditOrder :row="scope.row" @edit="commitOrder" />
        <Logistics />
      </template>
    </el-table-column>
  </el-table>
</template>






<script setup>
import EditOrder from './EditOrder.vue'
import Logistics from './Logistics.vue'
import dayjs from 'dayjs';


function commitOrder() {
  emits('table')
}


let emits = defineEmits(['table'])


let props = defineProps({
  list: {
    type: Array,
    default: []
  }
})


function getTime(time) {
  return dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss')
}

</script>















<style lang="less" scoped></style>