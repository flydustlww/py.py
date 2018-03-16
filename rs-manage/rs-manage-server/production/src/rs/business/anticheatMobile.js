/* global oojs */
/**
 * @file 移动端反作弊ck
 * @author liuyanxiao
 **/
oojs.define({
    name: 'anticheatMobile',
    namespace: 'rs.business',
    $anticheatMobile: function () {
        if (window.antiArray && document.getElementById('container')) {
            this.check('container', window.antiArray);
        }
    },
    imTimeSign: 0,
    touchX: 0,
    touchY: 0,
    touchStartTime: 0,
    touchEndTime: 0,
    pressTime: 0,
    templateHeight: 0,
    templateWidth: 0,
    touchMoveNum: 0,
    touchMoveTotalTime: 0,
    containerDom: null,
    onTouchStart: function (event) {
        this.touchStartTime = this.getEventTime(event);
        this.touchMoveNum++;
    },
    getEventTime: function (e) {
        return e.timeStamp !== 0 ? parseInt(e.timeStamp, 10) : (new Date).getTime();
    },
    /*移动端click 事件触发响应时间的优化
    * 创建tap事件
    * 参考 fastclick 解决方案，提升提点响应
    */
    createEvent: function (node) {
        var ev = document.createEvent('HTMLEvents');
        ev.initEvent('click', false, false);
        ev.eventType = 'fastclick';
        node.onclick = function () {
            node.dispatchEvent(ev);
        };
    },
    getCheckCode: function (url) {
        var urlSearch;
        var checkCode = 0;
        urlSearch = /\.php\?(url=)?([0-9a-zA-Z_-]*)\./.exec(url);
        if (urlSearch) {
            var num = (((this.pressTime * this.imTimeSign) % 99) + 9);
            var iDomainLen = urlSearch[2].length;
            for (var x = 0; x < num; ++x) {
                checkCode += urlSearch[2].charCodeAt((this.touchX * x) % iDomainLen);
            }
            return checkCode;
        }
        return false;
    },
    getCkValue: function (url) {
        if (typeof url !== 'string') {
            return false;
        }
        var checkCode = this.getCheckCode(url);
        if (checkCode !== false) {
            var ckValue = [
                checkCode,
                this.pressTime,
                this.touchX,
                this.touchY,
                this.templateWidth,
                this.templateHeight,
                this.touchMoveNum,
                this.touchMoveTotalTime
            ].join('.');
            return ckValue;
        }
        else {
            return false;
        }
    },
    addCkOnUrl: function (url) {
        var ckValue = this.getCkValue(url);
        var ckReg = /&ck=[\w.]*/;
        if (ckValue === false) {
            return url;
        }
        if (url.indexOf('&ck=') === -1) {
            url += '&ck=' + ckValue;
        }
        else {
            url = url.replace(ckReg, '&ck=' + ckValue);
        }
        return url;
    },
    touchClickHandler: function (e) {
        var sourceElement = e.target;
        if (sourceElement.tagName.toLowerCase() !== 'a') {
            sourceElement = this.resTag(sourceElement);
        }
        if (sourceElement === null) {
            return false;
        }
        this.touchEndTime = this.getEventTime(e);
        this.pressTime = this.touchEndTime - this.touchStartTime;
        this.touchMoveTotalTime += this.pressTime;
        var currentTarget = this.getClickArea(sourceElement, e);
        this.templateWidth = this.containerDom.offsetWidth;
        this.templateHeight = this.containerDom.offsetHeight;
        this.touchX = currentTarget.x;
        this.touchY = currentTarget.y;
        var domIdMatch = /.*(\d+)/.exec(sourceElement.id);
        var domNum = domIdMatch[1];
        this.imTimeSign = this.antiCheatArray[domNum];
        sourceElement.href = this.addCkOnUrl(sourceElement.href);
    },
    getClickArea: function (a, b) {
        var result = {
            x: 0,
            y: 0
        };
        if (!a || !b) {
            return result;
        }
        var e = 0;
        var d = 0;
        if (a.getBoundingClientRect) {
            d = document.body;
            if (document.documentElement && document.documentElement.scrollTop) {
                d = document.documentElement;
            }
            e = a.getBoundingClientRect().left + d.scrollLeft;
            d = a.getBoundingClientRect().top + d.scrollTop;
        } else {
            e = a.offsetLeft;
            d = a.offsetTop;
            for (var f = a.offsetParent; f;) {
                e += f.offsetLeft;
                d += f.offsetTop;
                f = f.offsetParent;
            }
            for (; a && a !== document.body;) {
                if (a.tagName !== 'TR' && document.defaultView.getComputedStyle(a).display !== 'inline') {
                    e -= a.scrollLeft;
                    d -= a.scrollTop;
                }
                a = a.parentNode;
            }
        }
        result.x = parseInt(b.pageX - e, 10);
        result.y = parseInt(b.pageY - d, 10);
        return result;
    },
    resTag: function (element) {
        var element = element.parentNode;
        if (element.tagName.toLowerCase() !== 'a'
            && element.tagName.toLowerCase() !== 'body') {
            return this.resTag(element);
        }
        return element;
    },
    bind: function (element, eventType, handler) {
        if (window.addEventListener) {
            element.addEventListener(eventType, handler, false);
        }
        else {
            element.attachEvent('on' + eventType, handler);
        }
    },
    formatEventObj: function (e) {
        e = e || window.event;
        e.target = e.target || e.srcElement;
        return e;
    },
    check: function (containerId, antiCheatArray) {
        this.antiCheatArray = antiCheatArray || window.antiCheatArray;
        var container = this.containerDom = document.getElementById(containerId);
        var linkArray = container.getElementsByTagName('a');
        this.bind(container, 'touchstart', this.onTouchStart.proxy(this));
        for (var i = 0; i < linkArray.length; i++) {
            var tempClassName = linkArray[i].className;
            if (tempClassName) {
                tempClassName = tempClassName.toLowerCase();
                if (tempClassName === 'gylogo'
                || tempClassName === 'bdlogo'
                || tempClassName.substring(0, 7) === 'bd-logo') {
                    continue;
                }
            }
            this.bind(linkArray[i], 'click', this.touchClickHandler.proxy(this));
        }
    }

});

/* eslint-enable fecs-max-statements */