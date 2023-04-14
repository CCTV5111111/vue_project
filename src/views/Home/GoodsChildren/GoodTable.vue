<template>
  <el-table :data="props.tableData" style="width: 100%;margin-top: 20px;" size="large" border :stripe="true">
    <el-table-column type="index" :width="60" />
    <el-table-column prop="goods_name" label="商品名称" :width="630" />
    <el-table-column prop="goods_price" label="商品价格（元）" :width="90" />
    <el-table-column prop="goods_weight" label="商品重量" :width="90" />
    <el-table-column label="创建时间" :width="165">
      <template #default="scope">
        <span>{{ getTime(scope.row.add_time) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <HandleGood :row="scope.row" @edit="send" />
        <DeleteGood :row="scope.row" @del="send" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import HandleGood from './HandleGood.vue';
import DeleteGood from './DeleteGood.vue';
import dayjs from 'dayjs';
let props = defineProps(['tableData'])

let emits = defineEmits(['sen'])


function getTime(v) {
  return dayjs(v * 1000).format('YYYY-MM-DD HH:mm:ss')
}

function send() {
  emits('sen')
}

</script>

<style lang="less" scoped></style>