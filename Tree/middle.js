// 中序遍历
function list1(tree){
  var arr = []
  var treeArr=[tree]
  var node=treeArr.pop()
  while (treeArr.length||node){
    while (node){
      treeArr.push(node)
      node=node.left
    }
    node=treeArr.pop()
    arr.push(node.val)
    node=node.right
  }

    console.log(arr)
}

function list2(tree){
  var res=[]
  getnode(tree)
  function getnode(node){
    if(node.left){
      getnode(node.left)
    }
    if(node.val){
      res.push(node.val)
    }
    if(node.right){
      getnode(node.right)
    }
  }
  console.log(res)
}
list1(tree)
list2(tree)