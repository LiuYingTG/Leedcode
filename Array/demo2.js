// 找出多维数组的最大值
function funcArrMax(arr){
  var res=[]
  arr.forEach(item=>{
    res.push(Math.max(...item))
  })
  return res
}
var arr=[[1,2,3],[4,2,8],[9,32,5],[0,5,23,12]]

console.log(funcArrMax(arr))