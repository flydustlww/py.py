oojs.define({name:"page",namespace:"",deps:{},sdk:{},adsExtention:[],$page:function(){try{this.sdk=(window.baidu&&window.baidu.mobads&&window.baidu.mobads.Sdk)||(parent&&parent.baidu&&parent.baidu.mobads&&parent.baidu.mobads.Sdk);if(window.adsExtention&&document.getElementById("container")){this.adClick("container",window.adsExtention)}}catch(a){}},adClick:function(b,e){this.adsExtention=e||window.adsExtention;b=b||"container";var a=document.getElementById(b);var f=a.getElementsByTagName("a");for(var c=0;c<f.length;c++){var d=f[c].className;if(d){d=d.toLowerCase();if(d==="gylogo"||d==="bdlogo"||d.substring(0,7)==="bd-logo"){continue}}this.bind(f[c],"click",this.onAdClick.proxy(this))}},onAdClick:function(c){var d=this.formatEventObj(c);var a=d.target;while(a.tagName.toLowerCase()!=="a"&&a.tagName.toLowerCase()!=="body"){a=a.parentNode}var f=this.getAttr(a,"data-adindex");f=parseInt(f,10);var b=this.adsExtention[f];b.curl=a.href||b.curl;this.sdk.handleClick(b);return this.stopEvent(c)},bind:function(a,c,b){if(a.addEventListener){a.addEventListener(c,b,false)}else{a.attachEvent("on"+c,b)}},getAttr:function(b,a){if(b&&b.getAttribute){return b.getAttribute(a)}else{return b[a]}},formatEventObj:function(a){a=a||window.event;a.target=a.target||a.srcElement;return a},stopEvent:function(a){if(a&&a.stopPropagation){a.stopPropagation()}else{window.event.cancelBubble=true}if(a&&a.preventDefault){a.preventDefault()}return false}});