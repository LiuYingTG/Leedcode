// 手写打乱数组的方法
// 思路：从数组中第一位开始生成随机数，将生成位置的数值与现在的数值交换，直至最后一位
function arrayRandom(arr){
  let len=arr.length
  let ran=0
  for(let i=0;i<len;i++){
    ran=i+Math.round(Math.random()*(len-i-1));
    [arr[i],arr[ran]]  =[arr[ran],arr[i]];
  }
  return arr
}
var arr=[]
for(let i=0;i<10;i++){
  arr.push(i)
}
console.log(arrayRandom(arr))