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
