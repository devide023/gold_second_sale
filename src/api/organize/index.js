import R from '@/utils/request.js';
export function saveorgtree(data){
    return R({
        url:'/organize/saveorg',
        method:'post',
        headers: {
            'Content-Type': 'application/json'
          },
        data:JSON.stringify(data)
    })
}
export function getorgtree(){
    return R({
        url:'/organize/tree',
        method:'get'
    })
}
export function getnodeinfo(nodeid){
    return R({
        url:'/organize/nodeinfo',
        method:'get',
        params:{
            id:nodeid
        }
    })
}
export function updatenodeinfo(data){
    return R({
        url:'/organize/savenodeinfo',
        method:'post',
        headers: {
            'Content-Type': 'application/json'
          },
        data:JSON.stringify(data)
    })
}
export const orgtypelist=[{id:1,title:'集团'},{id:2,title:'公司'},{id:3,title:'分公司'},{id:4,title:'子公司'},{id:5,title:'部门'}]