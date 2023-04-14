<template>
  <el-button type="success" icon="Location" size="large" @click="dialogFormVisible = true"></el-button>
  <teleport to='body'>
    <el-dialog v-model="dialogFormVisible" title="物流进度">
      <el-timeline>
        <el-timeline-item v-for="(activity, index) in wuLiu" :key="activity.time" :timestamp="activity.time">
          {{ activity.context }}
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </teleport>
</template>






<script setup>
import { ref } from 'vue'
import wuLiu from '@/assets/wuliu.js'



let dialogFormVisible = ref(false)





</script>












<style lang="less" scoped></style>