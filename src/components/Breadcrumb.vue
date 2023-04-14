<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home/welcome' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{ crumbList[1].title[0] }}</el-breadcrumb-item>
    <el-breadcrumb-item :to="crumbList[1].path">{{ crumbList[1].title[1] }}</el-breadcrumb-item>

  </el-breadcrumb>
</template>
<script>
export default {
  name: 'Breadcrumb',
  computed: {
    crumbList() {
      return this.$route.matched.map(({ meta: { title }, path }) => {
        return {
          title,
          path,
        }
      })
    }
  }
}
</script>
<style lang="less" scoped></style>