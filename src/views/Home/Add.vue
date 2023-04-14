<template>
  <Breadcrumb />
  <div class="box">
    <el-alert title="添加商品信息" type="info" show-icon center :closable="false" />
    <el-steps :active="active" finish-status="success" align-center style="margin: 20px 0;">
      <el-step title="基本信息" />
      <el-step title="商品参数" />
      <el-step title="商品属性" />
      <el-step title="商品图片" />
      <el-step title="商品内容" />
      <el-step title="完成" />
    </el-steps>
    <el-tabs tab-position="left" class="demo-tabs" v-model="active" :before-leave="beforeTabLeave" @tab-click="tabClicked">
      <el-tab-pane label="基本信息" :name="0">
        <el-form label-position="top" :model="goods" style="max-width: 460px;width: 100%;height: 550px;" size="large" :rules="rules">
          <el-form-item label="商品名称" prop="goods_name">
            <el-input v-model="goods.goods_name" />
          </el-form-item>
          <el-form-item label="商品价格" prop="goods_price">
            <el-input v-model="goods.goods_price" type="number" />
          </el-form-item>
          <el-form-item label="商品数量" prop="goods_number">
            <el-input v-model="goods.goods_number" type="number" />
          </el-form-item>
          <el-form-item label="商品重量" prop="goods_weight">
            <el-input v-model="goods.goods_weight" type="number" />
          </el-form-item>
          <el-form-item label="商品分类" style="width: 220px;">
            <el-cascader v-model="goods.value" :options="list" :props="props" />
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数" :name="1">
        <div style="display: flex;flex-direction: column;">
          <el-form-item v-for="(item, index) in checked1" :key="item.id" :label="item.attr_name">
            <div>
              <el-checkbox-group v-model="item.attr_vals" style="display: block;">
                <el-checkbox v-for="(it, index) in item.attr_vals" :key="it" :label="it" border></el-checkbox>
              </el-checkbox-group>
            </div>
          </el-form-item>
        </div>
      </el-tab-pane>
      <el-tab-pane label="商品属性" :name="2">
        <el-form label-position="top" :model="checked2" size="large">
          <el-form-item :label="item.attr_name" v-for="(item, index) in checked2" :key="item.attr_id">
            <el-input v-model="item.attr_vals" />
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品图片" :name="3">
        <el-upload class="upload-demo" action="http://127.0.0.1:8888/api/private/v1/upload" list-type="picture" :on-success="sucess" :headers="handers"
          :on-remove="remove" :on-preview="preview">
          <el-button type="primary">点击上传</el-button>
        </el-upload>
        <teleport to='body'>
          <el-dialog title="图片预览" v-model="previewVisible" width="50%">
            <img :src="previewPath" alt="" class="previewImg" />
          </el-dialog>
        </teleport>
      </el-tab-pane>
      <el-tab-pane label="商品内容" :name="4">
        <editor-content :editor="editor" />
        <el-button type="primary" class="btnAdd" @click="add" style="margin-top: 20px;">添加商品</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import Breadcrumb from '../../components/Breadcrumb.vue';
import { ref, reactive, computed } from 'vue'
import { getcategorieList, getAttributes, getAttributes2, commitGoods } from '@/api/add'
import { ElMessage } from 'element-plus'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';

const editor = useEditor({
  content: '<p>请输入商品内容！ 🎉</p>',
  extensions: [
    StarterKit,
  ],
})

const router = useRouter()

const store = useStore()

const active = ref(0)

const checked1 = ref([])

const checked2 = ref([])

const previewVisible = ref(false)

const previewPath = ref('')

let handers = {
  Authorization: sessionStorage.getItem('token')
}

let addForm = reactive({
  picArr: [],
  goods_introduce: editor.content
})


function add() {
  goods.goods_introduce = editor.content
  goods.pics = addForm.picArr
  goods.goods_cat = goods.value.join(',')
  delete goods.value
  commitGoods(goods).then(res => {
    console.log(res);
    if (res.meta.status === 201) {
      router.push({
        name: 'goods'
      })
      computed(() => store.state.goodsList.push(goods))
      ElMessage.success(res.meta.msg)
    } else {
      ElMessage.error(res.meta.msg)
    }
  })
}



function preview(file) {
  previewVisible.value = true
  previewPath.value = file.response.data.url
}



function remove(file) {
  const fileIndex = file.response.data.tmp_path
  let index = addForm.picArr.findIndex(item => item.pic === fileIndex)
  addForm.picArr.splice(index, 1)
  console.log(addForm);
}


function sucess(response) {
  const picInfo = {
    pic: response.data.tmp_path
  }
  addForm.picArr.push(picInfo)
}


function getAttributesList2(v) {
  getAttributes2(v).then(res => {
    console.log(res);
    checked2.value = res.data
  })
}


function tabClicked() {
  if (active.value === 0) {
    getAttributesList(goods.value[2])
  } else if (active.value === 1) {
    getAttributesList2(goods.value[2])
  }
}


function beforeTabLeave(activeName, oldActiveName) {
  if (oldActiveName == 0 && goods.value.length !== 3) {
    ElMessage.error('请选择商品分类')
    return false;
  }
}


function getAttributesList(v, v2) {
  getAttributes(v).then(res => {
    res.data?.forEach(item => {
      item.attr_vals = item.attr_vals.split(' ')
    })
    checked1.value = res.data
  })
}



const rules = {
  goods_name: [
    { required: true, message: '请输入商品名称', trigger: 'blur' },
  ],
  goods_price: [
    { required: true, message: '请输入商品价格', trigger: 'blur' },
  ],
  goods_number: [
    { required: true, message: '请输入商品数量', trigger: 'blur' },
  ],
  goods_weight: [
    { required: true, message: '请输入商品重量', trigger: 'blur' },
  ],
  value: [
    { required: true, message: '请选择商品分类', trigger: 'blur' },
  ],
}


const goods = reactive({
  goods_name: '',
  goods_price: '0',
  goods_number: '0',
  goods_weight: '0',
  value: [],
})

let list = ref([])

const value = ref([])

const props = {
  label: 'cat_name',
  value: 'cat_id',
  children: 'children',
  expandTrigger: 'hover',
}


function getList() {
  getcategorieList().then(res => {
    list.value.push(...res.data)
  })
}

getList()


</script>









<style lang="less" scoped>
::v-deep .ProseMirror {
  min-height: 300px;
  width: 900px;
  border: 1px solid #ddd;
  padding: 10px;
}

.box {
  box-sizing: content-box;
  background: #fff;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
}

::v-deep .el-input__inner {
  width: 1000px;
}

.el-checkbox {
  margin: 0 10px 0 0 !important;
}

.previewImg {
  position: relative;
  top: -100%;
  left: 50%;
  transform: translate(-50%);
  width: 200px;
  height: 200px;
}
</style>