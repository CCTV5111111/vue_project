<template>
  <el-button type="primary" size="large" style="margin-bottom: 20px;" @click="dialogFormVisible = true">添加分类</el-button>
  <teleport to='body'>
    <el-dialog v-model="dialogFormVisible" title="提示">
      <el-form :model="form" ref="ruleFormRef" :rules="rules" label-position="right">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="form.cat_name" autocomplete="off" size="large" />
        </el-form-item>
        <el-form-item label="父级分类" style="margin-left: 10px;">
          <el-cascader v-model="value" :options="options" :props="props" @change="handleChange" size="large" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="clear">取消</el-button>
          <el-button type="primary" @click="Edit">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </teleport>
</template>





<script setup>
import { ref, reactive } from "vue";
import { getCategoriesList, addCategory } from '@/api/category'
import { ElMessage } from 'element-plus'


let emits = defineEmits(['add'])


function Edit() {
  ruleFormRef.value.validate((valid) => {
    console.log(value.value);
    if (value.value.length = 1) {
      form.value.cat_pid = value.value[0]
      form.value.cat_level = 1
    } else if (value.value.length = 2) {
      form.value.cat_pid = value.value[1]
      form.value.cat_level = 2
    }
    if (valid) {
      addCategory(form.value).then(res => {
        if (res.meta.status === 201) {
          ElMessage({
            message: '添加分类成功',
            type: 'success',
            duration: 2000
          })
          dialogFormVisible.value = false
          ruleFormRef.value.resetFields()
          emits('add')
          return true
        } else {
          ElMessage({
            message: '添加分类失败',
            type: 'error',
            duration: 2000
          })
          return false
        }
      })
    } else {
      ElMessage({
        message: '添加分类失败',
        type: 'error',
        duration: 2000
      })
      return false
    }
  })
}





function clear() {
  ruleFormRef.value.resetFields()
  dialogFormVisible.value = false
  ElMessage({
    message: '取消添加分类',
    type: 'info',
    duration: 2000
  })
}




function handleChange(val) {
  console.log(val)
}


const ruleFormRef = ref(null)


const rules = {
  cat_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
  ]
}



function getList() {
  getCategoriesList().then(res => {
    options = res.data
  })
}

getList()


let options = reactive([])


const value = ref([])


const props = {
  checkStrictly: true,
  value: 'cat_id',
  label: 'cat_name',
  expandTrigger: 'hover',
}



const dialogFormVisible = ref(false);

const form = ref({
  cat_name: '',
  cat_pid: '',
  cat_level: '',
});


</script>





<style lang="less" scoped></style>