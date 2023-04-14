<template>
  <el-tooltip class="box-item" effect="dark" content="分配角色" placement="top-start">
    <el-button icon="Setting" type="warning" @click="centerDialogVisible = true"></el-button>
  </el-tooltip>
  <teleport to='body'>
    <el-dialog v-model="centerDialogVisible" title="分配角色" width="760px">
      <p>当前用户：<span>{{ username }}</span></p>
      <p style="margin: 20px 0;">当前角色：<span>{{ role_name }}</span></p>
      <p>分配新角色：
        <el-select v-model="value" class="m-2" placeholder="请选择" size="large">
          <el-option v-for="item in options" :key="item.rid" :label="item.label" :value="item.rid" />
        </el-select>
      </p>
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
import { ref, toRefs } from 'vue'
import { ElMessage } from 'element-plus';
import { allocationUser } from '@/api/users'

let centerDialogVisible = ref(false)
const props = defineProps(['row'])
let { username, role_name } = toRefs(props.row)
let emits = defineEmits(['userlist'])

let value = ref('')

let options = ref([
  {
    rid: '30',
    label: '主管'
  },
  {
    rid: '31',
    label: '测试角色'
  },
  {
    rid: '34',
    label: '测试角色2'
  },
  {
    rid: '39',
    label: '大发送到'
  }
  ,
  {
    rid: '40',
    label: 'test'
  },
  {
    rid: '41',
    label: 'dsdf'
  }
])

function cancel() {
  centerDialogVisible.value = false
  ElMessage({
    type: 'info',
    message: '已取消修改',
    duration: 1000
  })
}

function confirm() {
  centerDialogVisible.value = false
  console.log(props.row.id, value.value);
  allocationUser(props.row.id, value.value).then(res => {
    if (res.meta.status !== 200) {
      ElMessage({
        type: 'error',
        message: res.meta.msg,
        duration: 1000
      })
    } else {
      emits('userlist')
      ElMessage({
        type: 'success',
        message: '修改成功',
        duration: 1000
      })
    }
  })
}
</script>



<style lang="less" scoped></style>