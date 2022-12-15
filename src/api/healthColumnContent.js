import service from '@/utils/request'

// @Tags HealthColumnContent
// @Summary 创建HealthColumnContent
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.HealthColumnContent true "创建HealthColumnContent"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /healthColumnContent/createHealthColumnContent [post]
export const createHealthColumnContent = (data) => {
  return service({
    url: '/healthColumnContent/createHealthColumnContent',
    method: 'post',
    data
  })
}

// @Tags HealthColumnContent
// @Summary 删除HealthColumnContent
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.HealthColumnContent true "删除HealthColumnContent"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /healthColumnContent/deleteHealthColumnContent [delete]
export const deleteHealthColumnContent = (data) => {
  return service({
    url: '/healthColumnContent/deleteHealthColumnContent',
    method: 'delete',
    data
  })
}

// @Tags HealthColumnContent
// @Summary 删除HealthColumnContent
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除HealthColumnContent"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /healthColumnContent/deleteHealthColumnContent [delete]
export const deleteHealthColumnContentByIds = (data) => {
  return service({
    url: '/healthColumnContent/deleteHealthColumnContentByIds',
    method: 'delete',
    data
  })
}

// @Tags HealthColumnContent
// @Summary 更新HealthColumnContent
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.HealthColumnContent true "更新HealthColumnContent"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /healthColumnContent/updateHealthColumnContent [put]
export const updateHealthColumnContent = (data) => {
  return service({
    url: '/healthColumnContent/updateHealthColumnContent',
    method: 'put',
    data
  })
}

// @Tags HealthColumnContent
// @Summary 用id查询HealthColumnContent
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.HealthColumnContent true "用id查询HealthColumnContent"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /healthColumnContent/findHealthColumnContent [get]
export const findHealthColumnContent = (params) => {
  return service({
    url: '/healthColumnContent/findHealthColumnContent',
    method: 'get',
    params
  })
}

// @Tags HealthColumnContent
// @Summary 分页获取HealthColumnContent列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取HealthColumnContent列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /healthColumnContent/getHealthColumnContentList [get]
export const getHealthColumnContentList = (params) => {
  return service({
    url: '/healthColumnContent/getHealthColumnContentList',
    method: 'get',
    params
  })
}
