//Define coin
var Coin=Gobj.extend({
    constructorPlus:function(props){
        //Override father constructor
        this.width=95;
        this.height=95;
        this.x=Math.random()*(Game.HBOUND-this.width);//not use props.x
        this.y=Referee.scoreHeight;//not use props.y
        this.imgPos={
            moving:{
                left:[0,120,250,375,500,625],
                top:[0,0,0,0,0,0]
            },
            stop:{
                left:0,
                top:0
            },
            burst:{
                left:750,
                top:0
            }
        };
        this.frame=6;
        //Add new to father constructor
        this.bomb=false;
    },
    prototypePlus:{
        //Override
        detectOutOfBound:function(){
            if (this.y>Game.VBOUND-this.width) {
                this.burst();
                this.bomb=true;
            }//Bottom Bound
        },
        //Add new functions to prototype
        reset:function(){
            //Reset position
            this.y=Referee.scoreHeight;
            this.x=Math.random()*(Game.HBOUND-this.width);
            //Resume dropping
            this.drop();
        },
        burst:function(){
            //Stop coin
            this.stop();
            this.status="burst";
            sourceLoader.sources['glass'].play();//No need to bind

            //Burst for 1000ms
            var myself=this;
            this._timer=setTimeout(function(){
                myself.reset();
            },1000);
        },
        drop:function(){
            this.moving();
        },
        takeAway:function(){
            //this.status="takeaway";////Can cause bug, !='Moving'
            sourceLoader.sources['bingo'].play();
            this.reset();
        }
    }
});

Coin.GoldCoin={name:"GoldCoin",xspeed:0,yspeed:10,
    getEffectOn:function(hero){
        hero.score+=10;//plusScore
        //Referee.score+=10;
    },
    bombEffectOn:function(hero){
        hero.life-=1;//damage
    }
};
Coin.OrangeCoin={name:"OrangeCoin",xspeed:0,yspeed:15,
    getEffectOn:function(hero){
        hero.score+=20;//plusScore
    },
    bombEffectOn:function(hero){
        hero.life-=2;//damage
    }
};
Coin.RedCoin={name:"RedCoin",xspeed:0,yspeed:15,
    getEffectOn:function(hero){
        hero.score+=30;//plusScore
    },
    bombEffectOn:function(hero){
        hero.life-=3;//damage
    }
};
Coin.GreenCoin={name:"GreenCoin",xspeed:0,yspeed:20,
    getEffectOn:function(hero){
        hero.life+=1;//heal
    },
    bombEffectOn:function(hero){
        //Do nothing
    }
};
Coin.PurpleCoin={name:"PurpleCoin",xspeed:0,yspeed:20,
    getEffectOn:function(hero){
        hero.xspeed+=(hero.xspeed>0)?5:-5;//speed up
    },
    bombEffectOn:function(hero){
        //Do nothing
    }
};
Coin.BlackCoin={name:"BlackCoin",xspeed:0,yspeed:8,
    getEffectOn:function(hero){
        //Bad effect
        hero.score-=30;//plusScore
        //Worse
        hero.life-=1;//damage
    },
    bombEffectOn:function(hero){
        //Do nothing
    }
};
