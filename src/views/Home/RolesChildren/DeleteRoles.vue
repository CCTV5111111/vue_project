<template>
  <el-button type="danger" icon="Delete" @click="centerDialogVisible = true" style="width: 70px;">删除</el-button>
  <teleport to='body'>
    <el-dialog v-model="centerDialogVisible" title="提示" width="420px" align-center>
      <el-icon style="vertical-align: middle;margin-right: 5px;">
        <WarningFilled color="#E6A23C" style="vertical-align: middle" />
      </el-icon>
      <span>
        此操作将删除该角色, 是否继续?
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="make">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </teleport>
</template>




<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus';
import { deleteRole } from '@/api/roles'

let centerDialogVisible = ref(false)
let emits = defineEmits(['delete'])
let props = defineProps(['row'])

function cancel() {
  centerDialogVisible.value = false
  ElMessage({
    type: 'info',
    message: '已取消删除',
    duration: 1000
  })
}


function make() {
  deleteRole(props.row.id).then(res => {
    if (res.meta.status === 200) {
      centerDialogVisible.value = false
      ElMessage({
        type: 'success',
        message: '删除成功',
        duration: 1000
      })
      emits('delete')
    } else {
      ElMessage({
        type: 'error',
        message: res.meta.msg,
        duration: 1000
      })
    }
  })
}

</script>




<style lang="">
  
</style>