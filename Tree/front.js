// 前序遍历
function list1(tree){
  var arr=[]
  var list=[tree]
  while (list.length>0){
    var node=list.shift()
    if(node.val){
      arr.push(node.val)
    }
    if(node.right){
      list.unshift(node.right)
    }
    if(node.left){
      list.unshift(node.left)
    }
  }
  console.log(arr)
}
//递归
function list2(tree){
  var res=[]
  function getnode(node){
    if(node.val){
      res.push(node.val)
    }
    if(node.left){
      getnode(node.left)
    }
    if(node.right){
      getnode(node.right)
    }
  }
  getnode(tree)
  console.log(res)
}
list1(tree)
list2(tree)