// 找出字符串中出现最多次数的字符以及次数
var str='afjsfhsfASasdasdcjnbjkaaaa'
function getMAx(str){
  let obj={}
  for(let i=0;i<str.length;i++){
    if(obj[(str[i])]){
      obj[str[i]]++
    }else{
      obj[str[i]]=1
    }
  }
  let max=1
  let kk=''
  for(let [key,val] of Object.entries(obj)){
    if(val>=max){
      kk=key
      max=val
    }
  }
  return {[kk]:max}
}
console.log(getMAx(str))