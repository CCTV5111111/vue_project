<template>
  <Breadcrumb />
  <div class="box">
    <SearchOrder @search="SearchOrders" />
    <TableOrder :list="list" @table="getList" />
    <Pagination :pagesize="pages.pagesize" :pagesizes="pagesizes" :total="total" @pagesizechange="pagesizechange"
      @currentpagechange="currentpagechange" />
  </div>
</template>




<script setup>
import Breadcrumb from '../../components/Breadcrumb.vue';
import SearchOrder from './OrdersChildren/SearchOrder.vue';
import TableOrder from './OrdersChildren/TableOrder.vue';
import Pagination from '../../components/Pagination.vue';
import { getOrderList } from '@/api/order.js'
import { ref, reactive } from 'vue'


function SearchOrders(val) {
  list.value = []
  pages.query = val
  getList()
}



function currentpagechange(val) {
  list.value = []
  pages.pagenum = val
  getList()
}


function pagesizechange(val) {
  list.value = []
  pages.pagesize = val
  getList()
}




let pagesizes = [5, 10, 15, 20]


let total = ref(0)


let list = ref([])


let pages = reactive({
  query: '',
  pagenum: 1,
  pagesize: 10,
})


function getList() {
  list.value = []
  getOrderList(pages).then(res => {
    console.log(res);
    total.value = res.data.total
    list.value = res.data.goods
  })
}

getList()






</script>









<style lang="less" scoped>
.box {
  background: #fff;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15)
}
</style>