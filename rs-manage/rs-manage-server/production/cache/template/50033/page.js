oojs.define({name:"page",namespace:"",deps:{},sdk:{},adsExtention:[],$page:function(){try{this.sdk=(window.baidu&&window.baidu.mobads&&window.baidu.mobads.Sdk)||(parent&&parent.baidu&&parent.baidu.mobads&&parent.baidu.mobads.Sdk);if(window.adsExtention&&document.getElementById("container")){this.adClick("container",window.adsExtention)}}catch(a){}},adClick:function(b,e){this.adsExtention=e||window.adsExtention;b=b||"container";var a=document.getElementById(b);var f=a.getElementsByTagName("a");for(var c=0;c<f.length;c++){var d=f[c].className;if(d){d=d.toLowerCase();if(d==="gylogo"||d==="bdlogo"||d.substring(0,7)==="bd-logo"){continue}}this.bind(f[c],"click",this.onAdClick.proxy(this))}},onAdClick:function(d){var f=this.formatEventObj(d);var b=f.target;while(b.tagName.toLowerCase()!=="a"&&b.tagName.toLowerCase()!=="body"){b=b.parentNode}var g=this.getAttr(b,"data-adindex");g=parseInt(g,10);var c=this.adsExtention[g];c.curl=b.href||c.curl;var a=navigator.userAgent.toLowerCase();if(g===5&&a.indexOf("safari")>-1&&a.indexOf("version")>-1&&(/iphone|ipad|ipod|itouch/.test(a))){window.top.location=b.href;return this.stopEvent(d)}this.sdk.handleClick(c);return this.stopEvent(d)},bind:function(a,c,b){if(a.addEventListener){a.addEventListener(c,b,false)}else{a.attachEvent("on"+c,b)}},getAttr:function(b,a){if(b&&b.getAttribute){return b.getAttribute(a)}else{return b[a]}},formatEventObj:function(a){a=a||window.event;a.target=a.target||a.srcElement;return a},stopEvent:function(a){if(a&&a.stopPropagation){a.stopPropagation()}else{window.event.cancelBubble=true}if(a&&a.preventDefault){a.preventDefault()}return false}});