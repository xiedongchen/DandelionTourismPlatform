import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue/login/getTransaction',
    method: 'get',
    params: query
  })
}
