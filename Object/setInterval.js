// setTimeout实现setInterval
function myset(func,time){
  let flag=true
  if(flag){
    setTimeout(function (){
      func()
      myset(func,time)
    },time)
  }
  return flag
}
function func(){
  console.log(123)
}
let timer=myset(func,1000)
console.log(timer)