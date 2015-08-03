var Game={
    level:1,
    //Global variables
    HBOUND:window.innerWidth*0.97,//Same with style.css
    VBOUND:window.innerHeight*0.95,//Same with style.css
    cxt:$('#GameBoard')[0].getContext('2d'),
    _timer:-1,
    _frameInterval:100,
    layerSwitchTo:function(layerName){
        $('div.GameLayer').hide();
        $('#'+layerName).show(); //show('slow')
    },
    init:function(){
        Game.layerSwitchTo("GameLoading");
        window.requestAnimationFrame=requestAnimationFrame || webkitRequestAnimationFrame
            || mozRequestAnimationFrame || msRequestAnimationFrame || oRequestAnimationFrame;//Old browser compatible
        sourceLoader.load("img","img/Charas/Athena.png","Athena");
        sourceLoader.load("img","img/Charas/GoldCoin.png","GoldCoin");
        sourceLoader.load("img","img/Charas/OrangeCoin.png","OrangeCoin");
        sourceLoader.load("img","img/Charas/RedCoin.png","RedCoin");
        sourceLoader.load("img","img/Charas/GreenCoin.png","GreenCoin");
        sourceLoader.load("img","img/Charas/PurpleCoin.png","PurpleCoin");
        sourceLoader.load("img","img/Charas/BlackCoin.png","BlackCoin");
        sourceLoader.load("audio","bgm/glass.mp3","glass");
        sourceLoader.load("audio","bgm/running.mp3","running");
        sourceLoader.load("audio","bgm/bingo.mp3","bingo");
        sourceLoader.load("img","img/Bg/GameStart.jpg","GameStart");
        sourceLoader.load("img","img/Bg/GamePlay.jpg","GamePlay");
        sourceLoader.load("img","img/Bg/GameWin.jpg","GameWin");
        sourceLoader.load("img","img/Bg/GameLose.jpg","GameLose");

        sourceLoader.allOnLoad(function(){
            $('#GameStart').prepend(sourceLoader.sources['GameStart']);
            $('#GamePlay').prepend(sourceLoader.sources['GamePlay']);
            $('#GameWin').prepend(sourceLoader.sources['GameWin']);
            $('#GameLose').prepend(sourceLoader.sources['GameLose']);
            $('#GameBoard')[0].width=Game.HBOUND;//Canvas width adjust
            $('#GameBoard')[0].height=Game.VBOUND;//Canvas height adjust
            Game.start();
        })
    },
    start:function(){
        //Game start
        Game.layerSwitchTo("GameStart");
        //Init level selector
        for (var level=1; level<=levels.length; level++){
            $('.levelSelectionBg').append("<div class='levelItem'>" +
                "<input type='radio' value='"+level+"' name='levelSelect'>Level "+level+"</input>" +
                "</div>");
        }
        //Wait for user select level and play game
        $('input[name="levelSelect"]').click(function(){
            Game.level=this.value;
            Game.play();
        });
    },
    play:function(){
        //Game background
        Game.layerSwitchTo("GamePlay");
        //Bind controller
        mouseController.toControl(Athena);
        keyController.toControl(Athena);
        //Athena move
        Athena.run();
        new sound('running').bind(Athena,"moving");
        //Coins init and move
        var coins=[];
        var gameLevel=levels[this.level-1];
        for (var N in gameLevel.coinsInfo){
            var coin=new Coin(gameLevel.coinsInfo[N]);
            coin.drop();
            coins=coins.concat(coin);
        }
        Game.animation(coins.concat(Athena));
        //Burst audio
        //new sound('glass').bind(coins,"burst");//No need to bind
        //Referee init and start
        Referee.winScore=gameLevel.winScore;
        Referee.startDetect({
            hero:Athena,
            coins:coins
        });
    },
    animation:function(charas){
        var loop=function(){
            //Clear rect except scoreboard
            Game.cxt.clearRect(0,Referee.scoreHeight,Game.HBOUND,Game.VBOUND-Referee.scoreHeight);
            for (var N in charas){
                //Draw animation for each chara
                var imgSrc=sourceLoader.sources[charas[N].name];
                var chara=charas[N];
                if (chara.direction==undefined){
                    //Multiple frames status
                    if (chara.status=='moving'){
                        Game.cxt.drawImage(imgSrc,
                            chara.imgPos[chara.status].left[chara.action],
                            chara.imgPos[chara.status].top[chara.action],
                            chara.width,chara.height,chara.x,chara.y,chara.width,chara.height);
                    }
                    else{
                        Game.cxt.drawImage(imgSrc,
                            chara.imgPos[chara.status].left,
                            chara.imgPos[chara.status].top,
                            chara.width,chara.height,chara.x,chara.y,chara.width,chara.height);
                    }
                }
                else{
                    //Multiple frames status
                    if (chara.status=='moving'){
                        Game.cxt.drawImage(imgSrc,
                            chara.imgPos[chara.status].left[chara.direction][chara.action],
                            chara.imgPos[chara.status].top[chara.direction][chara.action],
                            chara.width,chara.height,chara.x,chara.y,chara.width,chara.height);
                    }
                    else{
                        Game.cxt.drawImage(imgSrc,
                            chara.imgPos[chara.status].left[chara.direction],
                            chara.imgPos[chara.status].top[chara.direction],
                            chara.width,chara.height,chara.x,chara.y,chara.width,chara.height);
                    }
                }
                //Draw HP if has selected and is true
                if (chara.selected==true){
                    var centerX=chara.x+chara.width/2;
                    var centerY=chara.y+chara.height/2;
                    //Draw selected circle
                    Game.cxt.strokeStyle="green";
                    Game.cxt.beginPath();
                    Game.cxt.arc(centerX,centerY,Math.max(chara.width,chara.height)/2,0,2*Math.PI);
                    Game.cxt.stroke();
                    //Draw HP bar
                    Game.cxt.fillStyle="gray";
                    Game.cxt.fillRect(chara.x,chara.y-10,chara.width,10);
                    Game.cxt.fillStyle="green";
                    Game.cxt.fillRect(chara.x,chara.y-10,chara.width*chara.life/chara.HP,10);
                }
            }
            //Game._timer=requestAnimationFrame(loop);//AnimationFrame
        }

        Game._timer=setInterval(loop,Game._frameInterval);
        //Game._timer=requestAnimationFrame(loop);//AnimationFrame
    },
    stopAnimation:function(){
        clearInterval(Game._timer);
    },
    stop:function(charas){
        for(var N in charas){
            charas[N].stop();
        }
        Game.stopAnimation();
    }
};
