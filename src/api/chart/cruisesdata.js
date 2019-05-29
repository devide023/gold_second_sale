import request from '@/utils/request'

function echart_cruises(ksrq, jsrq) {
  return request({
    url: '/echarts/chartcruises',
    method: 'get',
    params: {
      ksrq: ksrq,
      jsrq: jsrq
    }
  })
}

function echart_cruises_income(ksrq, jsrq) {
  return request({
    url: '/echarts/cruisesincome',
    method: 'get',
    params: {
      ksrq: ksrq,
      jsrq: jsrq
    }
  })
}
export default {
  echart_cruises,
  echart_cruises_income
}
