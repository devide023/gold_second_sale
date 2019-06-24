export function currentdate() {
  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return y + '-' + m + '-' + d;
}
export function currentmonthfirst() {
  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  return y + '-' + m + '-' + '01';
}
export function formatdate(date) {
  const d = new Date(date);
  const yy = d.getFullYear();
  const mm = d.getMonth() + 1;
  const dd = d.getDate();
  return yy + "-" + mm + "-" + dd;
}
export function currentyearfirst() {
  const d = new Date();
  const yy = d.getFullYear();
  return yy + "-01-01";
}
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
