<template>
  <el-button type="primary" :disabled="!props?.data?.length" @click="dialogTableVisible = true">添加静态参数</el-button>
  <teleport to='body'>
    <el-dialog v-model="dialogTableVisible" title="添加静态参数">
      <el-form label-position="right" label-width="auto" :rules="rules" ref="form" :stripe="true" :model="addData">
        <el-form-item label="静态参数" prop="attr_name">
          <el-input v-model="addData.attr_name" autocomplete="off" size="large" />
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
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus';
import { AddMany } from '@/api/params'


let emits = defineEmits(['add'])


let form = ref(null)


let rules = reactive({
  attr_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
  ]
})


let dialogTableVisible = ref(false)

let props = defineProps(['data'])


let addData = reactive({
  attr_name: '',
  attr_sel: 'only',
})

function clear() {
  dialogTableVisible.value = false
  addData.attr_name = ''
  ElMessage({
    type: 'info',
    message: '已取消',
    duration: 1000
  })
}


function submitForm() {
  dialogTableVisible.value = false
  form.value.validate((valid) => {
    console.log(props.data);
    if (valid) {
      AddMany(props.data[1].cat_id, addData).then(res => {
        ElMessage({
          type: 'success',
          message: '添加成功',
          duration: 1000
        })
      })
      emits('add', 'only')
    } else {
      return false
    }
  })
}
</script>








<style lang="less" scoped></style>