var Coin=function(props){
	this.name=props.name;
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
	this.speed=props.speed;
	this.action=0;
	this.bomb=false;
    this.status="";
	this._timer=-1;
};

Coin.prototype.reset=function(){
    //Reset position
    this.y=Referee.scoreHeight;
	this.x=Math.random()*(Game.HBOUND-this.width);
    //Resume dropping
    this.drop();
};
Coin.prototype.burst=function(){
    //Stop coin
    this.stop();
	this.status="burst";
    sourceLoader.sources['glass'].play();//No need to bind
	
    //Burst for 1000ms
    var myself=this;
	this._timer=setTimeout(function(){
        myself.reset();
	},1000);
};
Coin.prototype.detectOutOfBound=function(){
	if (this.y>Game.VBOUND-this.width) {
		this.burst();
		this.bomb=true;
	}//Bottom Bound
};
Coin.prototype.move=function(){
	//Relocate character
	this.action++;
	if (this.action>=this.frame) {
		this.action=0;
	}
	this.y+=this.speed;

    //Detect OutOfBound
    this.detectOutOfBound();
};
Coin.prototype.moving=function(){
	if(this.status!="moving"){
		var myself=this;
		this._timer=setInterval(function(){myself.move()},100);//Recommend,inter of <v>
		//Call outside, not inside code (*p as parameter), has myself definition in native{}
		this.status="moving";
	}
};
Coin.prototype.drop=function(){
    this.moving();
};//alias
Coin.prototype.stop=function(){
	clearInterval(this._timer);//Clear moving timer
	clearTimeout(this._timer);//Clear burst timer
	this.status="stop";
};
Coin.prototype.include=function(obj){
	var centerX=obj.x+obj.width/2;
	var centerY=obj.y+obj.height/2;
	return (centerY>this.y)&&(centerY<this.y+this.height)&&(centerX>this.x)&&(centerX<this.x+this.width);
};
Coin.prototype.takeAway=function(){
    //this.status="takeaway";////Can cause bug, !='Moving'
    sourceLoader.sources['bingo'].play();
    this.reset();
};

Coin.GoldCoin={name:"GoldCoin",speed:10,
    getEffectOn:function(hero){
        hero.score+=10;//plusScore
        //Referee.score+=10;
    },
    bombEffectOn:function(hero){
        hero.life-=1;//damage
    }
};
Coin.OrangeCoin={name:"OrangeCoin",speed:15,
    getEffectOn:function(hero){
        hero.score+=20;//plusScore
    },
    bombEffectOn:function(hero){
        hero.life-=2;//damage
    }
};
Coin.RedCoin={name:"RedCoin",speed:15,
    getEffectOn:function(hero){
        hero.score+=30;//plusScore
    },
    bombEffectOn:function(hero){
        hero.life-=3;//damage
    }
};
Coin.GreenCoin={name:"GreenCoin",speed:20,
    getEffectOn:function(hero){
        hero.life+=1;//heal
    },
    bombEffectOn:function(hero){
        //Do nothing
    }
};
Coin.PurpleCoin={name:"PurpleCoin",speed:20,
    getEffectOn:function(hero){
        hero.speed+=(hero.speed>0)?5:-5;//speed up
    },
    bombEffectOn:function(hero){
        //Do nothing
    }
};
Coin.BlackCoin={name:"BlackCoin",speed:8,
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
