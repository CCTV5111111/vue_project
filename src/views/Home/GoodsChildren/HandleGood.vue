<template>
  <el-button type="primary" icon="EditPen" @click="dialogFormVisible = true">编辑</el-button>
  <teleport to='body'>
    <el-dialog v-model="dialogFormVisible" title="编辑商品">
      <el-form :model="props.row" :rules="rules" ref="form">
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="props.row.goods_name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品价格" prop="goods_price">
          <el-input v-model.number="props.row.goods_price" autocomplete="off" type="number" />
        </el-form-item>
        <el-form-item label="商品重量" prop="goods_weight">
          <el-input v-model.number="props.row.goods_weight" autocomplete="off" type="number" />
        </el-form-item>
        <el-form-item label="商品数量" prop="goods_number">
          <el-input v-model.number="props.row.goods_number" autocomplete="off" type="number" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="clear">取消</el-button>
          <el-button type="primary" @click="editGood">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </teleport>
</template>





<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { editGoods } from "@/api/goods.js";

const dialogFormVisible = ref(false);

const emits = defineEmits(["edit"]);




const form = ref(null);

const props = defineProps(["row"]);

console.log(props.row);


function editGood() {
  dialogFormVisible.value = false;
  form.value.validate((valid) => {
    if (valid) {
      editGoods(props.row.goods_id, props.row).then((res) => {
        if (res.meta.status === 200) {
          ElMessage({
            message: "编辑成功",
            type: "success",
          });
          emits("edit");
        }
      });
    } else {
      ElMessage({
        message: res.meta.msg,
        type: "warning",
      });
      return false;
    }
  });


}

function clear() {
  dialogFormVisible.value = false;
  ElMessage({
    message: "取消编辑",
    type: "warning",
  });
}

const rules = {
  goods_name: [
    { required: true, message: "请输入商品名称", trigger: "blur" },
  ],
  goods_price: [
    { required: true, message: "请输入商品价格", trigger: "blur" },
    { type: 'number', message: "必须为数字" },
  ],
  goods_weight: [
    { required: true, message: "请输入商品重量", trigger: "blur" },
    { type: 'number', message: "必须为数字" },
  ],
  goods_number: [
    { required: true, message: "请输入商品数量", trigger: "blur" },
    { type: 'number', message: "必须为数字" },
  ],
}



</script>






<style lang="less" scoped></style>