import service from '@/utils/request'

// @Tags HealthColumn
// @Summary 创建HealthColumn
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.HealthColumn true "创建HealthColumn"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /healthColumn/createHealthColumn [post]
export const createHealthColumn = (data) => {
  return service({
    url: '/healthColumn/createHealthColumn',
    method: 'post',
    data
  })
}

// @Tags HealthColumn
// @Summary 删除HealthColumn
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.HealthColumn true "删除HealthColumn"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /healthColumn/deleteHealthColumn [delete]
export const deleteHealthColumn = (data) => {
  return service({
    url: '/healthColumn/deleteHealthColumn',
    method: 'delete',
    data
  })
}

// @Tags HealthColumn
// @Summary 删除HealthColumn
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除HealthColumn"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /healthColumn/deleteHealthColumn [delete]
export const deleteHealthColumnByIds = (data) => {
  return service({
    url: '/healthColumn/deleteHealthColumnByIds',
    method: 'delete',
    data
  })
}

// @Tags HealthColumn
// @Summary 更新HealthColumn
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.HealthColumn true "更新HealthColumn"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /healthColumn/updateHealthColumn [put]
export const updateHealthColumn = (data) => {
  return service({
    url: '/healthColumn/updateHealthColumn',
    method: 'put',
    data
  })
}

// @Tags HealthColumn
// @Summary 用id查询HealthColumn
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.HealthColumn true "用id查询HealthColumn"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /healthColumn/findHealthColumn [get]
export const findHealthColumn = (params) => {
  return service({
    url: '/healthColumn/findHealthColumn',
    method: 'get',
    params
  })
}

// @Tags HealthColumn
// @Summary 分页获取HealthColumn列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取HealthColumn列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /healthColumn/getHealthColumnList [get]
export const getHealthColumnList = (params) => {
  return service({
    url: '/healthColumn/getHealthColumnList',
    method: 'get',
    params
  })
}
