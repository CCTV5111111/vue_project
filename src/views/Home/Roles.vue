<template>
  <Breadcrumb />
  <teleport to='body'>
    <el-dialog v-model="centerDialogVisible" title="提示" width="420px" align-center>
      <el-icon style="vertical-align: middle;margin-right: 5px;">
        <WarningFilled color="#E6A23C" style="vertical-align: middle" />
      </el-icon>
      <span>
        此操作将删除该权限, 是否继续?
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="make">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </teleport>
  <div class="box">
    <div>
      <div style="margin-bottom: 20px;"><el-button type="primary" style="width: 100px;height: 40px;" @click="dialogFormVisible = true">添加角色
          <teleport to='body'>
            <el-dialog v-model="dialogFormVisible" title="添加用户">
              <el-form :model="form" size="large" :rules="rules" ref="formBox">
                <el-form-item label="角色名称" prop="roleName">
                  <el-input v-model="form.roleName" />
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                  <el-input v-model="form.roleDesc" />
                </el-form-item>
              </el-form>
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="off">取消</el-button>
                  <el-button type="primary" @click="confirm">
                    确定
                  </el-button>
                </span>
              </template>
            </el-dialog>
          </teleport>
        </el-button></div>
      <el-table :data="tableData" border style="width: 100%" :stripe="true">
        <el-table-column type="expand">
          <template #default="props">
            <el-table :data="props.row.children" style="width: 100%">
              <el-table-column prop="authName">
                <template #default="scope">
                  <div class="aaaaaaa">
                    <div>
                      <el-tag class="mx-1" closable @close="handleClose(props.row.id, scope.row.id, props)" size="large">
                        {{ scope.row.authName }}
                      </el-tag>
                      <el-icon style="margin-left: 10px;">
                        <CaretRight />
                      </el-icon>
                    </div>
                    <div class="ab">
                      <template v-for="(item) in scope.row.children" :key="item.id">
                        <div
                          style=" display: grid;align-items: center;grid-template-columns: 22% auto; border-bottom: 1px solid #eee;padding: 7px 0px; "
                          class="abb">
                          <div>
                            <el-tag class="mx-1" closable @close="handleClose(props.row.id, item.id)" size="large" type="success">
                              {{ item.authName }}
                            </el-tag>
                            <el-icon style="margin-left: 5px;">
                              <CaretRight />
                            </el-icon>
                          </div>
                          <div>
                            <template v-for="(it) in item.children" :key="it.id">
                              <div style="float: left;">
                                <el-tag class="mx-1" closable @close="handleClose(props.row.id, it.id)" size="large" type="warning"
                                  style="margin: 7px;">
                                  {{ it.authName }}
                                </el-tag>
                              </div>
                            </template>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column type="index" width="50" />
        <el-table-column label="角色名称" prop="roleName" />
        <el-table-column label="角色描述" prop="roleDesc" />
        <el-table-column label="操作" width="300">
          <template #default="scope">
            <CompileRoles :row="scope.row" @edit="getRoles" />
            <DeletRoles :row="scope.row" @delete="getRoles" />
            <Allocation :row="scope.row" @rights="getRoles" />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>





<script setup>
import { getRolesList, addRole, deleteRoleRight } from '@/api/roles'
import CompileRoles from '@/views/Home/RolesChildren/CompileRoles.vue'
import DeletRoles from '@/views/Home/RolesChildren/DeleteRoles.vue'
import Allocation from '@/views/Home/RolesChildren/Allocation.vue'
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'


let idArr = reactive({
  roleId: '',
  rightId: ''
})



function handleClose(v, v2) {
  centerDialogVisible.value = true
  idArr.roleId = v
  idArr.rightId = v2
}


function make() {
  deleteRoleRight(idArr).then(res => {
    if (res.meta.status === 200) {
      ElMessage({
        type: 'success',
        message: '删除成功',
        duration: 1000
      })
      centerDialogVisible.value = false
      getRoles()
    }
  })
}





function cancel() {
  centerDialogVisible.value = false
  ElMessage({
    type: 'info',
    message: '已取消删除',
    duration: 1000
  })
}



let centerDialogVisible = ref(false)
















let tableData = ref([])

let formBox = ref(null)

let dialogFormVisible = ref(false)

let form = reactive({
  roleName: '',
  roleDesc: ''
})

let rules = reactive({
  roleName: [
    { required: true, message: '请输入角色名称', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
  ],
  roleDesc: [
    { required: true, message: '请输入角色描述', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ]
})

function getRoles() {
  getRolesList().then(res => {
    tableData.value = res.data
  })
}

function off() {
  dialogFormVisible.value = false
  formBox.value.resetFields()
  ElMessage({
    message: '取消添加',
    type: 'warning',
    duration: 1000
  })
}

function confirm() {
  formBox.value.validate(async valid => {
    if (valid) {
      const res = await addRole(form.roleName, form.roleDesc)
      if (res.meta.status === 201) {
        ElMessage({
          message: '添加成功',
          type: 'success',
          duration: 1000
        })
        dialogFormVisible.value = false
        formBox.value.resetFields()
        getRoles()
      }
    } else {
      ElMessage({
        message: res.meta.msg,
        type: 'error',
        duration: 1000
      })
      return false
    }
  })
}

getRoles()

</script>





<style lang="less" scoped>
.box {
  background: #fff;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15)
}

.aaaaaaa {
  display: grid;
  align-items: center;
  grid-template-columns: 20% auto;
}

.abb:last-child {
  border-bottom: none !important;
}
</style>