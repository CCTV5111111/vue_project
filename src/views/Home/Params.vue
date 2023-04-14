<template>
  <Breadcrumb />
  <div class="box">
    <el-alert title="注意：只允许为第三级分类设置相关参数" type="warning" show-icon :closable="false" />
    <div style="margin: 20px 0;">
      选择商品分类：<el-cascader v-model="value" :options="data" :props="hover" @change="handleChange" size="large" ref="cascader" />
    </div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleTab">
      <el-tab-pane label="动态参数" name="many"></el-tab-pane>
      <el-tab-pane label="静态属性" name="only"></el-tab-pane>
    </el-tabs>
    <AddMany v-if="activeName === 'many'" :data="attributesList" @add="getList" />
    <AddOnly v-else :data="attributesList" @add="getList" />
    <el-table :data="attributesList" style="width: 100%">
      <el-table-column prop="attr_name" label="参数名称" />
      <el-table-column label="操作">
        <template #default="scope">
          <EditParams :row="scope.row" @edit="getList" />
          <DeleteParams :row="scope.row" @delete="getList" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>



<script setup>
import Breadcrumb from '../../components/Breadcrumb.vue';
import { getcategorieList, getAttributes, getAttributes2 } from '@/api/add'
import { ref } from 'vue'
import { ElMessage } from 'element-plus';
import EditParams from './ParamsChildren/EditParams.vue';
import DeleteParams from './ParamsChildren/DeleteParams.vue';
import AddMany from './ParamsChildren/AddMany.vue';
import AddOnly from './ParamsChildren/AddOnly.vue';


function getList(v) {
  if (v === 'many') {
    getAttributes(value.value[2]).then(res => {
      attributesList.value = res.data
    })
  }
  if (v === 'only') {
    getAttributes2(value.value[2]).then(res => {
      attributesList.value = res.data
    })
  }
}



function handleTab(name) {
  if (name === 'many') {
    getAttributes(value?.value[2]).then(res => {
      attributesList.value = res.data
      if (res.meta.status !== 200) {
        ElMessage.warning('请先选择分类')
      }
    })

  }
  if (name === 'only') {
    getAttributes2(value?.value[2]).then(res => {
      attributesList.value = res.data
      if (res.meta.status !== 200) {
        ElMessage.warning('请先选择分类')
      }
    })
  }
}



const attributesList = ref([])

const data = ref([])

const activeName = ref('many')




const value = ref([])

const cascader = ref(null)


const hover = ref({
  value: 'cat_id',
  label: 'cat_name',
  children: 'children',
  expandTrigger: 'hover',
})



function handleChange(value) {
  if (value?.length !== 3) {
    attributesList.value = []
    ElMessage.warning('只允许为第三级分类设置相关参数')
  } else {
    getAttributes(value[2]).then(res => {
      attributesList.value = res.data
    })
  }
}




function getCategories() {
  getcategorieList().then(res => {
    data.value = res.data
  })
}

getCategories()

</script>











<style lang="less" scoped>
.box {
  background: #fff;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15)
}
</style>