'use strict';

//穿墙效果
function through(obj){
    function a2d(n){
        return 	n*180/Math.PI;
    }
    //判断鼠标从哪个边移入
    function hoverDir(obj,ev){
        var oEvent = ev||event;
        var x = obj.offsetLeft+obj.offsetWidth/2 - oEvent.clientX;
        var y = obj.offsetTop+obj.offsetHeight/2 - oEvent.clientY;
        return Math.round((a2d(Math.atan2(y,x))+180)/90)%4;
    }
    obj.onmouseover = function(ev){
        var oEvent = ev||event;
        var oFrom = oEvent.fromElement||oEvent.relatedTarget;
        if(obj.contains(oFrom)){
            return;
        }
        var dir = hoverDir(obj,oEvent);
        var oS = obj.children[0];
        //左边 2 右侧0 上边3  下边1
        switch(dir){
            case 0:
                oS.style.left = '180px';
                oS.style.top = 0;
                console.log(dir);
                break;
            case 1:
                oS.style.top = '180px';
                oS.style.left = 0;
                console.log(dir);
                break;
            case 2:
                oS.style.left = '-180px';
                oS.style.top = 0;
                console.log(dir);
                break;
            case 3:
                oS.style.top = '-180px';
                oS.style.left = 0;
                console.log(dir);
                break;
        }
        move(oS,{left:0,top:0});
    };

    obj.onmouseout = function(ev){
        var oEvent = ev||event;
        var oTo = oEvent.toElement||oEvent.relatedTarget;
        if(obj.contains(oTo)){
            return;
        }
        var dir = hoverDir(obj,oEvent);
        var oS = obj.children[0];
        //左边 2 右侧0 上边3  下边1
        switch(dir){
            case 0:
                move(oS,{left:180,top:0});
                break;
            case 1:
                move(oS,{left:0,top:180});
                break;
            case 2:
                move(oS,{left:-180,top:0});
                break;
            case 3:
                move(oS,{left:0,top:-180});
                break;
        }
    };
}



function getStyle(obj,name){
    return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj,false)[name];
}
function move(obj,json,options){
    options = options||{};
    options.easing = options.easing||'ease-out';
    options.duration = options.duration||700;
    var start = {};
    var dis = {};
    for(var name in json){
        start[name] = parseFloat(getStyle(obj,name)); 				        //parseFloat(filter:alpha(opacity:100))
        if(isNaN(start[name])){ //转换失败
            switch(name){
                case 'width':
                    start[name] = obj.offsetWidth;
                    break;
                case 'height':
                    start[name] = obj.offsetHeight;
                    break;
                case 'left':
                    start[name] = obj.offsetLeft;
                    break;
                case 'top':
                    start[name] = obj.offsetTop;
                    break;
                case 'opacity':
                    start[name] = 1;
                    break;
                case 'borderWidth':
                    start[name] = 0;
                    break;
            }
        }
        dis[name] = json[name] - start[name];
    }
    var count = Math.round(options.duration/30);
    var n = 0;
    clearInterval(obj.timer);

    obj.timer = setInterval(function(){
        n++;
        for(var name in json){
            switch(options.easing){
                case 'linear':
                    var a = n/count;
                    var cur = start[name]+dis[name]*a;
                    break;
                case 'ease-in':
                    var a = n/count;
                    var cur = start[name]+dis[name]*Math.pow(a,3);
                    break;
                case 'ease-out':
                    var a = 1-n/count;
                    var cur = start[name]+dis[name]*(1-Math.pow(a,3));
                    break;
            }
            if(name == 'opacity'){
                obj.style[name] = cur;
                obj.style.filter = 'alpha(opacity:'+cur*100+')';
            }else{
                obj.style[name] = cur+'px';
            }
        }
        if(n == count){
            clearInterval(obj.timer);
            options.complete&&options.complete();
        }
    },30);
}

/*2048*/
var game = {
    data:[],RN:4,CN:4,score:0,top:0,state:1,RUNNING:1,GAMEOVER:0,PLAYING:2,getGridHTML:function (){
        for(var b = 0,a = []; b < this.RN; b++){
            for(var d = 0; d < this.CN; d++){
                a.push("" + b + d)
            }
        }
        return '<div id="g' + a.join('" class="grid"></div><div id="g') + '" class="grid"></div>'
    },getCellHTML:function (){
        for(var b = 0,a = []; b < this.RN; b++){
            for(var d = 0; d < this.CN; d++){
                a.push("" + b + d)
            }
        }
        return '<div id="c' + a.join('" class="cell"></div><div id="c') + '" class="cell"></div>'
    },start:function (){
        var a = document.getElementById("gridPanel");
        a.innerHTML = this.getGridHTML() + this.getCellHTML();
        a.style.height = this.RN * 116 + 16 + "px";
        a.style.width = this.CN * 116 + 16 + "px";
        this.data = [];
        for(var b = 0; b < this.RN; b++){
            this.data.push([]);
            for(var d = 0; d < this.CN; d++){
                this.data[b].push(0)
            }
        }
        this.score = 0;
        this.state = this.RUNNING;
        document.getElementById("gameOver").style.display = "none";
        this.randomNum();
        this.randomNum();
        this.updateView()
    },randomNum:function (){
        if(!this.isFull()){
            for(; ;){
                var a = Math.floor(Math.random() * this.RN);
                var b = Math.floor(Math.random() * this.CN);
                if(this.data[a][b] == 0){
                    this.data[a][b] = Math.random() > 0.5 ? 4 : 2;
                    break;
                }
            }
        }
    },isFull:function (){
        for(var a = 0; a < this.RN; a++){
            for(var b = 0; b < this.CN; b++){
                if(this.data[a][b] == 0){
                    return false;
                }
            }
        }
        return true
    },moveLeft:function (){
        var b = this.data.toString();
        for(var a = 0; a < this.RN; a++){
            this.moveLeftInRow(a);
        }
        var c = this.data.toString();
        if(b != c){
            animation.start();
        }
    },moveLeftInRow:function (a){
        for(var e = 0; e < this.CN - 1; e++){
            var b = this.getNextInRow(a,e);
            if(b == -1){
                break;
            }else{
                if(this.data[a][e] == 0){
                    this.data[a][e] = this.data[a][b];
                    this.data[a][b] = 0;
                    var d = document.getElementById("c" + a + b);
                    animation.addTask(d,a,b,a,e);
                    e--;
                }else{
                    if(this.data[a][e] == this.data[a][b]){
                        this.data[a][e] *= 2;
                        this.score += this.data[a][e];
                        this.data[a][b] = 0;
                        var d = document.getElementById("c" + a + b);
                        animation.addTask(d,a,b,a,e);
                    }
                }
            }
        }
    },getNextInRow:function (a,d){
        for(var b = d + 1; b < this.CN; b++){
            if(this.data[a][b] != 0){
                return b;
            }
        }
        return -1;
    },moveRight:function (){
        var b = this.data.toString();
        for(var a = 0; a < this.RN; a++){
            this.moveRightInRow(a);
        }
        var c = this.data.toString();
        if(b != c){
            animation.start();
        }
    },moveRightInRow:function (a){
        for(var e = this.CN - 1; e > 0; e--){
            var b = this.getPrevInRow(a,e);
            if(b == -1){
                break;
            }else{
                if(this.data[a][e] == 0){
                    this.data[a][e] = this.data[a][b];
                    this.data[a][b] = 0;
                    var d = document.getElementById("c" + a + b);
                    animation.addTask(d,a,b,a,e);
                    e++;
                }else{
                    if(this.data[a][e] == this.data[a][b]){
                        this.data[a][e] *= 2;
                        this.score += this.data[a][e];
                        this.data[a][b] = 0;
                        var d = document.getElementById("c" + a + b);
                        animation.addTask(d,a,b,a,e);
                    }
                }
            }
        }
    },getPrevInRow:function (a,d){
        for(var b = d - 1; b >= 0; b--){
            if(this.data[a][b] != 0){
                return b;
            }
        }
        return -1;
    },moveUp:function (){
        var a = this.data.toString();
        for(var d = 0; d < this.CN; d++){
            this.moveUpInCol(d);
        }
        var b = this.data.toString();
        if(a != b){
            animation.start();
        }
    },moveUpInCol:function (e){
        for(var b = 0; b < this.RN - 1; b++){
            var a = this.getNextInCol(b,e);
            if(a == -1){
                break;
            }else{
                if(this.data[b][e] == 0){
                    this.data[b][e] = this.data[a][e];
                    this.data[a][e] = 0;
                    var d = document.getElementById("c" + a + e);
                    animation.addTask(d,a,e,b,e);
                    b--;
                }else{
                    if(this.data[b][e] == this.data[a][e]){
                        this.data[b][e] *= 2;
                        this.score += this.data[b][e];
                        this.data[a][e] = 0;
                        var d = document.getElementById("c" + a + e);
                        animation.addTask(d,a,e,b,e);
                    }
                }
            }
        }
    },getNextInCol:function (b,d){
        for(var a = b + 1; a < this.RN; a++){
            if(this.data[a][d] != 0){
                return a;
            }
        }
        return -1;
    },moveDown:function (){
        var a = this.data.toString();
        for(var d = 0; d < this.CN; d++){
            this.moveDownInCol(d);
        }
        var b = this.data.toString();
        if(a != b){
            animation.start();
        }
    },moveDownInCol:function (e){
        for(var b = this.RN - 1; b > 0; b--){
            var a = this.getPrevInCol(b,e);
            if(a == -1){
                break;
            }else{
                if(this.data[b][e] == 0){
                    this.data[b][e] = this.data[a][e];
                    this.data[a][e] = 0;
                    var d = document.getElementById("c" + a + e);
                    animation.addTask(d,a,e,b,e);
                    b++;
                }else{
                    if(this.data[b][e] == this.data[a][e]){
                        this.data[b][e] *= 2;
                        this.score += this.data[b][e];
                        this.data[a][e] = 0;
                        var d = document.getElementById("c" + a + e);
                        animation.addTask(d,a,e,b,e);
                    }
                }
            }
        }
    },getPrevInCol:function (b,d){
        for(var a = b - 1; a >= 0; a--){
            if(this.data[a][d] != 0){
                return a;
            }
        }
        return -1;
    },updateView:function (){
        for(var d = 0; d < this.RN; d++){
            for(var e = 0; e < this.CN; e++){
                var b = document.getElementById("c" + d + e);
                if(this.data[d][e] == 0){
                    b.innerHTML = "";
                    b.className = "cell"
                }else{
                    b.innerHTML = this.data[d][e];
                    b.className = "cell n" + this.data[d][e];
                }
            }
        }
        var a = document.getElementById("score");
        a.innerHTML = this.score;
        if(this.isGameOver()){
            this.state = this.GAMEOVER;
            this.topScore();
            document.getElementById("zfinalScore").innerHTML = this.top;
            document.getElementById("finalScore").innerHTML = this.score;
            document.getElementById("gfscore").innerHTML = this.top;
            document.getElementById("gameOver").style.display = "block";
        }
    },topScore:function (){
        if(this.score > this.top){
            this.top = this.score;
        }
    },isGameOver:function (){
        for(var a = 0; a < this.RN; a++){
            for(var b = 0; b < this.CN; b++){
                if(this.data[a][b] == 0){
                    return false;
                }else{
                    if(b < this.CN - 1 && this.data[a][b] == this.data[a][b + 1]){
                        return false;
                    }else{
                        if(a < this.RN - 1 && this.data[a][b] == this.data[a + 1][b]){
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }
};
var animation = {
    DURA:100,STEPS:18,moved:0,timer:null,tasks:[],addTask:function (d,f,b,h,c){
        var e = (h - f) * 116;
        var g = (c - b) * 116;
        var i = e / this.STEPS;
        var a = g / this.STEPS;
        this.tasks.push({obj:d,top:i,left:a})
    },move:function (){
        for(var b = 0; b < this.tasks.length; b++){
            var a = this.tasks[b];
            var c = getComputedStyle(a.obj);
            a.obj.style.top = parseFloat(c.top) + a.top + "px";
            a.obj.style.left = parseFloat(c.left) + a.left + "px"
        }
        if(--this.moved == 0){
            clearInterval(this.timer);
            for(var b = 0; b < this.tasks.length; b++){
                var a = this.tasks[b];
                a.obj.style.top = "";
                a.obj.style.left = "";
            }
            this.tasks = [];
            game.randomNum();
            game.state = game.RUNNING;
            game.updateView();
        }
    },start:function (){
        game.state = game.PLAYING;
        var a = this;
        a.moved = a.STEPS;
        a.timer = setInterval(function (){
            a.move();
        },a.DURA / a.STEPS);
    }
};
window.onload = function (){
    game.start();
    document.onkeydown = function (){
        if(game.state == game.RUNNING){
            var b = window.event || arguments[0];
            var a = b.keyCode;
            if(a == 37){
                game.moveLeft();
            }else{
                if(a == 39){
                    game.moveRight();
                }else{
                    if(a == 38){
                        game.moveUp();
                    }else{
                        if(a == 40){
                            game.moveDown();
                        }
                    }
                }
            }
        }
    }
};


