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
        <el-table-column align="left" label="栏目id" prop="columnId" width="120" />
        <el-table-column align="left" label="内容标题" prop="contentTitle" width="120" />
        <el-table-column align="left" label="展现形式" prop="displayForm" width="120" />
        <el-table-column align="left" label="内容" prop="content" width="120" />
        <el-table-column align="left" label="内容1" prop="contentOne" width="120" />
        <el-table-column align="left" label="内容2" prop="contentTwo" width="120" />
        <el-table-column align="left" label="图片1" prop="imageOne" width="120" />
        <el-table-column align="left" label="图片2" prop="imageTwo" width="120" />
        <el-table-column align="left" label="视频资产id" prop="videoAssetsId" width="120" />
        <el-table-column align="left" label="状态" prop="state" width="120" />
        <el-table-column align="left" label="删除状态" prop="isDel" width="120" />
        <el-table-column align="left" label="医院组织代码" prop="hospitalOrgCode" width="120" />
        <el-table-column align="left" label="外部链接url" prop="url" width="120" />
        <el-table-column align="left" label="排序" prop="sort" width="120" />
        <el-table-column align="left" label="是否置顶" prop="isTop" width="120">
            <template #default="scope">{{ formatBoolean(scope.row.isTop) }}</template>
        </el-table-column>
         <el-table-column align="left" label="发布时间" width="180">
            <template #default="scope">{{ formatDate(scope.row.releaseTime) }}</template>
         </el-table-column>
        <el-table-column align="left" label="按钮组">
            <template #default="scope">
            <el-button type="primary" link icon="edit" size="small" class="table-button" @click="updateHealthColumnContentFunc(scope.row)">变更</el-button>
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
        <el-form-item label="栏目id:"  prop="columnId" >
          <el-input v-model.number="formData.columnId" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="内容标题:"  prop="contentTitle" >
          <el-input v-model="formData.contentTitle" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="展现形式:"  prop="displayForm" >
          <el-input v-model="formData.displayForm" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="内容:"  prop="content" >
          <el-input v-model="formData.content" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="内容1:"  prop="contentOne" >
          <el-input v-model="formData.contentOne" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="内容2:"  prop="contentTwo" >
          <el-input v-model="formData.contentTwo" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="图片1:"  prop="imageOne" >
          <el-input v-model="formData.imageOne" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="图片2:"  prop="imageTwo" >
          <el-input v-model="formData.imageTwo" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="视频资产id:"  prop="videoAssetsId" >
          <el-input v-model="formData.videoAssetsId" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="状态:"  prop="state" >
          <el-input v-model="formData.state" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="删除状态:"  prop="isDel" >
          <el-input v-model="formData.isDel" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="医院组织代码:"  prop="hospitalOrgCode" >
          <el-input v-model="formData.hospitalOrgCode" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="外部链接url:"  prop="url" >
          <el-input v-model="formData.url" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="排序:"  prop="sort" >
          <el-input v-model.number="formData.sort" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="是否置顶:"  prop="isTop" >
          <el-switch v-model="formData.isTop" active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否" clearable ></el-switch>
        </el-form-item>
        <el-form-item label="发布时间:"  prop="releaseTime" >
          <el-date-picker v-model="formData.releaseTime" type="date" style="width:100%" placeholder="选择日期" :clearable="true"  />
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
  name: 'HealthColumnContent'
}
</script>

<script setup>
import {
  createHealthColumnContent,
  deleteHealthColumnContent,
  deleteHealthColumnContentByIds,
  updateHealthColumnContent,
  findHealthColumnContent,
  getHealthColumnContentList
} from '@/api/healthColumnContent'

// 全量引入格式化工具 请按需保留
import { getDictFunc, formatDate, formatBoolean, filterDict } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'

// 自动化生成的字典（可能为空）以及字段
const formData = ref({
        createTime: new Date(),
        updateTime: new Date(),
        columnId: 0,
        contentTitle: '',
        displayForm: '',
        content: '',
        contentOne: '',
        contentTwo: '',
        imageOne: '',
        imageTwo: '',
        videoAssetsId: '',
        state: '',
        isDel: '',
        hospitalOrgCode: '',
        url: '',
        sort: 0,
        isTop: false,
        releaseTime: new Date(),
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
  if (searchInfo.value.isTop === ""){
      searchInfo.value.isTop=null
  }
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
  const table = await getHealthColumnContentList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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
            deleteHealthColumnContentFunc(row)
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
      const res = await deleteHealthColumnContentByIds({ ids })
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
const updateHealthColumnContentFunc = async(row) => {
    const res = await findHealthColumnContent({ ID: row.ID })
    type.value = 'update'
    if (res.code === 0) {
        formData.value = res.data.rehealthColumnContent
        dialogFormVisible.value = true
    }
}


// 删除行
const deleteHealthColumnContentFunc = async (row) => {
    const res = await deleteHealthColumnContent({ ID: row.ID })
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
        columnId: 0,
        contentTitle: '',
        displayForm: '',
        content: '',
        contentOne: '',
        contentTwo: '',
        imageOne: '',
        imageTwo: '',
        videoAssetsId: '',
        state: '',
        isDel: '',
        hospitalOrgCode: '',
        url: '',
        sort: 0,
        isTop: false,
        releaseTime: new Date(),
        }
}
// 弹窗确定
const enterDialog = async () => {
     elFormRef.value?.validate( async (valid) => {
             if (!valid) return
              let res
              switch (type.value) {
                case 'create':
                  res = await createHealthColumnContent(formData.value)
                  break
                case 'update':
                  res = await updateHealthColumnContent(formData.value)
                  break
                default:
                  res = await createHealthColumnContent(formData.value)
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
