import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/vue/login/getLoginToken',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/vue/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/vue/login/getUserInfo',
    method: 'get',
    params: { token }
  })
}

