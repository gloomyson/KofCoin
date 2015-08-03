var Referee={
	_name:"Referee",
	winScore:0,
    scoreHeight:30,
	_timer:-1,
	drawScore:function(hero){
		Game.cxt.clearRect(0,0,Game.HBOUND,this.scoreHeight);
        Game.cxt.font="italic bold 20px Arial";
        Game.cxt.fillStyle="#0000ff";
		Game.cxt.fillText("Score:"+hero.score+"/"+this.winScore+"		"+"Life:"+hero.life,10,this.scoreHeight);
	},
	win:function(){
		this.stopDetect();
        Game.layerSwitchTo("GameWin");
	},
	lose:function(){
		this.stopDetect();
        Game.layerSwitchTo("GameLose");
	},
	detectLoop:function(charas){
		var hero=charas.hero;
		var coins=charas.coins;
		for(var N in coins){
			//Detect get coins
			if (hero.include(coins[N])) {
				Coin[coins[N].name].getEffectOn(hero);
				coins[N].takeAway();
				this.drawScore(hero);
			}
			//Detect coin bombs
			if (coins[N].bomb) {
                Coin[coins[N].name].bombEffectOn(hero);//New code
				coins[N].bomb=false;
				this.drawScore(hero);
			}
		};
        //Detect player wins
        if (hero.score>=this.winScore) {
            Referee.win();
            Game.stop(coins.concat(hero));
        }
        //Detect player lose
        if (hero.life<=0) {
            Referee.lose();
            Game.stop(coins.concat(hero));
        }
	},
	startDetect:function(charas){
		eval(this._name+".drawScore(charas.hero)");
		window.charas=charas;
		this._timer=setInterval(this._name+".detectLoop(charas)",100);//Bind this to Referee here!
	},
	stopDetect:function(){
		clearInterval(this._timer);
	}
}