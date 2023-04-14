<template>
  <div>
    <el-input v-model="searchText" placeholder="请输入内容" style="height: 40px;width: 400px;" :clearable="true" @clear="getList">
      <template #append>
        <el-button icon="Search" @click="searchUser" />
      </template>
    </el-input>
    <span><el-button type="primary" style="width: 100px;height: 40px;margin-left: 20px;" @click="isshow = true">添加用户</el-button></span>
    <el-dialog v-model="isshow" title="添加用户">
      <el-form :model="form" label-position="right" label-width="auto" :rules="rules" ref="form">
        <el-form-item label="用户名" height="40px" prop="username">
          <el-input v-model="form.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" autocomplete="off" type="password" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="form.mobile" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isshow = false">取消</el-button>
          <el-button type="primary" @click="submitForm">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'Search',
  data() {
    return {
      searchText: '',
      isshow: false,
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
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

  methods: {
    searchUser() {
      if (this.searchText === '') {
        this.$ElMessage({
          type: 'warning',
          message: '请输入内容',
          duration: 1000
        })
        return
      }
      this.$emit('search', this.searchText)
    },
    getList() {
      this.$emit('search', '')
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('getUserMsg', this.form)
          this.isshow = false
        } else {
          return false
        }
      })
    }
  },
}
</script>
<style lang="less" scoped>
.el-input {
  height: 40px;
}
</style>