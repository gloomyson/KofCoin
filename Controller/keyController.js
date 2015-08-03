var keyController={
	toControl:function(chara){
		//Keyboard settings
        window.onkeydown=function(event){
            switch (event.keyCode){
                case 37:
                    chara.turnTo(1);
                    break;
                case 38:
                    chara.run();
                    break;
                case 39:
                    chara.turnTo(0);
                    break;
                case 40:
                    chara.stand();
                    break;
            }
		};
        window.onkeyup=function(){
			//chara.run();
		};
	}
};