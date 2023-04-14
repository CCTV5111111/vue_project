<template>
  <div>
    <el-input v-model="input" placeholder="请输入内容" size="large" :clearable="true" @clear="goHome">
      <template #append>
        <el-button icon="Search" @click="search"></el-button>
      </template>
    </el-input>
    <el-button type="primary" size="large" @click="goAdd">添加商品</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';

let input = ref('')

const router = useRouter()

let emits = defineEmits(['search'])

function search() {
  emits('search', input.value)
}

function goHome() {
  input.value = ''
  emits('search', input.value)
}

function goAdd() {
  router.push({
    name: 'add'
  })
}


</script>

<style lang="less" scoped>
.el-input {
  width: 350px;
  margin-right: 20px;
}
</style>