var interval;var currentNum=0;var delta={};var start={};var lunbo={pre:function(){this.stop();this.doCircle(currentNum,false)},next:function(){this.stop();this.doCircle(currentNum,true)},touchstart:function(){this.stop()},touchmove:function(){},touchend:function(){},stop:function(){clearTimeout(interval)},sendWin:function(f){try{for(var b=0,a=winUrlArr[f].length;b<a;b++){var d=new Image();if(winUrlArr[f][b]!==0){d.src=winUrlArr[f][b]}else{return}winUrlArr[f][b]=0;d.onload=d.onerror=function(){}}}catch(c){}},doCircle:function(g,b){var c=document.getElementById("itemUl");if(!c){return}var h=c.children;var e=c.children.length;if(e===1){return}var f=c.clientWidth;var d=document.getElementById("itemCircle").children;var a=0;if(b){if(g<e-1){a=parseInt(h[g].style.left===""?h[g].clientLeft:h[g].style.left,10)+f;h[g+1].style.left=a+"px";if(g+1===e-1){h[0].style.left=a+f+"px"}else{h[g+2].style.left=a+f+"px"}c.style.left=-a+"px";d[g].className="circle";c.style.transition="right .5s ease-in-out";g++}else{a=parseInt(h[e-1].style.left===""?h[e-1].clientLeft:h[e-1].style.left,10)+f;h[0].style.left=a+"px";h[1].style.left=a+f+"px";c.style.left=-a+"px";d[g].className="circle";c.style.transition="right .5s ease-in-out";g=0}currentNum=g}else{if(g===0){a=parseInt(h[g].style.left===""?h[g].clientLeft:h[g].style.left,10)-f;h[e-1].style.left=a+"px";if(e-2>-1){h[e-2].style.left=a-f+"px"}else{h[0].style.left=a-f+"px"}c.style.left=-a+"px";d[g].className="circle";c.style.transition="right .5s ease-in-out";g=e-1}else{a=parseInt(h[g].style.left===""?h[g].clientLeft:h[g].style.left,10)-f;h[g-1].style.left=a+"px";if(g-1>0){h[g-2].style.left=a-f+"px"}else{h[e-1].style.left=a-f+"px"}c.style.left=-a+"px";d[g].className="circle";c.style.transition="right .5s ease-in-out";g--}currentNum=g}var i=parseInt(document.getElementById("container").clientWidth,10)/16;d[g].className="circle circleNow";c.style.transition="right .5s ease-in-out";interval=setTimeout(function(){lunbo.doCircle(g,true)},5000);this.sendWin(currentNum)}};oojs.define({name:"page",namespace:"",deps:{},sdk:{},adsExtention:[],$page:function(){try{lunbo.sendWin(0);interval=setTimeout(function(){lunbo.doCircle(0,true)},5000);this.sdk=(window.baidu&&window.baidu.mobads&&window.baidu.mobads.Sdk)||(parent&&parent.baidu&&parent.baidu.mobads&&parent.baidu.mobads.Sdk);if(this.sdk){var a=document.getElementById("closeBtn");a.style.display="block";this.bindCloseHandler(a)}if(window.adsExtention&&document.getElementById("container")){this.adClick("container",window.adsExtention)}this.containerResize();this.bind(window,"resize",function(){this.containerResize()}.proxy(this))}catch(b){}},bindCloseHandler:function(a){var b=a;if(b){this.bind(b,"click",function(){this.sdk.onAdPlayEnd();lunbo.stop();this.stopEvent(this)}.proxy(this))}else{b.style.display="none"}},onNextClick:function(a){lunbo.next();return this.stopEvent(a)},onPreClick:function(a){lunbo.pre();return this.stopEvent(a)},onAdTouchStart:function(a){lunbo.stop();var b=a.touches[0];start={x:b.pageX,y:b.pageY};delta={}},onAdTouchMove:function(c){var d=c.touches[0];delta={x:d.pageX-start.x,y:d.pageY-start.y};var a=document.getElementById("itemUl");var b=a.children;var e=parseInt(b[currentNum].style.left===""?b[currentNum].clientLeft:b[currentNum].style.left,10)-delta.x;a.style.left=-e+"px";a.style.transition="right .5s ease-in-out";this.stopEvent(c)},onAdTouchEnd:function(a){if(Math.abs(delta.x)<10||delta.x===undefined){return}if(delta.x>0){lunbo.pre()}else{lunbo.next()}},adClick:function(g,j){this.adsExtention=j||window.adsExtention;g=g||"container";var a=document.getElementById(g);var h=a.getElementsByTagName("a");for(var f=0;f<h.length;f++){var b=h[f].className;if(b){b=b.toLowerCase();if(b==="gylogo"||b==="bdlogo"||b.substring(0,7)==="bd-logo"){continue}}this.bind(h[f],"click",this.onAdClick.proxy(this));var e=true;var c=document.getElementById("itemUl");if(!c){e=false}var k=c.children;var d=c.children.length;if(d===1){e=false}if(e){this.bind(h[f],"touchstart",this.onAdTouchStart.proxy(this));this.bind(h[f],"touchmove",this.onAdTouchMove.proxy(this));this.bind(h[f],"touchend",this.onAdTouchEnd.proxy(this))}}},doClose:function(){this.sdk.onAdPlayEnd();lunbo.stop();this.stopEvent(this)},onAdClick:function(d){var g=this.formatEventObj(d);var b=g.target;if(b.id.indexOf("closeDiv")>-1){this.doClose()}while(b.tagName.toLowerCase()!=="a"&&b.tagName.toLowerCase()!=="body"){b=b.parentNode}var h=this.getAttr(b,"data-adindex");h=parseInt(h,10);var c=this.adsExtention[h];var a=parseInt(this.getAttr(b,"data-adtype"),10);var f=this.getAttr(b,"href");c.curl=b.href||c.curl;if(a===4){window.top.location=b.href;return this.stopEvent(g)}this.sdk.handleClick(c);lunbo.next();return this.stopEvent(g)},containerResize:function(){var h=document.getElementById("container");var n=document.getElementById("itemUl");var p=n.children;var l=n.children.length;var x=parseInt(window.innerWidth,10);var c=parseInt(window.innerHeight,10);if(h.clientWidth===0||h.clientHeight===0||(l&&l>1)){return}var q=20;var u=navigator.userAgent.toLowerCase();var t=((u.indexOf("iphone")>-1)||(u.indexOf("ipad")>-1));c=t?c-q:c;var b=document.getElementById("itemBg");var v=document.getElementById("imgAD");var g=document.getElementById("bd-logo");var f=document.getElementById("mob-bd-adIcon");var d=document.getElementById("fbIconDiv");if(b&&v){h.style.marginTop=0;h.style.marginLeft=0;h.style.height="100%";var C=parseInt(this.getAttr(v,"data-imgBorder"),10);var e=parseFloat(this.getAttr(v,"data-imgRatio"));var B=(c-C*2)/(x-C*2);var j=0;var s=0;if(B>=1){j=x;s=j*5/6}else{if(g){g.style.bottom="0px";g.style.right=(x-j)/2+26+"px";g.style.display=""}if(f){f.style.bottom="0px";f.style.right=(x-j)/2+"px"}if(d){d.style.bottom="0px";d.style.right=(x-j)/2+"px"}return false}var z=60/750*j;var r=113/625*s;var w=0;var a=0;if(e>B){a=s-r*2;w=a*2}else{w=j-z*2;a=w/2}var A="width:"+w+"px;height:"+a+"px;";v.style.cssText=A;var y="width:"+j+"px;height:"+s+"px;margin:"+(c-C*2-s)/2+"px "+(x-C*2-j)/2+"px;padding:"+r+"px "+z+"px";b.style.cssText=y;var k=document.getElementById("btn");var o="width:"+j/3+"px;height:"+j/15+"px;line-height:"+j/15+"px;font-size:"+j/30+"px;position:absolute;left:"+(j-j/3)/2+"px;bottom:"+s/15+"px;";if(k){k.style.cssText=o}var i=document.getElementById("item0");if(i){i.style.cssText="width:"+j+"px;height:"+s+"px;position:absolute;z-index:15;left:"+(x-C*2-j)/2+"px;top:0px;"}if(g){g.style.bottom=(c-s)/2+(t?q:0)/2+"px";g.style.right=(x-j)/2+26+"px";g.style.display=""}if(f){f.style.bottom=(c-s)/2+(t?q:0)/2+"px";f.style.right=(x-j)/2+"px"}if(d){d.style.bottom=(c-s)/2+(t?q:0)/2+"px";d.style.right=(x-j)/2+"px"}}},bind:function(a,c,b){if(a.addEventListener){a.addEventListener(c,b,false)}else{a.attachEvent("on"+c,b)}},getAttr:function(b,a){if(b&&b.getAttribute){return b.getAttribute(a)}else{return b[a]}},formatEventObj:function(a){a=a||window.event;a.target=a.target||a.srcElement;return a},stopEvent:function(a){if(a&&a.stopPropagation){a.stopPropagation()}else{window.event.cancelBubble=true}if(a&&a.preventDefault){a.preventDefault()}return false}});