const routelist=[];
let route_temppath = '';
let route_parentpath = '';
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
      route_temppath = element.path;
      if (element.children) {
        route_parentpath = element.path;
        subroutelist(element.children);
      }
    }
  });
}

function subroutelist(list){
  list.forEach(item => {
    if (!item.hidden) {
      const _title = item.meta ? item.meta.title : "";
      route_temppath = route_parentpath + "/" + item.path;
      routelist.push({ path: route_temppath, name: _title });
      if (item.children) {
        route_parentpath = route_temppath;
        subroutelist(item.children);
      }
    }
  });
}

export {routelist}