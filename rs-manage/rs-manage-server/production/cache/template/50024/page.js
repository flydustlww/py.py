oojs.define({name:"page",namespace:"",deps:{},sdk:{},adsExtention:[],$page:function(){try{if(document.getElementById("container")){this.adClick("container")}var a=navigator.userAgent;var i=document.getElementById("item_0");var b=i.href||"";if(/(iPhone|iPod|iPad)/.test(a)&&/baiduboxapp\//i.test(a)){b="baiduboxapp://easybrowse?opentype=1&isla=0&openurl="+encodeURIComponent(b)+"&newbrowser=1";i.href=b}var d=this.getAttr(i,"data-tu");if(!d&&!!location.href){var h=location.href.split("&di=");if(h.length>1){var g=h[1].split("&");if(g.length>1){d=g[0]}}}if(!d){return}var j={msgName:"cpro_displayAd",msg:{tu:d,dspid:6,dsiplayAd:1}};var c='{"msgName":"cpro_displayAd","msg":{"tu":"'+d+'","dspid":6,"displayAd":1}}';if(!!window.postMessage){parent.postMessage(c,"*")}this.registerMessage()}catch(f){}},registerMessage:function(){if(window.postMessage){var a=this;window.addEventListener("message",function(c){var b=c.data;if(window.JSON&&JSON.parse){b=JSON.parse(b);if(b.msgName&&b.msgName==="cpro_ajustFont"&&b.msg&&b.msg.fontSize){var f=b.msg.fontSize;if(typeof(b.msg.fontSize)!=="number"){f=parseInt(f,10)}var d=document.getElementById("desc_0");f=f/3;if(d){d.style.fontSize=f+"px"}}}},false)}},adClick:function(b){b=b||"container";var a=document.getElementById(b);var e=a.getElementsByTagName("a");for(var c=0;c<e.length;c++){var d=e[c].className;if(d){d=d.toLowerCase();if(d==="gylogo"||d==="bdlogo"||d.substring(0,7)==="bd-logo"){continue}}this.bind(e[c],"click",this.onAdClick.proxy(this))}},onAdClick:function(d){var f=this.formatEventObj(d);var b=f.target;while(b.tagName.toLowerCase()!=="a"&&b.tagName.toLowerCase()!=="body"){b=b.parentNode}var c=this.getAttr(b,"data-adtype");var a=navigator.userAgent.toLowerCase();c=parseInt(c,10);if(c===5&&a.indexOf("safari")>-1&&a.indexOf("version")>-1&&(a.indexOf("iphone")>-1||a.indexOf("ipad")>-1||a.indexOf("itouch")>-1)){window.top.location=b.href;this.stopEvent(d)}},bind:function(a,c,b){if(a.addEventListener){a.addEventListener(c,b,false)}else{a.attachEvent("on"+c,b)}},getAttr:function(b,a){if(b&&b.getAttribute){return b.getAttribute(a)}else{return b[a]}},formatEventObj:function(a){a=a||window.event;a.target=a.target||a.srcElement;return a},stopEvent:function(a){if(a&&a.stopPropagation){a.stopPropagation()}else{window.event.cancelBubble=true}if(a&&a.preventDefault){a.preventDefault()}return false}});