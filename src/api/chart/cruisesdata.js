import request from '@/utils/request'
/**
 * 航次销售
 */
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
/**
 * 邮轮总销售
 */
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
/**
 * 邮轮分类销售
 */
function echart_cruises_class(ksrq,jsrq,cruisesno){
  return request({
    url: '/echarts/cruisesdic',
    method: 'get',
    params: {
      ksrq: ksrq,
      jsrq: jsrq,
      cruisesno:cruisesno
    }
  })
}
/**
 * 邮轮编号查航次销售及人数
 */
function echart_cruises_rcsale(ksrq,jsrq,cruisesno){
  return request({
    url: '/echarts/cruisesrc',
    method: 'get',
    params: {
      ksrq: ksrq,
      jsrq: jsrq,
      cruisesno:cruisesno
    }
  })
}

export default {
  echart_cruises,
  echart_cruises_income,
  echart_cruises_class,
  echart_cruises_rcsale
}
