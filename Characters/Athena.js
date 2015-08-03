var Athena={
	name:"Athena",
	x:0,
	y:innerHeight*0.95*0.63,//Same with css and original y
	imgPos:{
		moving:{
			left:[[0,95,190,285,379,474],[0,95,190,285,379,474]],
			top:[[0,0,0,0,0,0],[95,95,95,95,95,95]]
		},
		stop:{
			left:[0,95],
			top:[190,190]
		}
	},
	width:95,
	height:95,
	frame:6,
	speed:25,
	action:0,
	direction:0,
	life:10,
    score:0,
    status:"",
	_timer:-1,

	detectOutOfBound:function(){
		if (this.x>(Game.HBOUND+this.width)) {
			this.x=-this.width;
		}//Right Bound
		if (this.x<-this.width) {
			this.x=Game.HBOUND+this.width;
		}//Left Bound
	},
	move:function(){
		//Relocate character
		this.action++;
		if (this.action>=this.frame) {
			this.action=0;
		}
		this.x+=this.speed;
		
		//Detect OutOfBound
		eval(this.name+".detectOutOfBound()");
	},
	turnTo:function(direction){
		//Change direction
		if (this.direction!=direction){
			this.direction=direction;
			this.speed=-this.speed;
		}
	},
    moving:function(){
		if(this.status!="moving"){
			this._timer=setInterval(this.name+".move()",100);
			this.status="moving";
		}
	},
    stop:function(){
		clearInterval(this._timer);
		this.status="stop";
	},
	include:function(obj){
		var centerX=obj.x+obj.width/2;
		var centerY=obj.y+obj.height/2;
		return (centerY>this.y)&&(centerY<this.y+this.height)&&(centerX>this.x)&&(centerX<this.x+this.width);
	},
	stand:function(){
		this.stop();
	},//alias
	run:function(){
		this.moving();
	}//alias
};