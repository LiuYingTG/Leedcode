// 手写数组的push方法
// 返回值为 arr.length
Array.prototype.arrayPush=function (...item){
  let ilen=item.length
  for(let i=0;i<ilen;i++){
    this[this.length]=item[i]
  }
  return this.length
}
let arr=[1,2,3,2]
arr.arrayPush(1,2,3,4,5)
console.log(arr)
console.log(arr.arrayPush(23,12,2,3,4))
