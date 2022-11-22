let arr1=[1,2,6,3,4,7]
let arr2=[1,6,2,2,3,5,76]
// 去重
arr1=[...new Set(arr1)]
console.log(arr1)
//求交集
let set2=new Set(arr2)
let arr3=arr1.filter(item=>{
  return set2.has(item)
})
console.log(arr3)