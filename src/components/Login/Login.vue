<template>
  <div class="box">
    <div class="login-box">
      <div class="avatar-box">
        <img src="../../assets/logo2.png" alt="">
      </div>
      <el-form :model="form" style="margin-top: -20px;" ref="form" :rules="rules" size="large">
        <el-form-item class="item" prop="username" style="height: 40px;">
          <el-input v-model="form.username" @blur="$refs.form.validateField('username')">
            <template #prefix>
              <el-icon>
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="item" prop="password" style="height: 40px;">
          <el-input v-model="form.password" type="password" @blur="$refs.form.validateField('password')">
            <template #prefix>
              <el-icon>
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-top: 30px;margin-left: 280px;flex-wrap: nowrap;">
          <el-button type="primary" @click="submitForm('form')">登录</el-button>
          <el-button type="info" @click="this.$refs.form.resetFields()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { User, Lock } from '@element-plus/icons-vue';
import { loginByUsername } from '@/api/login';
import { ElMessage } from 'element-plus'
import axios from 'axios'

export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度需要在 3 到 10 之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度需要在 6 到 15 之间', trigger: 'blur' }
        ]
      },
    }
  },

  components: {
    User,
    Lock
  },


  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          loginByUsername(this.form).then(res => {
            if (res.meta.status === 200) {
              ElMessage.success('恭喜！登录成功');
              sessionStorage.setItem('token', res.data.token);
              this.$router.push('/home');
              this.form = {
                username: '',
                password: '',
              }
            } else {
              this.$ElMessage.error(res.meta.msg);
            }
          })
        } else {
          this.$ElMessage.error('请检查输入的内容是否正确');
          return false
        }
      });
    }
  },

};
</script>

<style lang="less" scoped>
.el-button {
  width: 70px;
  height: 40px;
}


.box {
  width: 100%;
  height: 100%;
  background: #2b4b6b;
  position: relative;

  .login-box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 2px;

    .avatar-box {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 5px;
      box-shadow: 0 0 10px #ddd;
      margin: 0 auto;
      transform: translateY(-50%);
      background-color: #fff;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }

    .item {
      margin: 0px auto;
      width: 410px;
      height: 30px;

      &:first-child {
        margin-bottom: 20px;
      }

      &>div {
        height: 100%;
      }
    }

  }
}
</style>
