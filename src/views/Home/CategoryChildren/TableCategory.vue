<template>
  <el-table :data="list" style="width: 100%" row-key="cat_id" border current-row-key="cat_pid" :stripe="true">
    <el-table-column label="#" type="index">
      <template #default="{ row, column, $index }">
        {{ computedIndex(row, column, $index) }}
      </template>
    </el-table-column>
    <el-table-column prop="cat_name" label="分类名称" />
    <el-table-column label="是否有效">
      <template #default="scope">
        <el-icon v-if="!scope.row.cat_deleted" color="lightgreen" :size="24">
          <SuccessFilled />
        </el-icon>
        <el-icon v-else size="24" color="#c20c0c">
          <CircleCloseFilled />
        </el-icon>
      </template>
    </el-table-column>
    <el-table-column label="排序">
      <template #default="scope">
        <el-tag :type="array[scope.row.cat_level].type">{{ array[scope.row.cat_level].msg }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <EditCategory :row="scope.row" @edit="commit" />
        <DeleteCategory :row="scope.row" @delete="commit" />
      </template>
    </el-table-column>
  </el-table>
</template>





<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex'
import EditCategory from '../CategoryChildren/EditCategory.vue'
import DeleteCategory from '../CategoryChildren/DeleteCategory.vue'


function commit() {
  emits('Table')
}


let emits = defineEmits(['Table'])



let store = useStore()

let list = computed(() => {
  return store.state.CategoryList
})

let array = [
  {
    type: '',
    msg: '一级'
  },
  {
    type: 'success',
    msg: '二级'
  },
  {
    type: 'warning',
    msg: '三级'
  }
]


function computedIndex(row, col, i) {
  if (row.cat_level !== 0) return '';

  return list.value.findIndex(item => item.cat_id == row.cat_id) + 1;
}
</script>






<style lang="less" scoped>
::v-deep .el-icon {
  display: none;
}

::v-deep .el-icon {
  display: block;
}

::v-deep .el-table__expand-icon {
  background: url('../../../assets/add.png') no-repeat center center;
  display: none;
}

::v-deep .el-table__expand-icon--expanded {
  background: url('../../../assets/minus.png') no-repeat center center;
}
</style>