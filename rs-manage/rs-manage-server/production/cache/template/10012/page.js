/* eslint-disable */oojs.define({name:"page",namespace:"",deps:{},sdk:{},adsExtention:[],resizeTimer:null,$page:function(){try{this.adClick("container")}catch(a){}this.timer=5000;this.autoLunbo(this.timer,"frame")},adClick:function(f){f=f||"container";var e=document.getElementById(f);var d=e.getElementsByTagName("a");for(var b=0;b<d.length;b++){var c=d[b].className;var a=d[b].id;if(c){c=c.toLowerCase();if(c==="gylogo"||c==="bdlogo"||c.substring(0,7)==="bd-logo"){continue}}this.bind(d[b],"click",this.onAdClick.proxy(this))}},onAdClick:function(c){var d=this.formatEventObj(c);var b=d.target;while(b.tagName.toLowerCase()!=="a"&&b.tagName.toLowerCase()!=="body"){b=b.parentNode}var f=this.getAttr(b,"type");if(f==="phone"){var a=this.getAttr(b,"href");var g=this.getAttr(b,"data-tel");this.sendByImage(a,window,g);return this.stopEvent(c)}else{if(f==="forward"){var g=this.getAttr(b,"href");window.open(g,"_blank");return this.stopEvent(c)}}},bind:function(b,a,c){if(b.addEventListener){b.addEventListener(a,c,false)}else{b.attachEvent("on"+a,c)}},getAttr:function(b,a){if(b&&b.getAttribute){return b.getAttribute(a)}else{return b[a]}},formatEventObj:function(a){a=a||window.event;a.target=a.target||a.srcElement;return a},stopEvent:function(a){if(a&&a.stopPropagation){a.stopPropagation()}else{window.event.cancelBubble=true}if(a&&a.preventDefault){a.preventDefault()}return false},lunbo:function(){clearTimeout(this.lunboTimer);this.displayDom.style.top=0;this.hiddenDom.style.top=this.lunboStep+"px";this.lunboInterval=setInterval(function(){this.displayDom.style.top=parseFloat(this.displayDom.style.top.replace("px",""))-this.lunboEachStep+"px";this.hiddenDom.style.top=parseFloat(this.hiddenDom.style.top.replace("px",""))-this.lunboEachStep+"px";if(Math.abs(this.hiddenDom.style.top.replace("px",""))<=this.lunboEachStep||Math.abs(this.hiddenDom.style.top.replace("px",""))===0){clearInterval(this.lunboInterval);this.hiddenDom.style.top=0;this.displayDom.style.top=this.lunboStep+"px";var a=this.displayDom;this.displayDom=this.hiddenDom;this.hiddenDom=a}}.proxy(this),50)},autoLunbo:function(a,b,c){this.lunboDomArray=document.querySelectorAll("div."+b);this.lunboStep=this.lunboDomArray[0].offsetHeight;if(this.lunboStep&&this.lunboDomArray.length){this.lunboEachStep=this.lunboStep/10;this.displayDom=this.displayDom||this.lunboDomArray[0];this.hiddenDom=this.hiddenDom||this.lunboDomArray[1];this.lunboTimer=setTimeout(function(){this.lunboAd()}.proxy(this),this.timer)}},lunboAd:function(){clearInterval(this.lunboInterval);this.lunbo();this.lunboTimer=setTimeout(function(){this.lunboAd()}.proxy(this),this.timer)},sendByImage:function(b,d,a){var f=new Image();var c="cpro_log_"+Math.floor(Math.random()*2147483648).toString(36);d=d||window;d[c]=f;f.onload=f.onerror=f.onabort=function(){f.onload=f.onerror=f.onabort=null;d[c]=null;f=null;window.open(a,"_top")};f.src=b;var e=navigator.userAgent.toLowerCase();if(e.indexOf("safari")>-1&&e.indexOf("version")>-1&&(e.indexOf("iphone")>-1||e.indexOf("ipad")>-1||e.indexOf("itouch")>-1)){window.open(a,"_top")}}});