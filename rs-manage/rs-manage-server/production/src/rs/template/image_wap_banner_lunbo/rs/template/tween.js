oojs.define({
  name: 'tween',
  namespace: 'rs.template',
  deps: {
    tweens: 'rs.template.tweens'
  },
  tweenMove:function (obj,oTarget,iTime,iType,fnEnd,fnDuring) {
    var tween = this.tweens
    var me = this;
    var fn=tween[iType];
    var t=0;
    var b={};
    var c={};
    var d=iTime/24;
    var sAttr="";
    clearInterval(obj.timer);
    for(sAttr in oTarget)
    {
      b[sAttr]=me.css(obj,sAttr);
      c[sAttr]=oTarget[sAttr]-b[sAttr];
    }
    if(iTime<30)
    {
      for(sAttr in oTarget)
      {
        me.css(obj,sAttr,oTarget[sAttr]);
      }
    }
    else
    {
      obj.timer=setInterval(
        function()
        {
          if(t<d)
          {
            t++;
            for(sAttr in oTarget)
            {
              me.css(obj,sAttr,fn(t,b[sAttr],c[sAttr],d));
            }
          }
          else
          {
            for(sAttr in oTarget)
            {
              me.css(obj,sAttr,oTarget[sAttr]);
            }
            clearInterval(obj.timer);
            if(fnEnd)
            {
              fnEnd.call(obj);
            }
          }
          if(fnDuring)
          {
            fnDuring.call(obj);
          }
        },24);
    }
  },
  css: function(obj, attr, value) {
    var me = this;
    if(arguments.length==2){
      if(attr=='scale'|| attr=='rotate'|| attr=='rotateX'||attr=='rotateY'||attr=='scaleX'||attr=='scaleY'||attr=='translateY'||attr=='translateX')
      {
        if(! obj.$Transform)
        {
          obj.$Transform={};
        }
        switch(attr)
        {
          case 'scale':
          case 'scaleX':
          case 'scaleY':
            return typeof(obj.$Transform[attr])=='number'?obj.$Transform[attr]:100;
            break;
          default:
            return obj.$Transform[attr]?obj.$Transform[attr]:0;
        }
      }
      var sCur=obj.currentStyle?obj.currentStyle[attr]:document.defaultView.getComputedStyle(obj, false)[attr];
      if(attr=='opacity'){
        return Math.round((parseFloat(sCur)*100));
      }
      else{
        return parseInt(sCur);
      }
    }
    else if(arguments.length==3)
    {
      switch(attr){
        case 'scale':
        case 'scaleX':
        case 'scaleY':
        case 'rotate':
        case 'rotateX':
        case 'rotateY':
        case 'translateZ':
        case 'translateX':
        case 'translateY':
          me.setCss3(obj, attr, value);
          break;
        case 'width':
        case 'height':
        case 'paddingLeft':
        case 'paddingTop':
        case 'paddingRight':
        case 'paddingBottom':
          value=Math.max(value,0);
        case 'left':
        case 'top':
        case 'marginLeft':
        case 'marginTop':
        case 'marginRight':
        case 'marginBottom':
          if(typeof value=="string")
          {
            obj.style[attr]=value;
          }
          else
          {
            obj.style[attr]=value+'px';
          }
          break;
        case 'opacity':
          obj.style.filter="alpha(opacity:"+value+")";
          obj.style.opacity=value/100;
          break;
        default:
          obj.style[attr]=value;
      }
    }
    return function (attr_in, value_in){me.css(obj, attr_in, value_in)};
  },
  setCss3: function(obj, attr, value) {
    var me = this;
    var sTr="";
    var sVal="";
    var arr=["Webkit","Moz","O","ms",""];
    if(! obj["$Transform"])
    {
      obj["$Transform"]={};
    }
    obj["$Transform"][attr]=parseInt(value);
    for( sTr in obj["$Transform"])
    {
      switch(sTr)
      {
        case 'scale':
        case 'scaleX':
        case 'scaleY':
          sVal+=sTr+"("+(obj["$Transform"][sTr]/100)+") ";
          break;
        case 'rotate':
        case 'rotateX':
        case 'rotateY':
          sVal+=sTr+"("+(obj["$Transform"][sTr])+"deg) ";
          break;
        case 'translateX':
        case 'translateY':
        case 'translateZ':
          sVal+=sTr+"("+(obj["$Transform"][sTr])+"px) ";
          break;
      }
    }
    for(var i=0;i<arr.length;i++)
    {
      obj.style[arr[i]+"Transform"]=sVal;
    }
  }
})
