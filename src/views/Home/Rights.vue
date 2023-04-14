<template>
  <Breadcrumb />
  <div class="box">
    <el-table :data="tableData" style="width: 100%" border :stripe="true" size="large">
      <el-table-column type="index" :width="60"></el-table-column>
      <el-table-column prop="authName" label="权限名称" />
      <el-table-column prop="path" label="路径" />
      <el-table-column prop="level" label="级别">
        <template #default="scope">
          <el-tag v-if="scope.row.level == 0" size="large">一级</el-tag>
          <el-tag v-else-if="scope.row.level == 1" type="success" size="large">二级</el-tag>
          <el-tag v-else type="warning" size="large">三级</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>




<script setup>
import { getrightsList } from '@/api/roles'
import { ref } from 'vue'

const tableData = ref([])

function getList() {
  getrightsList('list').then(res => {
    tableData.value = res.data
  })
}

getList()

console.log(tableData.value);

</script>





<style lang="less" scoped>
.box {
  background: #fff;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15)
}
</style>