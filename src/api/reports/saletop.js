import request from '@/utils/request';
export function menucodetop(ksrq, jsrq, cruisesno) {
  return request({
    url: '/report/menucodetop',
    method: 'get',
    params: {
      ksrq: ksrq,
      jsrq: jsrq,
      cruisesno: cruisesno
    }
  });
}
export function rcsaletop(ksrq, jsrq, cruisesno) {
  return request({
    url: '/report/rcsaletop',
    method: 'get',
    params: {
      ksrq: ksrq,
      jsrq: jsrq,
      cruisesno: cruisesno
    }
  });
}
export function placesaletop(ksrq, jsrq, cruisesno) {
  return request({
    url: '/report/placesaletop',
    method: 'get',
    params: {
      ksrq: ksrq,
      jsrq: jsrq,
      cruisesno: cruisesno
    }
  });
}

export function rcsaledetail(rcno,pageindex,pagesize) {
  return request({
    url: '/report/rcdetail',
    method: 'get',
    params: {
      rcno: rcno,
      pageindex:pageindex,
      pagesize:pagesize
    }
  });
}
