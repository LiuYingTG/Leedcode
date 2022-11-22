// 为字符串对象增加前缀的方法
String.prototype.addPrefix=function (pre){
  return `${pre}${this}`
}
console.log('world'.addPrefix('hello'))