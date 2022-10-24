// 图的构建
// 顶点表节点
class Vertex {
  constructor(data) {
    this.data = data; // 顶点域
    this.firstEdge = null; // 指向第一个邻接边的指针
    this.outNum = 0;  // 在无向图中表示与顶点邻接的边的数量，在有向图中为出度
    this.inNum = 0;  // 在有向图中为顶点的入度
  }
}

// 边表节点
class Edge {
  constructor(data, weight = 0, nextEdge = null) {
    this.data = data; // 邻接点域
    this.nextEdge = nextEdge; // 指向下一条邻接边
    this.weight = weight;  // 权重
  }
}

class Graph {
  constructor(isDirect) {
    this.eNum = 0;  // 边的数目
    this.adj = [];  // 顶点表
    this.isDirect = isDirect; // 是否是有向图
  }
  // 初始化顶点表
  initVertex(verArr) {
    for (let i = 0; i < verArr.length; i++) {
      let newVer = new Vertex(verArr[i]);
      this.adj[i] = newVer;
    }
  }

  // 插入新的顶点
  insertVertex(x) {
    let newVer = new Vertex(x);
    this.adj.push(newVer);
  }

  // 找到节点x在adj中所在的位置
  // 前面加上下划线表示不应该在具体实例中调用该方法
  _find(x) {
    let pos = -1;

    for (let i = 0; i < this.adj.length; i++) {
      if (x == this.adj[i].data) pos = i;
    }

    return pos;
  }

  // 判断图中是否存在边(x,y)或者<x, y>。
  hasEdge(x, y) {
    let pos = this._find(x);

    if (pos > -1) {
      let curVer = this.adj[pos].firstEdge;

      if (!curVer) {  // 没有与顶点x的邻接点
        return false;
      } else {  // 至少有一个节点与顶点x是相邻的
        // 遍历顶点的所有邻接节点
        while (curVer) {
          if (curVer.data === y) return true;

          curVer = curVer.nextEdge;
        }

        return false;
      }
    }
  }

  // 向图中插入边(x, y)或者边<x, y>
  /**
   * @param {Number, String} x
   * @param {Number, String} y
   * @param {Number} w
   */
  addEdge(x, y, w = 0) {  // 向图中插入边(x, y)
    let posX = this._find(x);
    let posY = this._find(y);
    let newEdgeX = new Edge(x, w);
    let newEdgeY = new Edge(y, w);

    // 如果是无向图，在插入边(x, y)时还要插入边(y, x)
    if (!this.isDirect) {
      if (!this.hasEdge(x, y) && !this.hasEdge(y, x)) {
        if (posX > -1) {  // 如果顶点x在顶点表中
          let curVer = this.adj[posX].firstEdge;

          if (!curVer) { // 如果当前顶点没有第一个边节点
            this.adj[posX].firstEdge = newEdgeY;
            this.adj[posX].outNum++;
          } else {
            let len = this.adj[posX].outNum - 1;

            while (len--) {
              curVer = curVer.nextEdge;
            }

            curVer.nextEdge = newEdgeY;
            this.adj[posX].outNum++;
          }
        }

        if (posY > -1) {  // 如果顶点y在顶点表中
          let curVer = this.adj[posY].firstEdge;

          if (!curVer) { // 如果当前顶点没有第一个边节点
            this.adj[posY].firstEdge = newEdgeX;
            this.adj[posY].outNum++;
          } else {
            let len = this.adj[posY].outNum - 1;

            while (len--) {
              curVer = curVer.nextEdge;
            }

            curVer.nextEdge = newEdgeX;
            this.adj[posY].outNum++;
          }
        }

        this.eNum++;
      }
    }

    // 如果是有向图则只需要插入边<x, y>即可
    else {
      if (!this.hasEdge(x, y)) {
        if (posX > -1) {  // 如果顶点x在顶点表中
          let curVer = this.adj[posX].firstEdge;

          if (!curVer) { // 如果当前顶点没有第一个边节点
            this.adj[posX].firstEdge = newEdgeY;
            this.adj[posX].outNum++;
          } else {
            let len = this.adj[posX].outNum - 1;

            while (len--) {
              curVer = curVer.nextEdge;
            }

            curVer.nextEdge = newEdgeY;
            this.adj[posX].outNum++;  // 顶点x的出度增长
          }

          this.eNum++;
        }

        if (posY > -1) {
          let curVer = this.adj[posY];
          curVer.inNum++;  // 顶点y的入度增长
        }
      }
    }
  }

  // 在图中删除边(x, y)或者边<x, y>
  /**
   * 由于是由邻接表表示的数据结构，当删除边(x, y)时也需要同时删除边(y, x);
   * @param {String, Number} x
   * @param {String, Number} y
   */
  removeEdge(x, y) {  // 在图中删除边(x, y)
    if (this.hasEdge(x, y)) {
      let posX = this._find(x);
      let posY = this._find(y);
      let curVerX = this.adj[posX].firstEdge;
      let curVerY = this.adj[posY].firstEdge;

      // 如果是无向图，当删除边(x, y)时也需要同时删除边(y, x);
      if (!this.isDirect) {
        // 删除边(x, y)
        if (curVerX.data === y) { // 如果顶点的第一个节点即是要找的节点
          this.adj[posX].firstEdge = curVerX.nextEdge;
          this.adj[posX].outNum--;
          curVerX = null;
        }

        // curVerX如果存在，说明要找的节点不是顶点的第一个节点
        while (curVerX) {
          let preVerX = curVerX;
          curVerX = curVerX.nextEdge;

          if (curVerX && curVerX.data === y) {
            preVerX.nextEdge = curVerX.nextEdge;
            this.adj[posX].outNum--;
            curVerX = null;
          }
        }

        // 删除边(y, x)
        if (curVerY.data === x) { // 如果顶点的第一个节点即是要找的节点
          this.adj[posY].firstEdge = curVerY.nextEdge;
          this.adj[posY].outNum--;
          curVerY = null;
        }

        // curVerY如果存在，说明要找的节点不是顶点的第一个节点
        while (curVerY) {
          let preVerY = curVerY;
          curVerY = curVerY.nextEdge;

          if (curVerY && curVerY.data === x) {
            preVerY.nextEdge = curVerY.nextEdge;
            this.adj[posY].outNum--;
            curVerY = null;
          }
        }
      } else {
        // 删除边<x, y>
        if (curVerX.data === y) { // 如果顶点的第一个节点即是要找的节点
          this.adj[posX].firstEdge = curVerX.nextEdge;
          this.adj[posX].outNum--;
          curVerX = null;
        }

        // curVerX如果存在，说明要找的节点不是顶点的第一个节点
        while (curVerX) {
          let preVerX = curVerX;
          curVerX = curVerX.nextEdge;

          if (curVerx && curVerX.data === y) {
            preVerX.nextEdge = curVerX.nextEdge;
            this.adj[posX].outNum--;
            curVerX = null;
          }
        }
        this.adj[posY].inNum--;
      }

      this.eNum--;
    }
  }

  // 从图中删除顶点x
  deleteVertex(x) {
    let pos = this._find(x);

    if (pos > -1) {
      // 删除从x出发的边
      let curVer = this.adj[pos].firstEdge;

      while (curVer) {
        this.removeEdge(x, curVer.data);
        curVer = curVer.nextEdge;
      }

      // 删除终点是x的边
      for (let i = 0; i < this.adj.length; i++) {
        let temVer = this.adj[i].firstEdge;

        while (temVer) {
          if (temVer.data === x) {
            this.removeEdge(this.adj[i].data, temVer.data);
          }

          temVer = temVer.nextEdge;
        }
      }

      // 删除顶点x
      this.adj.splice(pos, 1);
    }
  }

  // 与顶点x邻接的所有节点
  allNeightbors(x) {
    let pos = this._find(x);

    if (pos > -1) {
      let result = `${x}`;
      let curVer = this.adj[pos].firstEdge;

      while (curVer) {
        result += `=>${curVer.data}`;
        curVer = curVer.nextEdge;
      }

      console.log(result);
    }
  }



  BFSTraverse(x = this.adj[0].data) {  // x为广度优先遍历的起始顶点
    let visited = [];  // 访问标记数组，标记数组和顶点表唯一的联系就是下标
    let result = '';

    for (let i = 0; i < this.adj.length; i++) {
      visited[i] = false;
    }

    result = this._BFS(x, visited);  // 求以x为起始点的连通分量

    // 如果还有未被访问过的顶点，则以该顶点再次出发
    for (let i = 0; i < visited.length; i++) {
      if (!visited[i]) {
        let x = this.adj[i].data;
        result += `&${this._BFS(x, visited)}`;  // 其他的连通分量
      }
    }

    return result;
  }


  // 实际进行广度遍历的函数，每次遍历都是得到一个以顶点x为起点的连通分量
  _BFS(x, visited) {
    let result = '';
    let queue = [];  // 辅助队列
    let pos = this._find(x);  // 找到顶点x在顶点表中的位置

    if (pos > -1) {
      result += `${x}`;
      visited[pos] = true;  // 在标记数组相应的位置上做已访问标识

      let curVer = this.adj[pos];  // 当前顶点
      queue.push(curVer);  // 顶点x入队列

      while (queue.length) {
        curVer = queue.shift();  // 取出一个顶点
        // 注意要回到顶点的表中再次出发
        pos = this._find(curVer.data);
        curVer = this.adj[pos].firstEdge;

        while (curVer) {  // 检测顶点的所有邻接点
          pos = this._find(curVer.data);

          if (!visited[pos]) {  // 如果当前节点未被访问过
            result += `->${curVer.data}`;
            visited[pos] = true;  // 做已访问标识
            queue.push(curVer);
          }

          curVer = curVer.nextEdge;
        }
      }
    }

    return result;
  }

  DFSTraverse(x = this.adj[0].data) {
    let result = '';
    let visited = [];  // 标记数组

    for (let i = 0; i < this.adj.length; i++) {
      visited[i] = false;
    }

    result = this._DFS(x, visited);

    // 如果还有未被访问过的顶点，则以该顶点再次出发
    for (let i = 0; i < visited.length; i++) {
      if (!visited[i]) {
        let x = this.adj[i].data;
        result += `&${this._DFS(x, visited)}`;
      }
    }

    return result;
  }


  // 实际进行深度遍历的函数，每次遍历都是得到一个以顶点x为起点的连通分量
  _DFS(x, visited) {
    let result = '';
    let stack = [];  // 辅助堆栈
    let pos = this._find(x);
    let curVer = this.adj[pos];  // 根据给的x值找到具体的顶点

    if (pos > -1) {
      stack.push(curVer);  // 顶点x入栈
      result += `${x}`;
      visited[pos] = true;

      while (stack.length) {
        curVer = stack[stack.length - 1];  // 获取栈顶元素
        pos = this._find(curVer.data);  // 获取栈顶元素在顶点表中的位置
        curVer = this.adj[pos].firstEdge;  // 获取顶点的第一个邻接点

        while (curVer) {
          pos = this._find(curVer.data);

          if (visited[pos]) {  // 如果该节点已经访问过了,则访问该节点的下一个相邻的节点
            curVer = curVer.nextEdge;
          } else {
            stack.push(curVer);
            result += `->${curVer.data}`;
            visited[pos] = true;
            break;
          }
        }
        if (!curVer) stack.pop();// 如果顶点的所有邻接点都访问过
      }
    }
    return result;
  }

}
let arr = ['V0', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8'];
let myGraph = new Graph(0);  // 0表示无向图
myGraph.initVertex(arr);
// 插入边
myGraph.addEdge('V0', 'V1');
myGraph.addEdge('V0', 'V5');
myGraph.addEdge('V1', 'V2');
myGraph.addEdge('V1', 'V6');
myGraph.addEdge('V1', 'V8');
myGraph.addEdge('V2', 'V3');
myGraph.addEdge('V2', 'V8');
myGraph.addEdge('V3', 'V4');
myGraph.addEdge('V3', 'V6');
myGraph.addEdge('V3', 'V7');
myGraph.addEdge('V3', 'V8');
myGraph.addEdge('V4', 'V5');
myGraph.addEdge('V4', 'V7');
myGraph.addEdge('V5', 'V6');
myGraph.addEdge('V6', 'V7');

// for(let i=0; i<arr.length; i++) {
//   myGraph.allNeightbors(arr[i]);
// }
for(let i=0; i<arr.length; i++) {
  console.log(myGraph.DFSTraverse(arr[i]));
}
