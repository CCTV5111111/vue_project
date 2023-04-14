<template>
  <Breadcrumb />
  <div class="box">
    <AddCategory @add="getCategoryList" />
    <TableCategory :lis="list" @Table="getCategoryList"/>
    <Pagination :pagesize="pages.pagesize" :pagesizes="pagesizes" :total="total" @pagesizechange="handleSizeChange"
      @currentpagechange="handleCurrentChange" />
  </div>
</template>




<script setup>
import Breadcrumb from '../../components/Breadcrumb.vue';
import AddCategory from './CategoryChildren/AddCategory.vue';
import TableCategory from './CategoryChildren/TableCategory.vue'
import Pagination from '../../components/Pagination.vue'
import { getCategory } from '@/api/category'
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'


function handleSizeChange(val) {
  pages.pagesize = val
  list.value = []
  store.state.CategoryList = []
  getCategoryList()
}


function handleCurrentChange(val) {
  list.value = []
  pages.pagenum = val
  store.state.CategoryList = []
  getCategoryList()
}




const store = useStore()

const pagesizes = [2, 5, 7, 10]

let pages = reactive({
  pagenum: 1,
  pagesize: 2,
})

let total = ref(0)

let list = ref([])

function getCategoryList() {
  list.value = []
  getCategory(pages).then(res => {
    list.value = res.data.result
    total.value = res.data.total
    store.state.CategoryList = []
    store.state.CategoryList.push(...res.data.result)
  })
}

getCategoryList()







</script>




<style lang="less" scoped>
.box {
  background: #fff;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15)
}
</style>