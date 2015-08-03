var _$={};//gFrame namespace

String.prototype.contains=function(str){
    //return this.search(str)!=-1;
    return this.indexOf(str)!=-1;
}

window.requestAnimationFrame=requestAnimationFrame || webkitRequestAnimationFrame ||
    mozRequestAnimationFrame || msRequestAnimationFrame || oRequestAnimationFrame;
/*window.cancelRequestAnimationFrame=cancelRequestAnimationFrame || webkitCancelRequestAnimationFrame ||
    mozCancelRequestAnimationFrame || msCancelRequestAnimationFrame || oCancelRequestAnimationFrame;*/

//Gobj is game object,initial by only one parameter props
Function.prototype.extend=function(addInObject){
    var father=this;
    //Create child self as constructor function
    var child=function(props){
        father.apply(this,arguments);
        //Add new into child constructor
        addInObject.constructorPlus.call(this,props);//eval(addInObject.constructorPlusStr);
    };
    //Inherit prototype from father
    child.prototype=new father({});
    child.prototype.constructor=child;
    //Add new functions into child.prototype
    for (var attr in addInObject.prototypePlus){
        child.prototype[attr]=addInObject.prototypePlus[attr];
    }
    return child;
};
/*//mixin == $.extend
Object.prototype.mixin=function(){
    switch (arguments.length){
        case 0:
            break;
        default:
            for (var N in arguments){
                var addIn=arguments[N];
                for (var attr in addIn){
                    this[attr]=addIn[attr];
                }
            }
    }
}//Bug: array is also object, for( in ) will traversal on array={0:?,1:?,_proto_.mixin:function}*/
/**************** Add to _$ namespace *******************/

_$.requestAnimationFrame=requestAnimationFrame || webkitRequestAnimationFrame ||
    mozRequestAnimationFrame || msRequestAnimationFrame || oRequestAnimationFrame;

_$.extend=function(father,addInObject){
    //Create child self as constructor function
    var child=function(props){
        father.apply(this,arguments);
        //Add new into child constructor
        addInObject.constructorPlus.call(this,props);//eval(addInObject.constructorPlusStr);
    };
    //Inherit prototype from father
    child.prototype=new father({});
    child.prototype.constructor=child;
    //Add new functions into child.prototype
    for (var attr in addInObject.prototypePlus){
        child.prototype[attr]=addInObject.prototypePlus[attr];
    }
    return child;
};

//_$.mixin == $.extend
_$.mixin=function(){
    switch (arguments.length){
        case 0:
            return {};
        default:
            var dist=arguments[0];
            for (var N=1;N<arguments.length;N++){
                var addIn=arguments[N];
                for (var attr in addIn){
                    dist[attr]=addIn[attr];
                }
            }
            return dist;
    }
}

//Template
_$.templates={
    src:{},
    //register ?id as ?tempStr
    register:function(id,tempStr){
        var tempObj={};
        tempObj.tempStr=tempStr;
        //Auto search for params
        tempObj.params=tempStr.match(/\${2}\w{1,}\${2}/g);// /RegExp/go,NoStop
        _$.templates.src[id]=tempObj;
    },
    //apply template ?id with ?values
    applyOn: function(id,values) {
        var valueArray=[].concat(values);//Convert to array
        var src=_$.templates.src[id];//Get src template object
        var result=src.tempStr;//Get original template
        for (var N=0;N<Math.min(valueArray.length,src.params.length);N++){
            result=result.replace(src.params[N],valueArray[N]);
        }
        return result;
    }
};
/**************** For testing *******************/
/*
//Test extend
var Gobj=function(props){
    this.a=props.a;
    this.b=props.b;
};
Gobj.prototype.add=function(){
    console.log(this.a+this.b);
};
var Coin=Gobj.extend({
    constructorPlus:function(props){
        //this.b=-1;//Can override property here
        this.c=props.c;
    },//constructorPlusStr:"this.c=props.c",
    prototypePlus:{
        minus:function(){
            console.log(this.b-this.a);
        }
        //Can override inherit function here
    }
});
var inst=new Coin({a:1,b:2,c:3});//{a:1,c:3}
*/
/*
//Test mixin
var func1=function(a,b){
    this.a=a;
    this.b=b;
};
func1.prototype.add=function(){
    console.log(this.a+this.b);
};
var func2=function(c,d){
    this.c=c;
    this.d=d;
};
func2.prototype.minus=function(){
    console.log(this.c-this.d);
};
var inst1=new func1(1,2);
var inst2=new func2(3,4);
console.log(_$.mixin(inst1,inst2));
inst1.mixin(inst2,{d:0,e:5});
console.log(inst1);
*/
//Test template
_$.templates.register("myP","<p>Level $$level$$</p>");
_$.templates.register("myImg","<img src='$$path$$'/>");
console.log(_$.templates.applyOn("myP",6));
console.log(_$.templates.applyOn("myImg",'img/Bg.jpg'));
//Convert type, valueOf will get value from Object<Of->Obj>
new Number('1.23').valueOf()===1.23;//String to Number
new String(123).valueOf()==='123';//Number to String
