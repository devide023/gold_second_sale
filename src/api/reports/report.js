import request from '@/utils/request.js'
function rep_rcno(rcno) {
  return request({
    url: '/report/rcno',
    method: 'get',
    params: {
      rcno: rcno
    }
  })
}
function rep_cruises(ksrq,jsrq){
  return request({
    url:'/report/cruisesdate',
    method:'get',
    params:{
      ksrq:ksrq,
      jsrq:jsrq
    }
  })
}
function cruises_rc(ksrq, jsrq,cruisesno) {
  return request({
    url: '/echarts/cruisesrc',
    method: 'get',
    params: {
      ksrq: ksrq,
      jsrq: jsrq,
      cruisesno: cruisesno
    }
  })
}
function cruises_class_rank(ksrq,jsrq,cruisesno)
{
  return request({
    url:'/report/cruises_class_rank',
    method:'get',
    params:{
      ksrq:ksrq,
      jsrq:jsrq,
      cruisesno:cruisesno
    }
  })
}
export default { rep_rcno,rep_cruises,cruises_rc,cruises_class_rank}
