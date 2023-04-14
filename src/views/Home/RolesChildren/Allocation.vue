<template>
  <el-button type="warning" icon="Menu" style="width: 100px;" @click="getList(props.row)">分配权限</el-button>
  <teleport to='body'>
    <el-dialog v-model="dialogFormVisible" title="分配权限">
      <el-tree :data="tree" show-checkbox :default-checked-keys="defaultKeys" :props="defaultProps" :default-expand-all="true" node-key="id"
        ref="treeRef" @close="setRightDialogClosed" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="clear">取消</el-button>
          <el-button type="primary" @click="commit">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </teleport>
</template>



<script setup>
import { ref, reactive } from 'vue'
import { getrightsList, impowerRole } from '@/api/roles'
import { ElMessage } from 'element-plus';



let treeRef = ref(null)

function setRightDialogClosed() {
  defaultKeys.value = []
}

function clear() {
  dialogFormVisible.value = false
  ElMessage.info('取消分配权限')
  defaultKeys.value = []
}




function commit() {
  let keys = treeRef.value.getCheckedKeys()
  let halfCheckedKeys = treeRef.value.getHalfCheckedKeys()
  let ids = [...keys, ...halfCheckedKeys]
  const idStr = ids.join(',')
  impowerRole(props.row.id, idStr).then(res => {
    if (res.meta.status === 200) {
      dialogFormVisible.value = false
      emits('rights')
      ElMessage.success('分配权限成功')
    }
  })
}




















let dialogFormVisible = ref(false)
let props = defineProps(['row'])
let emits = defineEmits(['rights'])
let tree = reactive([])
let defaultKeys = reactive([])

const defaultProps = {
  children: 'children',
  label: 'authName',
}

function getList(v) {
  dialogFormVisible.value = true
  getLeafKeys(v, defaultKeys)
}

function getLeafKeys(node, arr) {
  if (!node.children) {
    return arr.push(node.id)
  }
  node.children.forEach(element => {
    getLeafKeys(element, arr)
  });
}

getrightsList('tree').then(res => {
  tree.push(...res.data)
})


</script>



<style lang="less" scoped></style>