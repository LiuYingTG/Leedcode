// 手写call
Function.prototype.myCall = function (context, ...args) {
  if (typeof this !== 'function') {
    throw Error('not a function')
  }
  context = context || window
  context.fn = this
  let res = context.fn(...args)
  delete context.fn
  return res
}
Function.prototype.myApply = function (context, args = []) {
  if (typeof this !== 'function') {
    throw Error('not a function')
  }
  context = context || window
  context.fn = this;
  let res = context.fn(...args)
  delete context.fn;
  return res
}
Function.prototype.myBind=function (context,...args){
  if(typeof this!="function"){
    throw Error('not a function')
  }
  context=context||window
  context.fn=this
  return function (...args2){
    context.fn(...args,...args2)
  }
}
let a = {
  name: 'LY',
  func1() {
    console.log(this.name)
  }
}

let b = {
  name: 'BB',
  func1(age, sex) {
    console.log(this.name + 'bbbb')
    console.log(age)
    console.log(sex)
  }
}
// b.func1.call(a,'13','female')
b.func1.myApply(a, ['13', 'female'])
let fn=b.func1.myBind(a)
console.log(fn)
fn('13','female')