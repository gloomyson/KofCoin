var sound=function(type){
    this.track=sourceLoader.sources[type];
	this.interval=100;
};

sound.prototype.bind=function(_charas,status){
    var charas=new Array().concat(_charas);//Convert to array
    var flag=false;//Flag for all
    for (var N in charas){
        if (charas[N].status==status){
            this.track.play();
            flag=true;//Now one bombs
        }
    }
    //None bombs
    if (!flag){
        //Stop track
		this.track.pause();
        this.track.currentTime=0;//Avoid play from middle next time
	}
	var myself=this;
	setTimeout(function(){
		myself.bind(_charas,status);
	},this.interval);//Loop detect
};