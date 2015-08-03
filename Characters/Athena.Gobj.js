//Define hero
var Hero=Gobj.extend({
    constructorPlus:function(props){
        this.direction=0;
        this.HP=props.HP;//Full HP
        this.life=this.HP;
        this.score=0;
        this.selected=false;
    },
    prototypePlus:{
        //Override
        detectOutOfBound:function(){
            if (this.x>(Game.HBOUND+this.width)) {
                this.x=-this.width;
            }//Right Bound
            if (this.x<-this.width) {
                this.x=Game.HBOUND+this.width;
            }//Left Bound
        },
        //Add new functions to prototype
        turnTo:function(direction){
            //Change direction
            if (this.direction!=direction){
                this.direction=direction;
                this.xspeed=-this.xspeed;
            }
        },
        stand:function(){
            this.stop();
        },//alias
        run:function(){
            this.moving();
        }//alias
    }
});

var Athena=new Hero({
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
    xspeed:25,
    yspeed:0,
    HP:10
});