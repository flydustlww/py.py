/* global oojs */
/**
* @file tuwen_wap_glb_video
* @author qianxiaoli
*/
/* eslint-disable max-len */
oojs.define({
    name: '50024',
    namespace: '',
    deps: {
        basic: 'TemplateServer.Template.basic'
    },
    $layout: function () {},
    //  是否缓存Layout的结果
    isNeedLayoutCache: false,
    //  是否需要数据引擎渲染数据
    isNeedRenderData: false,
    defaultValue: {
        containerPaddingLeft: 0,
        containerPaddingRight: 0,
        containerPaddingTop: 0,
        containerPaddingBottom: 0,
        cbackground: 'fff',
        adIconIsShow: 0,
        logoIsShow: 0
    },
    //  秋实Sdk所需信息
    adsExtention: function (requestInfo) {
        var adsExtention = [];
        if (requestInfo.adElements && requestInfo.adElements.length) {
            for (var i = 0, count = requestInfo.adElements.length; i < count; i++) {
                var ad = requestInfo.adElements[i];
                var extention = ad.sdkInteractionInfo && JSON.parse(ad.sdkInteractionInfo);
                adsExtention.push(extention || '');
            }
        }
        return JSON.stringify(adsExtention);
    },
    // 布局, 生成布局对象
    render: function (requestInfo) {
        var userConfig = requestInfo.styleConfig.userConfig;
        var fullConfig = requestInfo.styleConfig.fullConfig;
        var ads = requestInfo.adElements;
        var ad = ads[0];
        var engine = this.basic;

        // container
        var container = engine.getLayout(fullConfig);
        container.class = 'container';
        container.id = 'container';
        // items
        var items = container.childNodes;

        /*var item = engine.getLayout(fullConfig);
        item.class = 'item';
        items.push(item);*/


        // 获取链接的下载类型
        var i = 0;
        var act = parseInt(ad.action[0].actionType, 10) || 4;

        // 广告点击区域——item可点
        var a = engine.getLayout(fullConfig);
        a.tagName = 'a';
        a.target = '_blank';
        a.id = 'item_' + i;
        // 广告索引，必须加
        a['data-adindex'] = i;
        // 广告推广类型
        a['data-adtype'] = act;

        var ext = JSON.parse(ad.wapAppInfo);
        var tu = (ext && ext.tu) ? ext.tu : 0;
        a['data-tu'] = tu;

        var divA = engine.getLayout(fullConfig);
        divA.tagName = 'div';
        divA.id = 'divA_' + i;
        divA.class = 'divA';

        // 添加标签
        // var divTag = engine.getLayout(fullConfig);
        // divTag.tagName = 'div';
        // divTag.id = 'divTag_' + i;
        // divTag.class = 'divTag';

        // tuwen_icon
        var divImg = engine.getLayout(fullConfig);
        divImg.tagName = 'div';
        divImg.id = 'divImg_' + i;
        divImg.class = 'divImg';

        var divImgCon = engine.getLayout(fullConfig);
        divImgCon.tagName = 'div';
        divImgCon.id = 'divImgCon_' + i;
        divImgCon.class = 'divImgCon';

        var tuwenLogo = engine.getLayout(fullConfig);
        tuwenLogo.tagName = 'img';
        tuwenLogo.id = 'tuwen_logo_img_' + i;
        tuwenLogo.class = 'tuwen_logo';

        // divRight
        var divRight = engine.getLayout(fullConfig);
        divRight.tagName = 'div';
        divRight.id = 'divRight_' + i;
        divRight.class = 'divRight';

        // 广告desc
        var divDesc = engine.getLayout(fullConfig);
        divDesc.tagName = 'div';
        divDesc.id = 'desc_' + i;
        divDesc.class = 'divDesc';

        // 广告Icon
        var divAdIcon = engine.getLayout(fullConfig);
        divAdIcon.tagName = 'div';
        divAdIcon.id = 'divAdIcon_' + i;
        divAdIcon.class = 'divAdIcon';

        // 填充广告数据
        divRight.childNodes.push(divDesc);
        divRight.childNodes.push(divAdIcon);
        // divA.childNodes.push(divTag);
        divImgCon.childNodes.push(tuwenLogo);
        divImg.childNodes.push(divImgCon);
        divA.childNodes.push(divImg);
        divA.childNodes.push(divRight);
        items.push(a);
        items.push(divA);
        // 填充图片链接
        tuwenLogo.src = ad.iconFileSrc[0];
        a.title = ad.action[0] && ad.action[0].forward && ad.action[0].forward.title || '';
        a.href = ad.action[0] && ad.action[0].clickLink && ad.action[0].clickLink.clickLink;
        // 文本数据
        // div.innerHTML = ads[i].title;
        // divTag.innerHTML = '智能推荐';
        divAdIcon.innerHTML = '广告';
        divDesc.innerHTML = ad.textDesc1[0] + ad.textDesc2[0];


        // 添加样式部分
        var style = {};

        var containerStyle = engine.getContainerStyle(fullConfig);
        var containerWidth = containerStyle.width - 28; // 14*2
        var containerHeight = containerStyle.height - 32;// 2* 16
        var cbackground = userConfig.containerBackgroundColor || 'fff';

        var adImgW = containerWidth / 3;
        var adImgH = containerHeight;// 14 * 2

        if (containerHeight * 1.5 / adImgW < 2) {
            adImgW = adImgH * 1.5;
        }

        var tagFS = 16;// containerHeight / 8 * 1.125;
        var desFS = 18;// tagFS * 1.06;
        var divAMTB = 14;// (adImgH - tagFS) / 3 - 2;
        var divAMLR = 16; // tagFS * 1.06;
        var divAH = containerHeight;
        var divAW = containerWidth;

        var divRightW = containerWidth - adImgW - 16;
        var divRightH = containerHeight; // - tagFS;
        var adIconMT = 14;
        var iconFS = 13;
        var descH = divRightH - adIconMT - iconFS;
        var desLH = descH / 2;
        if (containerStyle.width < 360) {
            iconFS = iconFS  * 0.9;
            desFS *= 0.9;
            descH = descH * 0.9;
            desLH = descH * 0.9;
            adIconMT *= 0.9;
        }

        // 按比例计算图片的尺寸
        var tuwenLogoHeight = adImgW / 3 * 2;
        var tuwenLogoWidth = adImgW;
        if (ad.width === 90 && ad.height === 90) {
            tuwenLogoHeight = 90;
            tuwenLogoWidth = 90;
            if (tuwenLogoHeight > adImgW / 3 * 2) {
                tuwenLogoHeight = adImgW / 3 * 2;
                tuwenLogoWidth = tuwenLogoHeight;
            }
        }

        style['#container.container'] = {
            position: 'relative',
            width: containerWidth + 'px',
            height: containerHeight + 'px',
            background: cbackground,
            padding: divAMTB + 'px ' + divAMLR + 'px'
        };
        style['.container'] = containerStyle;
        style['#item_' + i] = {
            'position': 'absolute',
            'width': containerStyle.width + 'px',
            'height': containerStyle.height + 'px',
            'top': 0,
            'left': 0
        };

        style['.divA'] = {
            // 'margin': divAMTB + 'px ' + divAMLR + 'px',
            'overflow': 'hidden',
            'height': divAH + 'px',
            'width': divAW + 'px',
            'font-family': '微软雅黑'
        };
        style['.divTag'] = {
            'font-size': tagFS + 'px',
            'line-height': tagFS + 'px',
            'margin-bottom': divAMTB + 'px',
            'color': '#999'
        };
        style['.divImg'] = {
            'width': adImgW + 'px',
            'height': adImgH + 'px',
            'float': 'left',
            'text-align': 'center',
            'vertical-align': 'middle'
        };
        var imgMT = (adImgH - adImgW / 3 * 2) / 2 + 'px';
        style['.divImgCon'] = {
            'width': adImgW + 'px',
            'height': adImgW / 3 * 2 + 'px',
            // 'margin-top': imgMT,
            'background-color': '#f7f7f7',
            'text-align': 'center',
            'vertical-align': 'middle'
        };
        style['.tuwen_logo'] = {
            'width': tuwenLogoWidth + 'px',
            'height': tuwenLogoHeight + 'px',
            'margin-top': (adImgW / 3 * 2 - tuwenLogoHeight) / 2 + 'px'
        };
        style['.divRight'] = {
            'width': divRightW + 'px',
            'height': divRightH + 'px',
            'margin-left': divAMTB + 'px',
            'float': 'left'
        };
        style['.divDesc'] = {
            // 'margin-top': imgMT,
            'font-size': desFS + 'px',
            'color': '#333',
            'height': descH + 'px',
            'overflow': 'hidden',
            'line-height': desLH + 'px'
        };
        style['.divAdIcon'] = {
            'font-size': iconFS + 'px',
            'line-height': iconFS + 'px',
            'margin-top': adIconMT + 'px', // 36/3-(78-54)/2/3
            'color': '#999'
        };

        // 秋实Sdk所需数据
        var qiushiInfo = engine.getLayout(fullConfig);
        qiushiInfo.tagName = 'script';
        qiushiInfo.innerHTML = 'var adsExtention = ' + this.adsExtention(requestInfo) + ';' ;
        items.push(qiushiInfo);

        style['.feedbackCon'] = {
            'display': 'none'
        };
        style['#fbIcon'] = {
            'display': 'none'
        };
        style['.fbTipDiv'] = {
            'display': 'none'
        };

        var result = {
            layoutObj: container,
            style: style
        };
        return result;
    }
});
