<template>
  <el-button type="primary" icon="EditPen" @click="dialogFormVisible = true">编辑</el-button>
  <teleport to='body'>
    <el-dialog v-model="dialogFormVisible" title="编辑">
      <el-form :model="props.row" :rules="rules" ref="form">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="props.row.cat_name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="clear">取消</el-button>
          <el-button type="primary" @click="Edit">
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
import { editCategory } from "@/api/category";


let emits = defineEmits(["edit"])




function Edit() {
  form.value.validate((valid) => {
    if (valid) {
      editCategory(props.row).then((res) => {
        if (res.meta.status === 200) {
          ElMessage({
            message: "编辑分类成功",
            type: "success",
            duration: 2000,
          });
          emits("edit")
          dialogFormVisible.value = false;
          form.value.resetFields();
          return true;
        } else {
          ElMessage({
            message: "编辑分类失败",
            type: "error",
            duration: 2000,
          });
          return false;
        }
      });
    } else {
      return false;
    }
  });
}




let form = ref(null)


let rules = {
  cat_name: [
    { required: true, message: "请输入分类名称", trigger: "blur" },
  ],
};



function clear() {
  form.value.resetFields();
  dialogFormVisible.value = false;
  ElMessage({
    message: "取消编辑",
    type: "warning",
    duration: 2000,
  });
}




let props = defineProps({
  row: {
    type: Object,
    required: true,
  },
});


let dialogFormVisible = ref(false)

</script>





<style lang="less" scoped></style>