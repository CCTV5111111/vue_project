<template>
  <Breadcrumb />
  <div class="box">
    <GoodSearch @search="searchGoods" />
    <GoodTable :tableData="tableData" @sen="getLis" />
    <Pagination :total="total" :pagesize="data.pagesize" :pagesizes="pagesizes" @pagesizechange="pagesizechange"
      @currentpagechange="currentpagechange" />
  </div>
</template>


<script setup>
import GoodSearch from './GoodsChildren/GoodSearch.vue'
import GoodTable from './GoodsChildren/GoodTable.vue'
import Pagination from '../../components/Pagination.vue'
import { getGoodsList } from '@/api/goods'
import { reactive, ref } from 'vue'

let data = reactive({
  query: '',
  pagenum: 1,
  pagesize: 10
})

let pagesizes = [10, 15, 20, 30]

let total = ref(0)

let tableData = reactive([])

function getLis() {
  tableData.length = 0
  getList()
}

function getList() {
  getGoodsList(data).then(res => {
    tableData.push(...res.data.goods)
    total.value = res.data.total
  })
}

getList()

function pagesizechange(val) {
  tableData.length = 0
  data.pagesize = val
  getList()
}


function currentpagechange(val) {
  tableData.length = 0
  data.pagenum = val
  getList()
}

function searchGoods(val) {
  tableData.length = 0
  data.query = val
  getList()
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