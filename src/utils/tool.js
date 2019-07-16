const routelist=[];
let route_tempname = '';
let route_parentname = '';
export function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

export function root_routelist(list) {
  list.forEach(element => {
    if (!element.hidden) {
      const _title = element.meta ? element.meta.title : "";
      routelist.push({ path: element.path, name: _title });
      if (element.children) {
        route_parentname = _title;
        subroutelist(element.children);
      }
    }
  });
  return routelist;
}

function subroutelist(list){
  list.forEach(item => {
    if (!item.hidden) {
      const _title = item.meta ? item.meta.title : "";
      routelist.push({ path: item.path, name: route_parentname+'->'+_title });
      if (item.children) {
        route_parentname = _title;
        subroutelist(item.children);
      }
    }
  });
}