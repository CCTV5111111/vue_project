<template >
  <el-table :data="tableData.users" style="width: 100%;" :stripe="true">
    <el-table-column type="index" />
    <el-table-column prop="username" label="姓名" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="mobile" label="电话" />
    <el-table-column prop="role_name" label="角色" />
    <el-table-column prop="mg_state" label="状态">
      <template #default="scope">
        <el-switch v-model="scope.row.mg_state" @change="update(scope.row.id, scope.row.mg_state)" />
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <Edit :id="scope.row.id" :row="scope.row" @userlist="updateUserList" />
        <Delete :id="scope.row.id" @userlist="updateUserList" />
        <Role :row="scope.row" @userlist="updateUserList" />
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import Edit from './Edit.vue'
import Delete from './Delete.vue'
import Role from './Role.vue'

export default {
  name: 'UsersTable',
  props: ['tableData'],
  data() {
    return {

    }
  },
  methods: {
    update(uId, type) {
      this.$emit('updateUser', uId, type)
    },
    updateUserList() {
      this.$emit('updateuser')
    }
  },

  components: {
    Edit,
    Delete,
    Role
  }
}
</script>
<style lang="less" scoped>
::v-deep .el-button [class*=el-icon]+span {
  margin-left: 0px;
}
</style>