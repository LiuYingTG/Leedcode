// 将多维数组转化为一维数组
function funcArr(arr){
  for(let i=0;i<arr.length;i++){
    if(Array.isArray(arr[i])){
      res.concat(funcArr(arr[i]))
    }else{
      res.push(arr[i])
    }

  }
}
var arr=[1,2,3,[1,25],[1,5,[4,6,10]]]
var res=[]
funcArr(arr)