export function get_userroutes(menulist) {
  const routlist = [];
  const root = menulist.filter((item) => {
    return item.pid === 0;
  });
  root.forEach((item) => {
    let mitem = {};
    if (item.path === '/') {
      mitem = {
        path: item.path,
        component:()=>import('@/layout/index.vue'),
        hidden: true
      }
    } else {
      mitem = {
        path: item.path,
        name: item.code,
        component: (resolve) => require(['@/' + item.viewpath + '.vue'], resolve),
        meta: {
          title: item.title,
          icon: item.icon
        }
      };
    }
    const haschild = menulist.filter((sitem) => {
      return sitem.pid === item.id
    });
    if (haschild.length > 0) {
      mitem.children = submenu(menulist, item);
    }
    routlist.push(mitem);
  });
  routlist.push({
    path: '*',
    redirect: '/404',
    hidden: true
  });
  return routlist;
}

function submenu(list, item) {
  const slist = [];
  const sub = list.filter((sitem) => {
    return sitem.pid === item.id;
  })
  sub.forEach((i) => {
    let mitem = {};
    if (i.menutype !== 3) {
      mitem = {
        path: i.path,
        name: i.code,
        component: (resolve) => require(['@/' + i.viewpath + '.vue'], resolve),
        meta: {
          title: i.title,
          icon: i.icon
        }
      };
      const haschild = list.filter((c) => {
        return c.pid === i.id && c.menutype !== 3
      }).length;
      if (haschild > 0) {
        mitem.children = submenu(list, i);
      }
      const fun = list.filter(f => {
        return f.pid === i.id
      });
      if (fun.length > 0) {
        mitem.meta.fun = fun;
      }
      slist.push(mitem);
    }
  });
  return slist;
}
