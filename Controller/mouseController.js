var mouseController={
	toControl:function(chara){
		var offset=$('#GameBoard').offset();
        //Prevent context menu show
        $('#GameBoard')[0].oncontextmenu=function(event){
            event.preventDefault();
        };
		//Mouse settings
		$('#GameBoard')[0].onmousedown=function(event){
            chara.stop();
            //Mouse click at (clickX,clickY)
            var clickX=event.pageX-offset.left;
            var clickY=event.pageY-offset.top;
            if (clickX<chara.x+chara.width/2){
                chara.turnTo(1);
            }
            else{
                chara.turnTo(0);
            }
            if (chara.includePoint(clickX,clickY)) {
                chara.selected=true;
            }
            else {
                chara.selected=false;
            }
		};
        $('#GameBoard')[0].onmouseup=function(event){
			chara.run();
		};
	}
};