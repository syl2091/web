<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="创建日期:" prop="createTime">
          <el-date-picker v-model="formData.createTime" type="date" placeholder="选择日期" :clearable="true"></el-date-picker>
        </el-form-item>
        <el-form-item label="更新日期:" prop="updateTime">
          <el-date-picker v-model="formData.updateTime" type="date" placeholder="选择日期" :clearable="true"></el-date-picker>
        </el-form-item>
        <el-form-item label="栏目名称:" prop="name">
          <el-input v-model="formData.name" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="父级id:" prop="pid">
          <el-input v-model.number="formData.pid" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="排序:" prop="sort">
          <el-input v-model.number="formData.sort" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="类型:" prop="type">
          <el-input v-model="formData.type" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="图片链接:" prop="imageLink">
          <el-input v-model="formData.imageLink" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="状态:" prop="state">
          <el-input v-model="formData.state" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="备注:" prop="remark">
          <el-input v-model="formData.remark" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="医院组织代码:" prop="hospitalOrgCode">
          <el-input v-model="formData.hospitalOrgCode" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="删除状态:" prop="isDel">
          <el-input v-model="formData.isDel" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="save">保存</el-button>
          <el-button size="small" type="primary" @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
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
  updateHealthColumn,
  findHealthColumn
} from '@/api/healthColumn'

// 自动获取字典
import { getDictFunc } from '@/utils/format'
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
const route = useRoute()
const router = useRouter()

const type = ref('')
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

// 初始化方法
const init = async () => {
 // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (route.query.id) {
      const res = await findHealthColumn({ ID: route.query.id })
      if (res.code === 0) {
        formData.value = res.data.rehealthColumn
        type.value = 'update'
      }
    } else {
      type.value = 'create'
    }
}

init()
// 保存按钮
const save = async() => {
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
           }
       })
}

// 返回按钮
const back = () => {
    router.go(-1)
}

</script>

<style>
</style>
