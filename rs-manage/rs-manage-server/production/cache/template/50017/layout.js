/* global oojs */
/**
* @file tuwen_wap_mdsp_win-50017
* @author nieyuxin
*/
/* eslint-disable max-len */
oojs.define({
    name: '50017',
    namespace: '',
    deps: {
        basic: 'TemplateServer.Template.basic',
        bannerImgUrl: 'TemplateServer.Common.Model.bannerImgUrl'
    },
    $layout: function () {},
    //  是否缓存Layout的结果
    isNeedLayoutCache: false,
    //  是否需要数据引擎渲染数据
    isNeedRenderData: false,
    defaultValue: {
        logoType: 'bd-logo4',
        containerPaddingLeft: 0,
        containerPaddingRight: 0,
        containerPaddingTop: 0,
        containerPaddingBottom: 0,
        cbackground: 'fff'
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

        var engine = this.basic;

        // container
        var container = engine.getLayout(fullConfig);
        container.class = 'container';
        container.id = 'container';
        // items
        var items = container.childNodes;

        var item = engine.getLayout(fullConfig);
        item.class = 'item';
        items.push(item);

        for (var i = 0, len = ads.length; i < len; i++) {
            // 获取链接的下载类型
            var ad = ads[i];
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

             // tuwen_icon
            var divA = engine.getLayout(fullConfig);
            divA.tagName = 'div';
            divA.id = 'divA_' + i;
            divA.class = 'divA';

            // tuwen_icon
            var tuwenLogo = engine.getLayout(fullConfig);
            tuwenLogo.tagName = 'img';
            tuwenLogo.id = 'tuwen_logo_img_' + i;
            tuwenLogo.class = 'tuwen-logo';

            // content
            var content = engine.getLayout(fullConfig);
            content.tagName = 'div';
            content.id = 'content_' + i;
            content.class = 'content';

            // title
            var title = engine.getLayout(fullConfig);
            title.tagName = 'div';
            title.id = 'title_' + i;
            title.class = 'title';

            // title内容
            var titleText = engine.getLayout(fullConfig);
            titleText.tagName = 'span';
            titleText.id = 'tspan_' + i;
            titleText.class = 'tspan';

            // 广告desc
            var desc = engine.getLayout(fullConfig);
            desc.tagName = 'div';
            desc.id = 'desc_' + i;
            desc.class = 'desc';
            // desc内容
            var descText = engine.getLayout(fullConfig);
            descText.tagName = 'span';
            descText.id = 'dspan_' + i;
            descText.class = 'dspan';

            // 填充广告数据
            title.childNodes.push(titleText);
            desc.childNodes.push(descText);
            content.childNodes.push(title);
            content.childNodes.push(desc);
            divA.childNodes.push(tuwenLogo);
            divA.childNodes.push(content);
            item.childNodes.push(a);
            item.childNodes.push(divA);
            // 填充图片链接
            tuwenLogo.src = ad.imgFileSrc[0];
            a.title = ad.action[0] && ad.action[0].forword && ad.action[0].forword.title || '';
            a.href = ad.action[0] && ad.action[0].clickLink && ad.action[0].clickLink.clickLink;
            // 文本数据
            titleText.innerHTML = ad.textTitle[0];
            descText.innerHTML = ad.textDesc1[0] + ad.textDesc2[0];
        }

        // 添加样式部分
        var style = {};
        for (var i = 0, len = ads.length; i < len; i++) {
            var ad = ads[i];
            var containerStyle = engine.getContainerStyle(fullConfig);
            var containerWidth = containerStyle.width;
            var containerHeight = containerStyle.height;
            var cbackground = userConfig.containerBackgroundColor || '#fff';
            // 图片的位置及图片距离内容的边距尺寸
            var tuwenLogoPL = userConfig.itemRightImagePaddingLeft || 5;
            var positionLR = 'left';
            var tuwenLogoPaddingRight = '';
            var tuwenLogoPaddingLeft = '';
            if (userConfig.itemRightImage) {
                positionLR = JSON.parse(userConfig.itemRightImage, 10) ? 'right' : 'left';
                tuwenLogoPaddingRight = JSON.parse(userConfig.itemRightImage, 10) ? 0 : tuwenLogoPL;
                tuwenLogoPaddingLeft = JSON.parse(userConfig.itemRightImage, 10) ? tuwenLogoPL : 0;
            } else {
                tuwenLogoPaddingRight = tuwenLogoPL;
                tuwenLogoPaddingLeft = 0;
            }

            var adLen = ads.length;
            // 按照图片的原尺寸
            var tuwenLogoheight = ad.imgHeight[0];
            var tuwenLogoWidth = ad.imgWidth[0];
            // 按比例计算图片的尺寸
            if (ad.imgHeight[0] > containerHeight / adLen) {
                tuwenLogoheight = containerHeight / adLen;
                tuwenLogoWidth = tuwenLogoheight * ad.imgWidth[0] / ad.imgHeight[0];
                if (tuwenLogoWidth > containerWidth / 3) {
                    tuwenLogoWidth = containerWidth / 3;
                    tuwenLogoheight = tuwenLogoWidth * ad.imgHeight[0] / ad.imgWidth[0];
                }
            } else {
                tuwenLogoheight = ad.imgHeight[0];
                tuwenLogoWidth = tuwenLogoheight * ad.imgWidth[0] / ad.imgHeight[0];
                if (tuwenLogoWidth > containerWidth / 3) {
                    tuwenLogoWidth = containerWidth / 3;
                    tuwenLogoheight = tuwenLogoWidth * ad.imgHeight[0] / ad.imgWidth[0];
                }
            }
            // 图片的高度小于广告位的高度时，让图片居中显示
            var tuwenLogoMarginTop = (tuwenLogoheight < containerHeight / adLen) ? (containerHeight / adLen - tuwenLogoheight) / 2 : 0;

            // 内容的宽高
            var contentWidth = containerWidth - tuwenLogoWidth - tuwenLogoPaddingLeft - tuwenLogoPaddingRight;
            var contentHeight = tuwenLogoheight;

            var pt = tuwenLogoheight / 48;
            style['#container.container'] = {
                position: 'relative',
                width: containerWidth + 'px',
                height: containerHeight + 'px',
                background: cbackground
            };
            style['.container'] = containerStyle;

            style['.item'] = {
                'width': '100%',
                'height': '100%',
                'position': 'relative'
            };
            style['#item_' + i] = {
                'width': '100%',
                'height': containerHeight / adLen + 'px',
                'display': 'block',
                'overflow': 'hidden',
                'text-decoration': 'none',
                'position': 'absolute',
                'top': containerHeight / adLen * i + 'px',
                'left': '0'
            };
            style['.item .divA'] = {
                'width': '100%',
                'height': containerHeight / adLen + 'px',
                'display': 'block',
                'overflow': 'hidden',
                'text-decoration': 'none'
            };

            style['.item div'] = {
                overflow: 'hidden'
            };
            style['#tuwen_logo_img_' + i] = {
                'width': tuwenLogoWidth + 'px',
                'height': tuwenLogoheight + 'px',
                'padding-right': tuwenLogoPaddingRight + 'px',
                'padding-left': tuwenLogoPaddingLeft + 'px',
                'margin': tuwenLogoMarginTop + 'px 0px',
                'float': positionLR
            };
            style['#content_' + i] = {
                'width': contentWidth + 'px',
                'height': contentHeight + 'px',
                'margin': tuwenLogoMarginTop + 'px 0px',
                'float': positionLR
            };
            // 文本折行
            var textWidth = contentWidth;
            style['.item span'] = {
                'word-wrap': 'break-word'
            };
            // title
            var titleHeight = Math.round(26 * pt);
            style['#title_' + i] = {
                'width': textWidth + 'px',
                'height': titleHeight  + 'px',
                'line-height': titleHeight  + 'px'

            };
            var titleFontSize = userConfig.titleFontSize || Math.round(14 * pt);
            var fontName = userConfig.titleFontFamily || 'SimSun,arial,sans-serif;';
            var titleFontColor = userConfig.titleFontColor || '000';
            var titleFontWeight = (userConfig.titleFontWeight && JSON.parse(userConfig.titleFontWeight) === 1) ? 'bold' : 'normal';
            style['#tspan_' + i] = {
                'font': 'normal ' + titleFontWeight + ' ' + titleFontSize + 'px/' + titleHeight + 'px ' + fontName,
                'color': '#' + titleFontColor,
                'width': '100%',
                'height': '100%',
                'display': 'block',
                'white-space': 'nowrap',
                'overflow': 'hidden',
                'text-overflow': 'ellipsis'
            };

            // desc
            var descHeight = Math.round(20 * pt);
            style['#desc_' + i] = {
                'width': textWidth  + 'px',
                'height': descHeight  + 'px',
                'line-height': descHeight  + 'px'
            };
            var fontSize = userConfig.descFontSize || Math.round(14 * pt);
            var descFontFamily = userConfig.descFontFamily || 'SimSun,arial,sans-serif;';
            var descFontColor = userConfig.descFontColor || '000';
            style['#dspan_' + i] = {
                'font': 'normal ' + fontSize + 'px/' + descHeight + 'px ' + descFontFamily,
                'color': '#' + descFontColor,
                'width': '100%',
                'height': '100%',
                'display': 'block',
                'white-space': 'nowrap',
                'overflow': 'hidden',
                'text-overflow': 'ellipsis'
            };
        }

        // 秋实Sdk所需数据
        var qiushiInfo = engine.getLayout(fullConfig);
        qiushiInfo.tagName = 'script';
        qiushiInfo.innerHTML = 'var adsExtention = ' + this.adsExtention(requestInfo) + ';';
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
