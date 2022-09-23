// 图形上色
var floodFill = function(image, sr, sc, color) {
    if(image[sr][sc]===color){
        return image
    }
    const res=image.slice()
    const initialVal=image[sr][sc]
    const direact=[[-1,0],[0,-1],[1,0],[0,1]]
    var list=[[sr,sc]]
    while (list.length>0){
        var [curR,curC]=list.shift()
        res[curR][curC]=color
        direact.forEach(item=>{
            var [LR,LC]=[-1,-1]
            if(curR+item[0]>=0&&curR+item[0]<image.length){
                LR=curR+item[0]
            }
            if(curC+item[1]>=0&&curC+item[1]<image[0].length){
                LC=curC+item[1]
            }
            if(LC===-1||LR===-1){
                return
            }
            if(image[LR][LC]===initialVal){
                list.push([LR,LC])
            }
        })
    }
    return res
};
var image = [[1,1,1],[1,1,0],[1,0,1]]
var sr = 1
var sc = 1
var newColor = 2
console.log(floodFill(image,sr,sc,newColor))

