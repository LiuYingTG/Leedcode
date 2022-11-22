// test
let inner='1'
let test=setInterval(()=>{
  inner+='1'
  document.body.innerHTML=inner
},500)
console.log(test)