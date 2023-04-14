<template>
  <el-button icon="Edit" type="primary" @click="dialogTableVisible = true" size="large">
    编辑
  </el-button>
  <teleport to='body'>
    <el-dialog v-model="dialogTableVisible" title="修改用户" style="z-index: 9999;" :modal="true">
      <el-form :model="row" label-position="right" label-width="auto" :rules="rules" ref="form" :stripe="true">
        <el-form-item label="动态参数" prop="attr_name">
          <el-input v-model="row.attr_name" autocomplete="off" size="large" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="clear">取消</el-button>
          <el-button type="primary" @click="submitForm">
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
import { EditParamsMany, EditParamsOnly } from '@/api/params'


let emits = defineEmits(['edit'])

let dialogTableVisible = ref(false)
let props = defineProps(['row'])
let form = ref(null)


function submitForm() {
  dialogTableVisible.value = false
  form.value.validate((valid) => {
    if (valid) {
      if (props.row.attr_sel === 'many') {
        EditParamsMany(props.row.cat_id, props.row.attr_id, props.row.attr_name, props.row.attr_vals).then(res => {
          ElMessage({
            type: 'success',
            message: '修改成功',
            duration: 1000
          })
          emits('edit')
          return true
        })
      } else {
        EditParamsOnly(props.row.cat_id, props.row.attr_id, props.row.attr_name, props.row.attr_vals).then(res => {
          ElMessage({
            type: 'success',
            message: '修改成功',
            duration: 1000
          })
          emits('edit', 'only')
          return true
        })
      }
    } else {
      ElMessage({
        type: 'error',
        message: '修改失败',
        duration: 1000
      })
      return false
    }
  })
}



function clear() {
  dialogTableVisible.value = false
  ElMessage({
    type: 'info',
    message: '取消修改',
    duration: 1000
  })
}


let rules = {
  attr_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
  ]
}

</script>









<style lang="less" scoped></style>