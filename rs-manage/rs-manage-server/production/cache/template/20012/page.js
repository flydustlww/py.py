oojs.define({name:"page",namespace:"20012",deps:{},sdk:{},mobInterface:{},downloadingIntervel:null,adsExtention:[],$page:function(){try{this.paint();if(window.adsExtention&&document.getElementById("container")){this.adClick("container",window.adsExtention)}}catch(a){}},adClick:function(b,e){this.adsExtention=e||window.adsExtention;b=b||"container";var a=document.getElementById(b);var f=a.getElementsByTagName("a");for(var c=0;c<f.length;c++){var d=f[c].className;if(d){d=d.toLowerCase();if(d==="gylogo"||d==="bdlogo"||d.substring(0,7)==="bd-logo"){continue}}this.bind(f[c],"click",this.onAdClick.proxy(this))}},onAdClick:function(c){var d=this.formatEventObj(c);var b=d.target;while(b.tagName.toLowerCase()!=="a"&&b.tagName.toLowerCase()!=="body"){b=b.parentNode}var f=this.getAttr(b,"data-adtype");var a=navigator.userAgent.toLowerCase();f=parseInt(f,10);if(f===5&&a.indexOf("safari")>-1&&a.indexOf("version")>-1&&(a.indexOf("iphone")>-1||a.indexOf("ipad")>-1||a.indexOf("itouch")>-1)){window.top.location=b.href}},bind:function(a,c,b){if(a.addEventListener){a.addEventListener(c,b,false)}else{a.attachEvent("on"+c,b)}},getAttr:function(b,a){if(b&&b.getAttribute){return b.getAttribute(a)}else{return b[a]}},formatEventObj:function(a){a=a||window.event;a.target=a.target||a.srcElement;return a},stopEvent:function(a){if(a&&a.stopPropagation){a.stopPropagation()}else{window.event.cancelBubble=true}if(a&&a.preventDefault){a.preventDefault()}return false},paint:function(){this.sendPostmsg()},sendPostmsg:function(){var f=document.getElementById("item0");var e=this.getAttr(f,"data-title");var a=this.getAttr(f,"data-href");var d=parseInt(window.innerWidth,10)/parseInt(window.innerHeight,10);var c={dspid:6,title:e,curl:a,scale:d};var b=JSON.stringify(c);window.parent.postMessage(b,"*")}}); 