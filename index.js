//绘制蛇的方法
function drawSnake(snake){
    for(var i=0;i<snake.snakePos.length;i++){
        if(snake.snakePos[i].domContent=="body"){
            snake.snakePos[i].domContent=document.createElement("div");
            snake.snakePos[i].domContent.style.position="absolute";
            snake.snakePos[i].domContent.style.width=snakeBody+"px";
            snake.snakePos[i].domContent.style.height=snakeBody+"px";
            snake.snakePos[i].domContent.style.left=snake.snakePos[i].x*snakeBody+"px";
            snake.snakePos[i].domContent.style.top=snake.snakePos[i].y*snakeBody+"px";
            if(snake.snakePos[i].flag==="head"){
                snake.snakePos[i].domContent.style.background=`url("./png/贪吃蛇大作战-copy.png") center/contain no-repeat`;
                //根据方向进行旋转
                switch(snake.direction.flag){
                    case'top':{
                        snake.snakePos[i].domContent.style.transform=`rotate(-90deg)`;
                        break;
                    }
                    case'bottom':{
                        snake.snakePos[i].domContent.style.transform=`rotate(90deg)`;
                        break;
                    }
                    case'left':{
                        snake.snakePos[i].domContent.style.transform=`rotate(180deg)`;
                        break;
                    }
                    case'right':{
                        snake.snakePos[i].domContent.style.transform=`rotate(0deg)`;
                        break;
                    }
                }
            }
            else{
                snake.snakePos[i].domContent.style.background="red";
                snake.snakePos[i].domContent.style.borderRadius="50%";
            }
        }
        document.querySelector(".container").append(snake.snakePos[i].domContent)
    }
}
//绘制食物的方法
function drawFood(){
    while(true){
        var isRepeat=false;
        //随机生成一个坐标
        food.x=Math.floor(Math.random()*tr+0);
        food.y=Math.floor(Math.random()*td+0);
        //查看坐标是否符合要求
        for(var i=0;i<snake.snakePos.length;i++){
            if(snake.snakePos[i]===food.x&&snake.snakePos[i]===food.y){
                //说明坐标与蛇冲突
                isRepeat=true;
                break;
            }
        }
        if(!isRepeat){
            break;
        }
    }
    if(!food.domContent){
        food.domContent=document.createElement("div");
        food.domContent.style.width=snakeBody+"px";
        food.domContent.style.height=snakeBody+"px";
        food.domContent.style.position="absolute";
        food.domContent.style.background=`url("./png/汉堡.png") center/contain no-repeat`;
        document.querySelector(".container").append(food.domContent);
    }
    food.domContent.style.left=food.x*snakeBody+"px";
    food.domContent.style.top=food.y*snakeBody+"px";
}
/* 初始化游戏 */
function intGame(){
    /* 初始化地图 */
    for(var i=0;i<tr;i++){
        for(var j=0;j<td;j++){
            gridData.push({
                x:j,
                y:i,
            })
        }
    }
    /* 绘制蛇 */
    drawSnake(snake);


    /* 绘制食物 */
    drawFood();
}
function isCollide(newHead){
    var collideCheck={
        isCollide:false,
        isEat:false,
    }
    if(newHead.x<0||newHead.x>=td||newHead.y<0||newHead.y>=tr){
        collideCheck.isCollide=true;
        return collideCheck;
    }
   for(var i=0;i<snake.snakePos.length;i++){
    if(snake.snakePos[i].x===newHead.x&&snake.snakePos[i].y===newHead.y){
        collideCheck.isCollide=true;
        return collideCheck;
    }
   }
   if(newHead.x===food.x&&newHead.y===food.y){
    collideCheck.isEat=true;
    score++;//分数自增
   }
   return collideCheck;
}
//蛇的移动方法
function snakeMove(){
    
    //将旧的头改为身体
    var oldHead=snake.snakePos[snake.snakePos.length-1];
    //根据方向计算新蛇头的坐标
    var newHead={
        domContent:"body",
        x:oldHead.x+snake.direction.x,
        y:oldHead.y+snake.direction.y,
        flag:"head"
    }
    //计算碰撞
    var collideCheckResult=isCollide(newHead);
    if(collideCheckResult.isCollide){
        if( window.confirm(`
            游戏结束，您当前的得分为${score}分，是否重新开始游戏？
            `)){
                //重新开始游戏
                document.querySelector(".container").innerHTML=`
                <!-- 开始游戏 -->
                <button class="kbtn" style="display:none"></button>
                <!-- 暂停 -->
                <button class="zbtn" style="display:none"></button>
                `
                score=0;
                
                snake={
                    //蛇一开始移动的方向  
                    direction:directionNum.right,
                //明确新旧蛇头之间的位置关系
                    snakePos:[
                        {x:0,y:0 ,domContent:"body",flag:'body'},
                        {x:1,y:0 ,domContent:"body",flag:'body'},
                        {x:2,y:0 ,domContent:"body",flag:'body'},
                        {x:3,y:0 ,domContent:"body",flag:'head'},
                    ],
                };
                food={
                    x:0,y:0,domContent:"",
                };
                intGame();
            }
            else{
                //结束游戏
                document.onkeydown=null;
                clearInterval(timer);
            }
            return;
    }

    oldHead.flag="body";
    oldHead.domContent.style.background="red";
    oldHead.domContent.style.borderRadius="50%";
    snake.snakePos.push(newHead);
    //是否吃到东西
    if(collideCheckResult.isEat){
        drawFood();
    }
    else{
        document.querySelector(".container").removeChild(snake.snakePos[0].domContent);
        snake.snakePos.shift();
    }
    //重新绘制蛇
    drawSnake(snake);
}
function startGame(){
    timer=setInterval(function(){
        snakeMove();
    },100)
}
function bindEvent(){
    
    //绑定键盘事件
    document.onkeydown=function(e){
        if((e.key==="ArrowUp"||e.key.toLocaleLowerCase()==="w")&&snake.direction.flag!=="bottom"){
            //上
            snake.direction=directionNum.top;
        } 
        if((e.key==="ArrowDown"||e.key.toLocaleLowerCase()==="s")&&snake.direction.flag!=="top"){
            //下
            snake.direction=directionNum.bottom;
        } 
        if((e.key==="ArrowLeft"||e.key.toLocaleLowerCase()==="a")&&snake.direction.flag!=="right"){
            //左
            snake.direction=directionNum.left;
        } 
        if((e.key==="ArrowRight"||e.key.toLocaleLowerCase()==="d")&&snake.direction.flag!=="left"){
            //右
            snake.direction=directionNum.right;
        } 
    }
    //计时器自动调用蛇移动的方法
    startGame();

    //点击整个容器时，可以暂停
    document.querySelector(".container").onclick=function(e){
        if(e.target.className==="container"){
            document.querySelector(".zbtn").style.display="block";
            clearInterval(timer);
        }
        else{
            document.querySelector('.zbtn').style.display="none";
            startGame();
        }
    }

    //给暂停按钮绑定事件
    /* document.querySelector('.zbtn').onclick=function(e){
        e.stopPropagation();
        
    } */
}
/* 游戏主函数 */
function main(){
    document.querySelector('.kbtn').onclick=function(e){
        e.stopPropagation();
        
        document.querySelector('.kbtn').style.display="none";

        //初始化游戏
        intGame();
        //绑定事件
        bindEvent();
    }
}  
main();