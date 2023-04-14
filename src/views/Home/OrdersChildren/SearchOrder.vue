<template>
  <el-input v-model="input" placeholder="请输入内容" size="large" style="width: 450px;" clearable @clear="clearCommit">
    <template #append>
      <el-button icon="Search" @click="search" size="large"></el-button>
    </template>
  </el-input>
</template>




<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus';


let emits = defineEmits(['search'])


let input = ref('')



function search() {
  console.log(input.value)
  if (input.value === '') {
    ElMessage.error('请输入内容')
    return false
  } else {
    emits('search', input.value)
  }
}

function clearCommit() {
  emits('search', '')
}


</script>











<style lang="less" scoped></style>