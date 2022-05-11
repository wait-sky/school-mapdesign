import request from '@/utils/request'

// 登录接口
export const apiLogin = (data) => {
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}

// 注册接口
export const apiRegister = (data) => {
  return request({
    url: '/register',
    method: 'POST',
    data
  })
}

// 欢迎页新闻接口
export const webComeList = () => {
  return request({
    url: '/system/news/getList?pageNum=1&pageSize=10',
    method: 'GET'
  })
}

// 标语检索，标语修复
export const slogan = (params) => {
  return request({
    url: '/system/slogan/getList',
    method: 'GET',
    params
  })
}

// 新闻列表
export const news = (params) => {
  return request({
    url: '/system/news/getList',
    method: 'GET',
    params
  })
}

// 单字检索
export const char = (params) => {
  return request({
    url: '/system/char/getList',
    method: 'GET',
    params
  })
}

// 用户论坛
export const bbs = (params) => {
  return request({
    url: '/system/bbs/getList',
    method: 'GET',
    params
  })
}

// 个人中心
export const getInfo = () => {
  return request({
    url: '/getInfo',
    method: 'GET',
    token: true
  })
}

// 获取头像
export const getAvatar = () => {
  return request({
    url: '/system/user/profile',
    method: 'GET',
    token: true
  })
}

// 获取头像
export const logout = () => {
  return request({
    url: '/logout',
    method: 'POST',
    token: true
  })
}

// 上传封面图片
export const uploadAvatar = (data) => {
  return request({
    url: '/system/tool/avatar',
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    // 上传方法控制
    transformRequest: [
      function() {
        return data
      }
    ]
  })
}

// 发布文章
export const publish = (data) => {
  return request({
    url: '/system/bbs',
    method: 'POST',
    data,
    token: true
  })
}

// 发布文章
export const mapNum = () => {
  return request({
    url: '/system/map/num',
    method: 'GET'
  })
}

// 获取评论
export const getComments = () => {
  return request({
    url: '/system/comments/getList',
    method: 'GET'
  })
}

// 获取评论
export const publishComments = data => {
  return request({
    url: '/system/comments',
    method: 'POST',
    data,
    token: true
  })
}
