<template>
  <div>
    <div class="gva-search-box">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
      <el-form-item label="创建时间">
      <el-date-picker v-model="searchInfo.startCreatedAt" type="datetime" placeholder="开始时间"></el-date-picker>
       —
      <el-date-picker v-model="searchInfo.endCreatedAt" type="datetime" placeholder="结束时间"></el-date-picker>
      </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" icon="search" @click="onSubmit">查询</el-button>
          <el-button size="small" icon="refresh" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
        <div class="gva-btn-list">
            <el-button size="small" type="primary" icon="plus" @click="openDialog">新增</el-button>
            <el-popover v-model:visible="deleteVisible" placement="top" width="160">
            <p>确定要删除吗？</p>
            <div style="text-align: right; margin-top: 8px;">
                <el-button size="small" type="primary" link @click="deleteVisible = false">取消</el-button>
                <el-button size="small" type="primary" @click="onDelete">确定</el-button>
            </div>
            <template #reference>
                <el-button icon="delete" size="small" style="margin-left: 10px;" :disabled="!multipleSelection.length" @click="deleteVisible = true">删除</el-button>
            </template>
            </el-popover>
        </div>
        <el-table
        ref="multipleTable"
        style="width: 100%"
        tooltip-effect="dark"
        :data="tableData"
        row-key="ID"
        @selection-change="handleSelectionChange"
        >
        <el-table-column type="selection" width="55" />
        <el-table-column align="left" label="日期" width="180">
            <template #default="scope">{{ formatDate(scope.row.CreatedAt) }}</template>
        </el-table-column>
         <el-table-column align="left" label="创建日期" width="180">
            <template #default="scope">{{ formatDate(scope.row.createTime) }}</template>
         </el-table-column>
         <el-table-column align="left" label="更新日期" width="180">
            <template #default="scope">{{ formatDate(scope.row.updateTime) }}</template>
         </el-table-column>
        <el-table-column align="left" label="栏目名称" prop="name" width="120" />
        <el-table-column align="left" label="父级id" prop="pid" width="120" />
        <el-table-column align="left" label="排序" prop="sort" width="120" />
        <el-table-column align="left" label="类型" prop="type" width="120" />
        <el-table-column align="left" label="图片链接" prop="imageLink" width="120" />
        <el-table-column align="left" label="状态" prop="state" width="120" />
        <el-table-column align="left" label="备注" prop="remark" width="120" />
        <el-table-column align="left" label="医院组织代码" prop="hospitalOrgCode" width="120" />
        <el-table-column align="left" label="删除状态" prop="isDel" width="120" />
        <el-table-column align="left" label="按钮组">
            <template #default="scope">
            <el-button type="primary" link icon="edit" size="small" class="table-button" @click="updateHealthColumnFunc(scope.row)">变更</el-button>
            <el-button type="primary" link icon="delete" size="small" @click="deleteRow(scope.row)">删除</el-button>
            </template>
        </el-table-column>
        </el-table>
        <div class="gva-pagination">
            <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :current-page="page"
            :page-size="pageSize"
            :page-sizes="[10, 30, 50, 100]"
            :total="total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            />
        </div>
    </div>
    <el-dialog v-model="dialogFormVisible" :before-close="closeDialog" title="弹窗操作">
      <el-form :model="formData" label-position="right" ref="elFormRef" :rules="rule" label-width="80px">
        <el-form-item label="创建日期:"  prop="createTime" >
          <el-date-picker v-model="formData.createTime" type="date" style="width:100%" placeholder="选择日期" :clearable="true"  />
        </el-form-item>
        <el-form-item label="更新日期:"  prop="updateTime" >
          <el-date-picker v-model="formData.updateTime" type="date" style="width:100%" placeholder="选择日期" :clearable="true"  />
        </el-form-item>
        <el-form-item label="栏目名称:"  prop="name" >
          <el-input v-model="formData.name" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="父级id:"  prop="pid" >
          <el-input v-model.number="formData.pid" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="排序:"  prop="sort" >
          <el-input v-model.number="formData.sort" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="类型:"  prop="type" >
          <el-input v-model="formData.type" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="图片链接:"  prop="imageLink" >
          <el-input v-model="formData.imageLink" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="状态:"  prop="state" >
          <el-input v-model="formData.state" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="备注:"  prop="remark" >
          <el-input v-model="formData.remark" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="医院组织代码:"  prop="hospitalOrgCode" >
          <el-input v-model="formData.hospitalOrgCode" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="删除状态:"  prop="isDel" >
          <el-input v-model="formData.isDel" :clearable="true"  placeholder="请输入" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button size="small" @click="closeDialog">取 消</el-button>
          <el-button size="small" type="primary" @click="enterDialog">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'HealthColumn'
}
</script>

<script setup>
import {
  createHealthColumn,
  deleteHealthColumn,
  deleteHealthColumnByIds,
  updateHealthColumn,
  findHealthColumn,
  getHealthColumnList
} from '@/api/healthColumn'

// 全量引入格式化工具 请按需保留
import { getDictFunc, formatDate, formatBoolean, filterDict } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'

// 自动化生成的字典（可能为空）以及字段
const formData = ref({
        createTime: new Date(),
        updateTime: new Date(),
        name: '',
        pid: 0,
        sort: 0,
        type: '',
        imageLink: '',
        state: '',
        remark: '',
        hospitalOrgCode: '',
        isDel: '',
        })

// 验证规则
const rule = reactive({
})

const elFormRef = ref()


// =========== 表格控制部分 ===========
const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])
const searchInfo = ref({})

// 重置
const onReset = () => {
  searchInfo.value = {}
}

// 搜索
const onSubmit = () => {
  page.value = 1
  pageSize.value = 10
  getTableData()
}

// 分页
const handleSizeChange = (val) => {
  pageSize.value = val
  getTableData()
}

// 修改页面容量
const handleCurrentChange = (val) => {
  page.value = val
  getTableData()
}

// 查询
const getTableData = async() => {
  const table = await getHealthColumnList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
  if (table.code === 0) {
    tableData.value = table.data.list
    total.value = table.data.total
    page.value = table.data.page
    pageSize.value = table.data.pageSize
  }
}

getTableData()

// ============== 表格控制部分结束 ===============

// 获取需要的字典 可能为空 按需保留
const setOptions = async () =>{
}

// 获取需要的字典 可能为空 按需保留
setOptions()


// 多选数据
const multipleSelection = ref([])
// 多选
const handleSelectionChange = (val) => {
    multipleSelection.value = val
}

// 删除行
const deleteRow = (row) => {
    ElMessageBox.confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
            deleteHealthColumnFunc(row)
        })
    }


// 批量删除控制标记
const deleteVisible = ref(false)

// 多选删除
const onDelete = async() => {
      const ids = []
      if (multipleSelection.value.length === 0) {
        ElMessage({
          type: 'warning',
          message: '请选择要删除的数据'
        })
        return
      }
      multipleSelection.value &&
        multipleSelection.value.map(item => {
          ids.push(item.ID)
        })
      const res = await deleteHealthColumnByIds({ ids })
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
        if (tableData.value.length === ids.length && page.value > 1) {
          page.value--
        }
        deleteVisible.value = false
        getTableData()
      }
    }

// 行为控制标记（弹窗内部需要增还是改）
const type = ref('')

// 更新行
const updateHealthColumnFunc = async(row) => {
    const res = await findHealthColumn({ ID: row.ID })
    type.value = 'update'
    if (res.code === 0) {
        formData.value = res.data.rehealthColumn
        dialogFormVisible.value = true
    }
}


// 删除行
const deleteHealthColumnFunc = async (row) => {
    const res = await deleteHealthColumn({ ID: row.ID })
    if (res.code === 0) {
        ElMessage({
                type: 'success',
                message: '删除成功'
            })
            if (tableData.value.length === 1 && page.value > 1) {
            page.value--
        }
        getTableData()
    }
}

// 弹窗控制标记
const dialogFormVisible = ref(false)

// 打开弹窗
const openDialog = () => {
    type.value = 'create'
    dialogFormVisible.value = true
}

// 关闭弹窗
const closeDialog = () => {
    dialogFormVisible.value = false
    formData.value = {
        createTime: new Date(),
        updateTime: new Date(),
        name: '',
        pid: 0,
        sort: 0,
        type: '',
        imageLink: '',
        state: '',
        remark: '',
        hospitalOrgCode: '',
        isDel: '',
        }
}
// 弹窗确定
const enterDialog = async () => {
     elFormRef.value?.validate( async (valid) => {
             if (!valid) return
              let res
              switch (type.value) {
                case 'create':
                  res = await createHealthColumn(formData.value)
                  break
                case 'update':
                  res = await updateHealthColumn(formData.value)
                  break
                default:
                  res = await createHealthColumn(formData.value)
                  break
              }
              if (res.code === 0) {
                ElMessage({
                  type: 'success',
                  message: '创建/更改成功'
                })
                closeDialog()
                getTableData()
              }
      })
}
</script>

<style>
</style>
