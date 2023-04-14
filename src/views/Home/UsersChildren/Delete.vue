<template>
  <el-button icon="Delete" type="danger" @click="centerDialogVisible = true">
    <teleport to='body'>
      <el-dialog v-model="centerDialogVisible" title="提示" width="420px" align-center>
        <el-icon :size="size" style="vertical-align: middle;margin-right: 5px;">
          <WarningFilled color="#E6A23C" style="vertical-align: middle" />
        </el-icon>
        <span>
          此操作将删除该该用户, 是否继续?
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
  </el-button>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus';
import { deleteUser } from '@/api/users';

let size = ref('20')
let centerDialogVisible = ref(false)
let id = defineProps(['id'])
let emits = defineEmits(['userlist'])

const cancel = () => {
  centerDialogVisible.value = false
  ElMessage({
    type: 'info',
    message: '已取消删除',
    duration: 1000
  })
}

const make = () => {
  centerDialogVisible.value = false
  deleteUser(id.id).then(res => {
    if (res.meta.status !== 200) {
      ElMessage({
        type: 'error',
        message: res.meta.msg,
        duration: 1000
      })
    } else {
      ElMessage({
        type: 'success',
        message: '删除成功',
        duration: 1000
      })
      emits('userlist')
    }
  })
}
</script>

<style lang="less" scoped></style>