// 19. 实现 add(1)(2)(3)(4)
// 可以实现任意数量数字相加，但是需要用+号隐式转换
function curring(){
  let res=[]
  function add(...args){
    res=[...res,...args]
    return add
  }
  add.toString=function (){
    return res.reduce((total,k)=>{
      return total+k
    },0)
  }
  return add
}
let add=curring()
console.log(add(1)(2)(3)(4).toString())
//长度固定时
function fn(a,b,c,d){
  return a+b+c+d
}
function curring2(fn,length){
  let len=length||fn.length
  return function (...args){
    if(args.length>=len){
      return fn.apply(this,args)
    }else{
      return  curring2(fn.bind(this,...args),len-args.length)
    }
  }
}
let add2=curring2(fn)
console.log(add2(1,2,3,4))
console.log(add2(1)(2,3,4))