<template>
  <el-button type="primary" icon="EditPen" size="large" @click="dialogFormVisible = true"></el-button>
  <teleport to='body'>
    <el-dialog v-model="dialogFormVisible" title="Shipping address">
      <el-form :model="props.row" size="large" ref="form" :rules="rules">
        <el-form-item label="订单价格" prop="order_price">
          <el-input v-model.number="props.row.order_price" autocomplete="off" type="number" />
        </el-form-item>
        <el-form-item>
          <span style="font-size: 14px;">是否付款</span>&nbsp;&nbsp;&nbsp;
          <el-radio-group v-model="props.row.pay_status" class="ml-4">
            <el-radio label="1" size="large">已付款</el-radio>
            <el-radio label="0" size="large">未付款</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <span style="font-size: 14px;">是否发货</span>&nbsp;&nbsp;&nbsp;
          <el-radio-group v-model="props.row.is_send" class="ml-4">
            <el-radio :label="1 || '是'" size="large">是</el-radio>
            <el-radio :label="0 || '否'" size="large">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="clear">取消</el-button>
          <el-button type="primary" @click="commit">
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
import { EditOrder } from '@/api/order'


let rules = {
  order_price: [
    { required: true, message: '请输入订单价格', trigger: 'blur' },
    { pattern: /^[1-9]\d*$/, message: '请输入正确的价格', trigger: 'blur' }
  ]
}


let emits = defineEmits(['edit'])



function commit() {
  form.value.validate(async (valid) => {
    if (valid) {
      let res = await EditOrder(props.row)
      if (res.meta.status === 201) {
        ElMessage({
          message: '修改成功',
          type: 'success',
          duration: 1000
        })
        dialogFormVisible.value = false
        form.value.resetFields()
        emits('edit')
      } else {
        ElMessage({
          message: '修改失败',
          type: 'error',
          duration: 1000
        })
      }
    } else {
      ElMessage({
        message: '请填写完整信息',
        type: 'warning',
        duration: 1000
      })
      return false
    }
  })
}




function clear() {
  dialogFormVisible.value = false
  form.value.resetFields()
  ElMessage({
    message: '取消修改',
    type: 'info',
    duration: 1000
  })
}



let form = ref(null)


let dialogFormVisible = ref(false)

let props = defineProps({
  row: {
    type: Object,
    default: {}
  }
})



let isSend = props.row.is_send === '是' ? '1' : '0'




</script>












<style lang="less" scoped></style>