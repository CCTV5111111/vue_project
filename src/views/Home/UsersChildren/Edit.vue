<template>
  <el-button icon="Edit" type="primary" @click="dialogTableVisible = true">
  </el-button>
  <teleport to='body'>
    <el-dialog v-model="dialogTableVisible" title="修改用户" style="z-index: 9999;" :modal="true">
      <el-form :model="row" label-position="right" label-width="auto" :rules="rules" ref="form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="row.username" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="row.email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="row.mobile" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </teleport>
</template>
<script>
import { editUser } from '@/api/users'

export default {
  name: 'Edit',
  emits: ['userlist'],
  data() {
    return {
      dialogTableVisible: false,
      rules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { pattern: /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/, message: '请输入合法的邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入合法的手机号', trigger: 'blur' }
        ]
      }
    }
  },
  props: ['id', 'row'],
  methods: {
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(this.row);
          editUser(this.id, this.row.email, this.row.mobile).then(res => {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.$emit('userlist')
          })
          this.dialogTableVisible = false
        } else {
          this.$message({
            type: 'error',
            message: '请检查输入内容!'
          })
          return false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.el-overlay {
  z-index: 9999;
}

.el-input {
  height: 40px;
}

.box {
  display: inline-block;
  margin-right: 5px;
}
</style>