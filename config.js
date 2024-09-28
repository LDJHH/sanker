var directionNum={
    left:{x:-1,y:0,flag:"left"},
    right:{x:1,y:0,flag:"right"},
    top:{x:0,y:-1,flag:"top"},
    bottom:{x:0,y:1,flag:"bottom"},
}
var snake={
    //蛇一开始移动的方向  
    direction:directionNum.right,
//明确新旧蛇头之间的位置关系
    snakePos:[
        {x:0,y:0 ,domContent:"body",flag:'body'},
        {x:1,y:0 ,domContent:"body",flag:'body'},
        {x:2,y:0 ,domContent:"body",flag:'body'},
        {x:3,y:0 ,domContent:"body",flag:'head'},
    ]
}
//蛇的身体大小
var snakeBody=20;



// 整个网格行与列

var tr=30;
var td=30;
//游戏相关配置

var gridData=[] //存储地图相关坐标


//食物相关信息
var food={
    x:0,y:0,domContent:""
}


//游戏分数
var score=0;

//停止计时器
var timer=null;