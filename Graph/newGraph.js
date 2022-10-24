// 尝试自己写一个Graph类
// 顶点类
class Vertex{
  constructor(data) {
    this.data=data;
    this.firstEdge=null;
    this.outNum=0;
    this.inNum=0;
  }
}
// 边节点类
class Edge{
  constructor(data,w=0,nextEdge=null) {
    this.data=data;
    this.nextEdge=nextEdge;
    this.weight=this.weight
  }
}

class Graph{
  //默认为无指向表
  constructor(isDirect=0) {
    this.isDirect=isDirect // 是否有向表  0-无向 1-有向
    this.adj=[]            // 连接表
    this.edgeNum=0         // 边的数量
  }

  // 初始化顶点表
  initVertex(arr){
    for(let i=0;i<arr.length;i++){
      let vertex=new Vertex(arr[i])
      this.adj.push(vertex)
    }
  }

  // 插入新节点
  insertVertex(x){
    let newVer=new Vertex(x)
    this.adj.push(newVer)
  }

  //查找顶节点的位置
  _hasX(x){
    for(let i=0;i<this.adj.length;i++){
      if(x==this.adj[i].data){
        return i
      }
    }
    return -1

  }

  //查找是否已经存在边 x->y
  hasEdge(x,y){
    let posX=this._hasX(x)
    if(posX>-1){
      let current=this.adj[posX].firstEdge
      if(!current){
        return false
      }else{
        while (current){
          if(current.data==y){
            return true
          }
          current=current.nextEdge
        }
      }
      return false
    }
  }
  // 添加新的边
  addEdge(x,y,w=0){
    let posX=this._hasX(x)
    let posY=this._hasX(y)
    let edgeX=new Edge(x,w)
    let edgeY=new Edge(y,w)
    //如果是无向图，需要添加x->y,y->x两条边
    if(!this.isDirect){
      if(!this.hasEdge(x,y)&&!this.hasEdge(y,x)){
      //  不存在連接
        if(posX>-1){
          let currentX=this.adj[posX].firstEdge
          if(!currentX){
            this.adj[posX].firstEdge=edgeY
          }else{
            while (currentX.nextEdge){
              currentX=currentX.nextEdge
            }
            currentX.nextEdge=edgeY
          }
          this.adj[posX].outNum++
        }
        if(posY>-1){
          let currentY=this.adj[posY].firstEdge
          if(!currentY){
            this.adj[posY].firstEdge=edgeX
          }else{
            while (currentY.nextEdge){
              currentY=currentY.nextEdge
            }
            currentY.nextEdge=edgeX
          }
          this.adj[posY].outNum++
        }
        this.edgeNum++
      }
      //  有向图，只需要添加x->y
    }else {
      if(!this.hasEdge(x,y)){
        if(posX>-1){
          let current=this.adj[posX].firstEdge
          if(!current){
            this.adj[posX].firstEdge=edgeY
          }else{
            while (current.nextEdge){
              current=current.nextEdge
            }
            current.nextEdge=edgeY
            this.adj[posX].outNum++;
            this.edgeNum++
          }
        }
        if(posY>-1){
          this.adj[posY].inNum++
        }
      }
    }

  }
  // 删除某个边
  removeEdge(x,y){
    let posX=this._hasX(x)
    let posY=this._hasX(y)
    let currentX=this.adj[posX].firstEdge
    let currentY=this.adj[posY].firstEdge
    // 无向表，需删除两条边
    if(!this.isDirect){
      //需要删除的是第一个节点
      if(currentX==y){
        this.adj[posX].firstEdge=currentX.nextEdge
        this.adj[posX].outNum--
        currentX=null
      }else{
        while (currentX){
          let pre=currentX
          currentX=currentX.nextEdge
          if(currentX&&currentX.data==y){
            pre.nextEdge=currentX.nextEdge
            this.adj[posX].outNum--;
            currentX=null
          }
        }
      }
      if(currentY==x){
        this.adj[posY].firstEdge=currentY.nextEdge
        this.adj[posY].outNum--
        currentY=null
      }else{
        while (currentY){
          let pre=currentY
          currentY=currentY.nextEdge
          if(currentY&&currentY.data==x){
            pre.nextEdge=currentY.nextEdge
            this.adj[posY].outNum--;
            currentY=null
          }
        }
      }
    }
    // 有向表，只需删除x->y
    else{
      if(currentX.data==y){
        this.adj[posX].firstEdge=currentX.nextEdge
        this.adj[posX].outNum--
      }else{
        while (currentX){
          let pre=currentX
          currentX=currentX.nextEdge
          if(currentX&&currentX.data==y){
            pre.nextEdge=currentX.nextEdge
            this.adj[posX].outNum--
            currentX=null
          }
        }
      }
        this.adj[posY].inNum--
    }

    this.edgeNum--
  }
  // 删除某个节点
  deleteVertex(x){
    let posX=this._hasX(x)
    if(posX>-1){
      // 需要删除从 x 出发的边
      let currentX=this.adj[posX].firstEdge
      while (currentX){
        this.removeEdge(x,currentX.data)
        currentX=currentX.nextEdge
      }
      // 需要删除出发至 x 的边
      for(let i=0;i<this.adj.length;i++){
        let current=this.adj[i].firstEdge
        while (current){
            if(current&&current.data==x){
              this.removeEdge(this.adj[i].data,x)
            }
          current=current.nextEdge
        }
      }
      this.adj.splice(posX,1)
    }
  }
  // 遍历 x 所有连接关系
  allNeightbors(x){
    let str=`${x}`
    let posX=this._hasX(x)
    if(posX>-1){
      let current=this.adj[posX].firstEdge
      while (current){
        str+=`=>${current.data}`
        current=current.nextEdge
      }
      console.log(str)
    }
  }

  // 广度优先遍历这个图
  // 默认从第一个顶点开始找
  BFSTraverse(x=this.adj[0].data){
  //  调用的遍历方法
    let res=''
    let visited=[]
    let posX=this._hasX(x)
    if(posX>-1){
      for(let i=0;i<this.adj.length;i++){
        visited.push(false)
      }
      res=this._BFSTraverse(x,visited)
      for(let i=0;i<visited.length;i++){
        if(!visited[i]){
          res+=`&${this._BFSTraverse(this.adj[i].data,visited)}`
        }
      }
      return res
    }
  }

  //  实际的遍历方法
  _BFSTraverse(x,visited){
    let res=''
    let pos=this._hasX(x)
    let queue=[]
    if(pos>-1){
      res+=`${x}`;
      visited[pos]=true
      let current=this.adj[pos]
      queue.push(current)
      while (queue.length){
        current=queue.shift()
        pos=this._hasX(current.data)
        if(pos>-1){
          current=this.adj[pos].firstEdge
          while (current){
            pos=this._hasX(current.data)
            if(!visited[pos]){
              res+=`->${current.data}`
              queue.push(current)
              visited[pos]=true
            }
            current=current.nextEdge
          }
        }
      }
    }
    return res
  }

  // 深度优先遍历方法
  DFSTraverse(x=this.adj[0].data){
    let posX=this._hasX(x)
    let res=''
    let visited=[]
    if(posX>-1){
      for(let i=0;i<this.adj.length;i++){
        visited.push(false)
      }
      res=this._DFSTraverse(x,visited)
      for(let i=0;i<visited.length;i++){
        if(!visited[i]){
          res+=`&${this._DFSTraverse(this.adj[i].data,visited)}`
        }
      }
    }
    return res
  }

  //深度优先实际调用的算法
  //非递归思路
  _DFSTraverse(x,visited){
    let pos=this._hasX(x)
    let res=''
    let queue=[]
    if(pos>-1){
      res=`${x}`
      let current=this.adj[pos]
      queue.push(current)
      visited[pos]=true
      while (queue.length){
        current=queue[queue.length-1]
        pos=this._hasX(current.data)
        current=this.adj[pos].firstEdge
        while (current){
          pos=this._hasX(current.data)
          if(visited[pos]){
            current=current.nextEdge
          }else{
            queue.push(this.adj[pos])
            visited[pos]=true
            res+=`->${this.adj[pos].data}`
            break
          }
        }
        if(!current) queue.pop()
      }
   }
    return res
  }

  //是否是拓扑排序
  isAOV(){
    let vertexList=[]
    let vertexNum=[].concat(this.adj).length
    let count=0
    do{
      count=0
      for(let i=0;i<this.adj.length;i++){
        if(!this.adj[i].inNum){
          vertexList.push(this.adj[i].data)
          this.deleteVertex(this.adj[i].data)
          count++
          break
        }
      }
    }while (count)

    if(vertexList.length<vertexNum){
      return `false+${vertexList}`
    }else{
      return vertexList
    }
  }

  /**
   * 获取边(x, y)或<x, y>对应的权值
   * @param {*} x
   * @param {*} y
   */
  getEdgeWeight(x, y) {
    let pos = this._find(x);

    if (pos > -1) {
      let curVer = this.adj[pos].firstEdge;

      while (curVer) {
        if (curVer.data === y) { return curVer.weight; }

        curVer = curVer.nextEdge;
      }

      return 0;
    }
  }

  // 判断当前的图是否是连通图
  isConnected(x = this.adj[0].data) {
    // 任选一个顶点作为起点
    let len = this.adj.length;
    let visited = new Array(len);

    for (let i = 0; i < len; i++) {
      visited[i] = false;
    }

    this._BFS(x, visited);

    // 如果遍历一边之后仍有顶点未被访问，则该图不是连通的
    for (let i = 0; i < len; i++) {
      if (!visited[i]) return false;
    }

    return true;
  }

  // 普里姆算法
  getPrimMST(){
    // 不是连通图时求最小生成树没有意义
    if (!this.isConnected()) { return; }

    let V = this.adj;  // 顶点集V
    let Vt = [V[0]];  // 添加任意一个顶点
    let VVt = V.filter(x => Vt.indexOf(x) === -1); // VVt = V - Vt
    let MSTree = new Graph(this.isDirect);  // 初始化空树
    V.forEach(x => MSTree.insertVertex(x.data));  // 图方便先将所有顶点都放入树中

    while (Vt.length !== V.length) {  // 若树中不含全部顶点
      let mVt = null;  // 当找到权值最小的边时，mVT是边的一个顶点
      let mVVt = null;  // 当找到权值最小的边时，mV_VT是边的另一个顶点
      let minW = Number.MAX_SAFE_INTEGER;  // 先将minW赋个极大的数值

      // 在VT和V_VT中找到边中的最小权值
      for (let i = 0; i < Vt.length; i++) {  // 从VT中取出一个顶点
        for (let j = 0; j < VVt.length; j++) {  // 从VVt中取出一个顶点
          let weight = this.getEdgeWeight(Vt[i].data, VVt[j].data);

          if (weight && minW > weight) {
            minW = weight;
            mVt = Vt[i];
            mVVt = VVt[j];
          }
        }
      }
      Vt.push(mVVt);
      MSTree.addEdge(mVt.data, mVVt.data, minW);
      VVt = V.filter(x => Vt.indexOf(x) === -1);
    }

    return MSTree;
  }

}


let aovArr=['A','B','C','D','E','F']
let aovGraph=new Graph(1)
aovGraph.initVertex(aovArr)
aovGraph.addEdge('A','B')
aovGraph.addEdge('A','D')
aovGraph.addEdge('B','E')
aovGraph.addEdge('B','F')
aovGraph.addEdge('C','B')
aovGraph.addEdge('C','F')
aovGraph.addEdge('E','A')
aovGraph.addEdge('E','B')
aovGraph.addEdge('E','F')
for(let i=0;i<aovArr.length;i++){
  aovGraph.allNeightbors(aovArr[i])
}
console.log(aovGraph.isAOV())

