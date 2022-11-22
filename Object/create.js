
//手写create方法
function create(fn){
  function res(){}
  res.prototype=fn
  return new res()
}
function FFn(){
  this.age=12
}
var AA={
  age:22
}

var obj1=Object.create(FFn)
var obj2=Object.create(AA)
console.log(obj1.age)
console.log(obj2.age)

function Man(name){
  this.name=name
  this.type='Man'
}
Man.prototype.say=function (){
  console.log(`I'm a ${this.type}`)
}

let female=Object.create(Man.prototype,{
  type:{
    value:'female'
  }
})
female.say()
