// 后序遍历
function list1(tree){
  var list=[tree]
  var res=[]
  while (list.length){
    var node=list.shift()
    if(node.val){
      res.unshift(node.val)
    }
  if(node.left){
    list.unshift(node.left)
  }
  if(node.right){
    list.unshift(node.right)
  }
}
console.log(res)
}
//递归
function list2(tree){
  var res=[]
  getnode(tree)
  function getnode(node){
   if(node.left){
     getnode(node.left)
   }
   if(node.right){
     getnode(node.right)
   }
   if(node.val){
     res.push(node.val)
   }
  }
  console.log(res)
}
list1(tree)
list2(tree)