import {a} from './test2.js';
console.log(a)
class Test{
  constructor(data) {
    this.data=data
  }
  func1(){
    let a=10
    let arr=[12,3,4]
    let res=this.func2(a,arr)
    console.log(res)
    console.log(arr)
  }
  func2(a,arr){
    arr[3]=10
    return 10
  }
}
var test=new Test(10)
console.log(test)
test.func1()