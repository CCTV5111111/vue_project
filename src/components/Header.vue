<template >
  <el-menu class="el-menu-demo" mode="horizontal" background-color="#363D40" text-color="#fff" active-text-color="#ffd04b"
    style="height: 60px;padding: 5px 20px;width: 100%;justify-content: space-between;align-items: center;border: none;">
    <img src="../assets/logo.png" alt="" style="width: 266px;float: left;">
    <el-button type="info" @click="quit">退出</el-button>
  </el-menu>
</template>
<script>
export default {
  name: 'Header',

  methods: {
    quit() {
      sessionStorage.clear()
      this.$router.replace('/')
    }
  },
}
</script>
<style lang="less" scoped>
.el-button {
  height: 40px;
  // margin-top: 5px;
  width: 70px;
}
</style>