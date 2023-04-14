<template>
  <el-button icon="Delete" type="danger" @click="centerDialogVisible = true" size="large">删除</el-button>
  <teleport to='body'>
    <el-dialog v-model="centerDialogVisible" title="提示" width="420px" align-center>
      <el-icon :size="size" style="vertical-align: middle;margin-right: 5px;">
        <WarningFilled color="#E6A23C" style="vertical-align: middle" />
      </el-icon>
      <span>
        此操作将永久删除, 是否继续?
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
import { DeleteParamsMany } from '../../../api/params'

let centerDialogVisible = ref(false)
let size = ref('20')
let props = defineProps(['row'])
let emits = defineEmits(['delete'])


function make() {
  DeleteParamsMany(props.row.cat_id, props.row.attr_id).then(res => {
    if (res.meta.status === 200) {
      ElMessage({
        type: 'success',
        message: '删除成功',
        duration: 1000
      })
      centerDialogVisible.value = false
      if (props.row.attr_sel === 'many') {
        emits('delete', 'many')
      } else {
        emits('delete', 'only')
      }
    } else {
      ElMessage({
        type: 'error',
        message: '删除失败',
        duration: 1000
      })
    }
  })
}



const cancel = () => {
  centerDialogVisible.value = false
  ElMessage({
    type: 'info',
    message: '已取消删除',
    duration: 1000
  })
}


</script>







<style lang="less" scoped></style>