<template >
  <div>
    <Breadcrumb />
    <div class="box">
      <SearchView @search="searchUser" @getUserMsg="add" />
      <UsersTable :tableData="tableData" @updateUser="update" @updateuser="getList" />
      <Pagination :total="tableData.total" :pagesize="pagesize" :pagesizes="[1, 2, 5, 10]" @pagesizechange="getLists" @currentpagechange="getListss" />
    </div>
  </div>
</template>
<script>
import { getUserList, addUser, changeUser } from '@/api/users.js'
import SearchView from '@/views/Home/UsersChildren/Search.vue'
import UsersTable from '@/views/Home/UsersChildren/UsersTable.vue'

export default {
  name: 'Users',
  components: {
    SearchView,
    UsersTable
  },
  data() {
    return {
      tableData: {},
      pagenum: 1,
      pagesize: 2,
      query: ''
    }
  },

  created() {
    this.getList()
  },
  methods: {
    update(uId, type) {
      console.log(uId, type);
      changeUser(uId, type).then(res => {
        if (res.meta.status === 200) {
          this.$ElMessage({
            type: 'success',
            message: '修改成功',
            duration: 1000
          })
          this.getList()
        } else {
          this.$ElMessage({
            type: 'error',
            message: '修改失败',
            duration: 1000
          })
        }
      })
    },

    getList() {
      getUserList(this.pagenum, this.pagesize, this.query).then(res => {
        this.tableData = res.data
        this.total = res.data.total
      })
    },
    getLists(val) {
      console.log(val);
      this.pagesize = val
      this.getList()
    },
    getListss(val) {
      console.log(val);
      this.pagenum = val
      this.getList()
    },
    searchUser(v) {
      this.query = v
      this.getList()
    },
    add(v) {
      addUser(v).then(res => {
        console.log(res);
        if (res.meta.status === 201) {
          this.$ElMessage({
            type: 'success',
            message: '添加成功',
            duration: 1000
          })
          this.getList()
        } else {
          this.$ElMessage({
            type: 'error',
            message: '添加失败',
            duration: 1000
          })
        }
      })
    }
  },
}
</script>
<style lang="less" scoped>
.box {
  background: #fff;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15)
}
</style>