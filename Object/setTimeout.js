// setInterval实现setTimeout
function myset(func,time){
  let timer=setInterval(function (){
    clearInterval(timer)
    func()
  },time)
  return timer
}
let res=myset(()=>{
  console.log(123)
},1000)
console.log(res)