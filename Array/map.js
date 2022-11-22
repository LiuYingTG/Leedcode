// 数组的map方法，返回值为操作后的数组，且不更改原数组
Array.prototype.myMap=function (fn){
  if(typeof  fn !== 'function'){
    throw Error('not function')
  }
  let res=[]
  for(let i=0;i<this.length;i++){
    res.push(fn(this[i]))
  }
  return res
}
function fn(item){
  return item*2
}
let arr=[1,2,3,4,5]
let res=arr.myMap(fn)
console.log(res)
console.log(arr)