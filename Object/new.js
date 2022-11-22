// new 新建一个对象
function createNew(fn,...args){
  console.log(args)
  if(typeof fn != 'function'){
    console.log(new Error('not function'))
  }
  let obj={}
  obj.__proto__=fn.prototype
  let value=fn.apply(obj,args)
  return value instanceof Object?value:obj
}
function Fn(name,age){
  this.name='name'
  this.age=age
}

var newFn=createNew(Fn,'Ly',23)
console.log(newFn)