<template>
  <el-button type="primary" icon="EditPen" @click="dialogFormVisible = true">编辑</el-button>
  <teleport to='body'>
    <el-dialog v-model="dialogFormVisible" title="修改用户">
      <el-form :model="row" :rules="rules" size="large" ref="form">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="row.roleName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="row.roleDesc" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </teleport>
</template>




<script setup>
import { ref, toRef } from 'vue'
import { ElMessage } from 'element-plus';
import { editRole } from '@/api/roles'

let dialogFormVisible = ref(false)

let props = defineProps(['row'])
let row = toRef(props, 'row')
let form = ref(null)
let emits = defineEmits(['edit'])

let rules = ref({
  roleName: [
    { required: true, message: '请输入角色名称', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
  ],
  roleDesc: [
    { required: true, message: '请输入角色描述', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ]
})

function cancel() {
  dialogFormVisible.value = false
  form.value.resetFields()
  emits('edit')
  ElMessage({
    message: '取消修改',
    type: 'warning',
    duration: 1500
  })
}

function confirm() {
  form.value.validate(async valid => {
    if (valid) {
      let res = await editRole(row.value.id, row.value.roleName, row.value.roleDesc)
      if (res.meta.status === 200) {
        emits('edit')
        ElMessage({
          message: res.meta.msg,
          type: 'success',
          duration: 1500
        })
        dialogFormVisible.value = false
        form.value.resetFields()
      } else {
        ElMessage({
          message: res.meta.msg,
          type: 'error',
          duration: 1500
        })
      }
    }
  })
}

</script>



<style lang="less" scoped></style>