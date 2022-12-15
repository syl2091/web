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
        <el-form-item label="栏目id:" prop="columnId">
          <el-input v-model.number="formData.columnId" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="内容标题:" prop="contentTitle">
          <el-input v-model="formData.contentTitle" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="展现形式:" prop="displayForm">
          <el-input v-model="formData.displayForm" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="内容:" prop="content">
          <el-input v-model="formData.content" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="内容1:" prop="contentOne">
          <el-input v-model="formData.contentOne" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="内容2:" prop="contentTwo">
          <el-input v-model="formData.contentTwo" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="图片1:" prop="imageOne">
          <el-input v-model="formData.imageOne" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="图片2:" prop="imageTwo">
          <el-input v-model="formData.imageTwo" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="视频资产id:" prop="videoAssetsId">
          <el-input v-model="formData.videoAssetsId" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="状态:" prop="state">
          <el-input v-model="formData.state" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="删除状态:" prop="isDel">
          <el-input v-model="formData.isDel" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="医院组织代码:" prop="hospitalOrgCode">
          <el-input v-model="formData.hospitalOrgCode" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="外部链接url:" prop="url">
          <el-input v-model="formData.url" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="排序:" prop="sort">
          <el-input v-model.number="formData.sort" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="是否置顶:" prop="isTop">
          <el-switch v-model="formData.isTop" active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否" clearable ></el-switch>
        </el-form-item>
        <el-form-item label="发布时间:" prop="releaseTime">
          <el-date-picker v-model="formData.releaseTime" type="date" placeholder="选择日期" :clearable="true"></el-date-picker>
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
  name: 'HealthColumnContent'
}
</script>

<script setup>
import {
  createHealthColumnContent,
  updateHealthColumnContent,
  findHealthColumnContent
} from '@/api/healthColumnContent'

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

// 初始化方法
const init = async () => {
 // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (route.query.id) {
      const res = await findHealthColumnContent({ ID: route.query.id })
      if (res.code === 0) {
        formData.value = res.data.rehealthColumnContent
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
