//前序遍历
console.log(tree)
var arr=[]
var list=[tree]
while (list.length>0){
  var node=list.pop()
  arr.push(node.val)
  if(node.children){
    node.children.forEach(item=>{
      list.push()
    })
  }
}