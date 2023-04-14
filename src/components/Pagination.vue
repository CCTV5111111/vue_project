<template >
  <div class="demo-pagination-block">
    <el-pagination v-model:current-page="currentPage" :page-size="pagesize" :page-sizes="pagesizes" layout="total, sizes, prev, pager, next, jumper"
      :total="formatTotal" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>
<script >
export default {
  name: 'Pagination',
  data() {
    return {
      currentPage: 1,
    }
  },


  props: ['total', 'pagesize', 'pagesizes'],

  emits: ['pagesizechange', 'currentpagechange'],

  methods: {
    handleSizeChange(val) {
      this.$emit('pagesizechange', val)
    },
    handleCurrentChange(val) {
      this.$emit('currentpagechange', val)
    }
  },

  computed: {
    formatTotal() {
      return parseInt(this.total)
    },
  },
}
</script>

<style lang="less" scoped>
.demo-pagination-block {
  margin-top: 20px;
}

.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>