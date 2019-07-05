import R from '@/utils/request';
import Q from 'querystring'
export function rolelist(querydata){
    return R({
        url:'/rolemgr/list',
        method:'post',
        data:Q.stringify(querydata)
    })
}
export function addrole(formdata){
    return R({
        url:'/rolemgr/add',
        method:'post',
        data:Q.stringify(formdata)
    })
}
export function editrole(entry){
    return R({
        url:'/rolemgr/edit',
        method:'post',
        data:Q.stringify(entry)
    })
}
export function delrole(id){
    return R({
        url:'/rolemgr/del',
        method:'get',
        params:{
            id:id
        }
    })
}
export function saverolemenus(formdata){
    return R({
        url:'/rolemgr/saverolemenus',
        method:'post',
        headers: {
            'Content-Type': 'application/json'
          },
        data:JSON.stringify(formdata)
    })
}
export function getrolemenu(data)
{
    return R({
        url:'/rolemgr/menusbyroleids',
        method:'post',
        headers: {
            'Content-Type': 'application/json'
          },
        data:JSON.stringify(data)
    });
}
export function saveroleusers(formdata){
    return R({
        url:'/rolemgr/saveroleusers',
        method:'post',
        headers: {
            'Content-Type': 'application/json'
          },
        data:JSON.stringify(formdata)
    })
}
export function getuserbyroleids(data)
{
    return R({
        url:'rolemgr/usersbyroleids',
        method:'post',
        headers: {
            'Content-Type': 'application/json'
          },
        data:JSON.stringify(data)
    })
}