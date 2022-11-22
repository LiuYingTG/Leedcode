
// 15. 实现数组的flat方法
function _flat(arr, depth) {
  if(!Array.isArray(arr) || depth <= 0) {
    return arr;
  }
  return arr.reduce((prev, cur) => {
    if (Array.isArray(cur)) {
      return prev.concat(_flat(cur, depth - 1))
    } else {
      return prev.concat(cur);
    }
  }, []);
}
let arr=[1,2,3,4,5,2,3,[1,2,3,2],
  [
    [
      21,
      [12],
      31
    ],
    23,23]
]
console.log(_flat(arr,2))