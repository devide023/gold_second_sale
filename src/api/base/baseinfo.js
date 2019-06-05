import request from '@/utils/request';
export function get_cruisesinfo() {
  return request({
    url: '/baseinfo/cruisesinfo',
    method: 'get'
  })
}
