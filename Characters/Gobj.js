var Gobj=function(props){
    this.name=props.name;
    this.width=props.width;
    this.height=props.height;
    this.x=props.x;
    this.y=props.y;
    this.imgPos=props.imgPos;
    this.frame=props.frame;
    this.xspeed=props.xspeed;
    this.yspeed=props.yspeed;
    this.action=0;
    this.status="";
    this._timer=-1;
};

Gobj.prototype.detectOutOfBound=function(){
    //Do nothing here
};
Gobj.prototype.move=function(){
    //Relocate character
    this.action++;
    if (this.action>=this.frame) {
        this.action=0;
    }
    this.x+=this.xspeed;
    this.y+=this.yspeed;
    //Detect OutOfBound
    this.detectOutOfBound();
};
Gobj.prototype.moving=function(){
    if(this.status!="moving"){
        var myself=this;
        this._timer=setInterval(function(){myself.move()},100);//Recommend,inter of <v>
        //Call outside, not inside code (*p as parameter), has myself definition in native{}
        this.status="moving";
    }
};
Gobj.prototype.stop=function(){
    //Clear both kinds of timer
    clearInterval(this._timer);
    clearTimeout(this._timer);
    this.status="stop";
};
Gobj.prototype.include=function(obj){
    var centerX=obj.x+obj.width/2;
    var centerY=obj.y+obj.height/2;
    return (centerY>this.y)&&(centerY<this.y+this.height)&&(centerX>this.x)&&(centerX<this.x+this.width);
};
Gobj.prototype.includePoint=function(x,y){
    return (y>this.y)&&(y<this.y+this.height)&&(x>this.x)&&(x<this.x+this.width);
};
