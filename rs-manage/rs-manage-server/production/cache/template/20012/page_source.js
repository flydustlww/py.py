/* global oojs */
/* global actionTypeInfo */
/**
 * @file 20012
 * @author
 */
/* eslint-disable max-len */
oojs.define({
    name: 'page',
    namespace: '20012',
    deps: {},
    //  Sdk js 接口
    sdk: {},
    // 轮播暂停 接口
    mobInterface: {},
    // 定时器字段
    downloadingIntervel: null,
    //  广告扩展字段
    adsExtention: [],
    $page: function () {
        try {
            this.paint();
            if (window.adsExtention && document.getElementById('container')) {
                this.adClick('container', window.adsExtention);
            }
        } catch (err) {}
    },
    // 绑定广告点击
    adClick: function (containerId, adsExtention) {
        this.adsExtention = adsExtention || window.adsExtention;
        containerId = containerId || 'container';
        var container = document.getElementById(containerId);
        var linkArray = container.getElementsByTagName('a');
        for (var i = 0; i < linkArray.length; i++) {
            var tempClassName = linkArray[i].className;
            if (tempClassName) {
                tempClassName = tempClassName.toLowerCase();
                if (tempClassName === 'gylogo' || tempClassName === 'bdlogo'
                    || tempClassName.substring(0, 7) === 'bd-logo') {
                    continue;
                }
            }
            this.bind(linkArray[i], 'click', this.onAdClick.proxy(this));
        }
    },
    // 广告被点击
    onAdClick: function (event) {
        var e = this.formatEventObj(event);
        var sourceElement = e.target;
        while (sourceElement.tagName.toLowerCase() !== 'a'
            && sourceElement.tagName.toLowerCase() !== 'body') {
            sourceElement = sourceElement.parentNode;
        }
        var adIndex = this.getAttr(sourceElement, 'data-adtype');
        var m = navigator.userAgent.toLowerCase();
        adIndex = parseInt(adIndex, 10);
        if (adIndex === 5 && m.indexOf('safari') > -1 && m.indexOf('version') > -1
            && (m.indexOf('iphone') > -1 || m.indexOf('ipad') > -1 || m.indexOf('itouch') > -1)) {
            window.top.location = sourceElement.href;
        }
    },
    bind: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else {
            element.attachEvent('on' + type, handler);
        }
    },
    getAttr: function (element, key) {
        if (element && element.getAttribute) {
            return element.getAttribute(key);
        }
        else {
            return element[key];
        }
    },
    formatEventObj: function (e) {
        e = e || window.event;
        e.target = e.target || e.srcElement;
        return e;
    },
    // 阻止默认行为
    stopEvent: function (event) {
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        else {
            window.event.cancelBubble = true;
        }
        if (event && event.preventDefault) {
            event.preventDefault();
        }
        return false;
    },
    paint: function () {
        this.sendPostmsg();
    },
    sendPostmsg: function () {
        var item = document.getElementById('item0');
        var jsonTitle = this.getAttr(item, 'data-title');
        var jsonCurl = this.getAttr(item, 'data-href');

        var jsonScale = parseInt(window.innerWidth, 10) / parseInt(window.innerHeight, 10);
        var msgData = {
            dspid: 6,
            title: jsonTitle,
            curl: jsonCurl,
            scale: jsonScale
        };
        var sjsonData = JSON.stringify(msgData);
        window.parent.postMessage(sjsonData, '*');
    }
});