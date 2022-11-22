// test toString
function f(){
  // console.log(23)
  let add=function (){
    console.log(123)
  }
  add.toString=function (){
    console.log(12323131)
  }
  return add
}
console.log(f())