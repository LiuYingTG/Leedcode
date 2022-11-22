// 手写filter函数
Array.prototype.myFilter=function (fn){
  let res=[]
  if(typeof fn!='function'){
    console.error('not function')
  }
  for(let i=0;i<this.length;i++){
    if(fn(this[i])){
      res.push(this[i])
    }
  }
  return res
}
let arr=[10,20,3,24]
function fn(item){
  return item>10
}


let res2=arr.myFilter(fn)
console.log(res2)
console.log(arr)