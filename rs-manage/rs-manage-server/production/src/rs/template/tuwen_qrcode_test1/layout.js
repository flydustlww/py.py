/**
 * @file tuwen_qrcode template layout
 * @author qianxiaoli
 */

/* global oojs */

/* eslint-disable max-len */
oojs.define({
    name: 'layout',
    namespace: 'rs.template.tuwen_qrcode_test1',
    deps: {
        basic: 'rs.template.basic',
        string: 'rs.common.utility.string',
        logo: 'rs.business.logo',
        http: 'http',
        adIcon: 'rs.business.adIcon'
    },
    $layout: function () {},
    isNeedLayoutCache: false, // 是否缓存Layout的结果
    isNeedRenderData: false, // 是否需要数据引擎渲染数据

    defaultValue: {
        containerBorderTop: 0,
        containerBorderRight: 0,
        containerBorderBottom: 0,
        containerBorderLeft: 0,
        containerPaddingTop: 0,
        containerPaddingRight: 0,
        containerPaddingBottom: 0,
        containerPaddingLeft: 0
    },
    adsExtention: function (context) {
        var adsExtention = [];
        if (context.requestInfo.adElements && context.requestInfo.adElements.length) {
            for (var i = 0, count = context.requestInfo.adElements.length; i < count; i++) {
                var ad = context.requestInfo.adElements[i];
                var extention = JSON.parse(ad.extention);
                extention.curl = extention.curl || ad.clickUrl;
                adsExtention.push(extention || '');
            }
        }

        return JSON.stringify(adsExtention);
    },
    selectDownloadAd: function (ads) {
        var downloadAvailableAds = [];
        // 先筛选出下载类广告
        ads.forEach(function (ad, index) {
            if (ad.actionType === 2) {
                downloadAvailableAds.push(index);
            }

        });

        // 再从下载类广告中随机选择一个下载类广告
        var indexWithinIndexs = Math.round(Math.random() * (downloadAvailableAds.length - 1));
        return downloadAvailableAds[indexWithinIndexs];
    },
    // 布局, 生成布局对象
    render: function (context) {
        var userConfig = context.userConfig;
        var fullConfig = context.fullConfig;
        var ads = context.requestInfo.adElements;
        var engine = this.basic;
        // container
        var container = engine.getLayout(fullConfig);
        container.class = 'container';
        container.id = 'container';

        var containerStyle = engine.getContainerStyle(fullConfig);
        var clientWidth = containerStyle.width;
        var clientHeight = containerStyle.height;

        var downloadIndex = this.selectDownloadAd(ads);
        console.log('downloadIndex====>', downloadIndex);

        // 前端所需数据
        var fontInfo = engine.getLayout(fullConfig);
        fontInfo.tagName = 'script';
        fontInfo.innerHTML = 'var downloadIndex = ' + downloadIndex
                            + ';var adsExtention = ' + this.adsExtention(context) + ';';
        container.childNodes.push(fontInfo);

        // items
        var items = container.childNodes;

        // UC浏览器什么狗屁浏览器，
        // 用户量那么大，质量和屎一样，bug巨多无比
        // 这个overlay在UC浏览器下无法显示，只有把它提前了才有效果
        // 也不知道为什么
        // test2的模板解决一个bug花了我一天时间
        var overlay = engine.getLayout(fullConfig);
        overlay.class = 'overlay';
        overlay.innerHTML = '<img src="http://cpro.baidustatic.com/cpro/ui/noexpire/img/qrcode/A/no-worry.png">';
        items.push(overlay);

        // 添加样式部分
        var scale = clientWidth / 750;
        var currentRootFontSize = scale * 16;
        var style = {};

        // 微信内打开提示框
        var tipDiv = engine.getLayout(fullConfig);
        tipDiv.class = 'tipDiv';
        tipDiv.id = 'tipDiv';
        tipDiv.innerHTML = '<div class="tipCon">'
                + '<div style="" id="closeBtn">'
                    + '<div style="" id="closeDiv">×</div>'
                + '</div>'
                + '<div class="tip1">跳转一步，才能下载应用！</div>'
                + '<div class="tip2">请点击右上角,选择在</div>'
                + '<div class="tip3">'
                    + '<span style="color:red">浏览器（或Safari）中打开</span>'
                + '</div>'
                + '<div class="tip4">'
                    + '<img class="tipArrow" src="http://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.3/rs_img/arrow.png">'
                + '</div>'
            + '</div>';
        items.push(tipDiv);

        // item1 page1
        var item1 = engine.getLayout(fullConfig);
        item1.class = 'item item1 page1 text-center';
        item1.id = 'item1';
        items.push(item1);

        // page1 top
        var page1Top = engine.getLayout(fullConfig);
        page1Top.class = 'page1-top split-line';
        page1Top.innerHTML = '<div class="page1-top-image"></div>'
            + '<div class="page1-top-text">'
                + '<p class="page1-title">最高奖励10元</p>'
                + '<p class="page1-desc">下载后记得返回答题，才能带走我哦~</p>'
            + '</div>'
            + '<div class="clearfix"></div>';
        item1.childNodes.push(page1Top);

        var ad = ads[downloadIndex];
        var extention = JSON.parse(ad.extention);

        // page1 middle
        var page1Middle = engine.getLayout(fullConfig);
        page1Middle.class = 'page1-middle split-line';
        item1.childNodes.push(page1Middle);

        // page1 middle icon
        var appIcon = engine.getLayout(fullConfig);
        appIcon.class = 'app-icon';
        page1Middle.childNodes.push(appIcon);

        var appIconImage = engine.getLayout(fullConfig);
        appIconImage.tagName = 'img';
        appIconImage.src = ad.stuffSrc;
        appIcon.childNodes.push(appIconImage);

        // page1 middle title
        var appTitle = engine.getLayout(fullConfig);
        appTitle.class = 'app-title';
        page1Middle.childNodes.push(appTitle);

        var appTitleText = engine.getLayout(fullConfig);
        appTitleText.tagName = 'p';
        appTitleText.class = 'page1-title text-center title';
        var appName = extention.appinfo.name
                        || extention.appinfo.appname
                        || extention.appinfo.tit;
        appTitleText.innerHTML = appName.length > 20 ? (appName.substr(0, 20) + '...') : appName;
        appTitle.childNodes.push(appTitleText);

        // page1 middle desc
        var appDesc = engine.getLayout(fullConfig);
        appDesc.class = 'app-desc';
        page1Middle.childNodes.push(appDesc);

        var appDescText = engine.getLayout(fullConfig);
        appDescText.class = 'page1-desc desc';
        appDescText.tagName = 'p';
        appDescText.innerHTML = extention.appinfo.appDesc || extention.appinfo.desc;
        appDesc.childNodes.push(appDescText);

        // page1 bottom
        var page1Bottom = engine.getLayout(fullConfig);
        page1Bottom.class = 'page1-bottom';
        item1.childNodes.push(page1Bottom);
        page1Bottom.innerHTML = '<p class="page1-title text-center">红包领取方式</p>'
                + '<div class="steps-diagram"></div>'
                + '<table width="100%" class="steps-desc">'
                    + '<tbody>'
                        + '<tr>'
                            + '<td class="text-left"><span class="page1-desc">下载APP</span></td>'
                            + '<td class="text-center"><span class="page1-desc ">安装并试用</span></td>'
                            + '<td class="text-center"><span class="page1-desc">返回答题</span></td>'
                            + '<td class="text-right"><span class="page1-desc">领取红包</span></td>'
                        + '</tr>'
                    + '</tbody>'
                + '</table>'
            + '<a id="downBtn0" href="' + ad.clickUrl + '" class="page1-btn-dl" target="_blank">立即下载</a>';

        // var downArr = [];
        // for (var i = 0, len = ads.length; i < len; i++) {
        //     if (ads[i].actionType === 2) {
        //         downArr.push(i);
        //     }

        // }

        // var downIndex = -1;
        // var adIndex = -1;
        // if (downArr.length > 0) {
        //     downIndex = Math.round(Math.random() * (downArr.length - 1));
        //     adIndex = downArr[downIndex];
        //     downArr.splice(downIndex, 1);
        //     for (var i = 0, len = downArr.length; i < len; i++) {
        //         ads.splice(downArr[i], 1, '');
        //     }
        //     for (var i = ads.length - 1, len = -1; i > len; i--) {
        //         if (ads[i] === '') {
        //             ads.splice(i, 1);
        //         }
        //     }
        // }

        // page 2
        var item2 = engine.getLayout(fullConfig);
        item2.class = 'item item2 page2';
        item2.id = 'item2';
        container.childNodes.push(item2);

        var quiz = engine.getLayout(fullConfig);
        quiz.class = 'quiz';
        item2.childNodes.push(quiz);

        var title = engine.getLayout(fullConfig);
        title.class = 'quiz-title';
        quiz.childNodes.push(title);

        var titleP1 = engine.getLayout(fullConfig);
        titleP1.tagName = 'p';
        titleP1.innerHTML = '第一步：回答下列问题';
        title.childNodes.push(titleP1);

        var titleP2 = engine.getLayout(fullConfig);
        titleP2.tagName = 'p';
        titleP2.innerHTML = '回答正确即可领取现金奖励';
        title.childNodes.push(titleP2);

        var question = engine.getLayout(fullConfig);
        question.id = 'quiz-answer';
        question.tagName = 'h1';
        quiz.childNodes.push(question);

        var questionSpan1 = engine.getLayout(fullConfig);
        questionSpan1.tagName = 'span';
        questionSpan1.innerHTML = '提问：';
        question.childNodes.push(questionSpan1);

        var quizDetail = engine.getLayout(fullConfig);
        quizDetail.id = 'quiz-detail';
        quizDetail.tagName = 'span';
        question.childNodes.push(quizDetail);

        var options = engine.getLayout(fullConfig);
        options.id = 'quiz-options';
        options.class = 'options';
        quiz.childNodes.push(options);

        for (var i = 1; i <= 3; i++) {
            var label = engine.getLayout(fullConfig);
            label.tagName = 'label';
            label.class = 'answer-option';
            label.for = 'answer' + i;
            options.childNodes.push(label);

            var input = engine.getLayout(fullConfig);
            input.tagName = 'input';
            input.id = 'answer' + i;
            input.name = 'answer';
            input.type = 'radio';
            input['data-index'] = i;
            label.childNodes.push(input);

            var span = engine.getLayout(fullConfig);
            span.class = 'answer-text';
            span.tagName = 'span';
            label.childNodes.push(span);
        }

        var clearFloat = engine.getLayout(fullConfig);
        clearFloat.class = 'clear';
        options.childNodes.push(clearFloat);

        var account = engine.getLayout(fullConfig);
        account.class = 'account';
        item2.childNodes.push(account);

        var accountUnknown = engine.getLayout(fullConfig);
        accountUnknown.class = 'account-unknown';
        accountUnknown.id = 'smsLogin';
        account.childNodes.push(accountUnknown);

        var accountTitle = engine.getLayout(fullConfig);
        accountTitle.tagName = 'h1';
        accountTitle.class = 'account-title';
        accountTitle.innerHTML = '第二步：输入手机号查看获得红包金额';
        accountUnknown.childNodes.push(accountTitle);

        var table = engine.getLayout(fullConfig);
        table.tagName = 'table';
        accountUnknown.childNodes.push(table);

        var tdArr = [];

        for (var i = 0; i < 2; i++) {
            var tr = engine.getLayout(fullConfig);
            tr.tagName = 'tr';
            table.childNodes.push(tr);
            for (var j = 0; j < 3; j++) {
                // td
                var td = engine.getLayout(fullConfig);
                td.tagName = 'td';
                td.class = 'text-center';
                tr.childNodes.push(td);

                tdArr.push(td);
            }
        }

        var labelPhone = engine.getLayout(fullConfig);
        labelPhone.tagName = 'label';
        labelPhone.innerHTML = '手机号';
        tdArr[0].childNodes.push(labelPhone);

        var labelCode = engine.getLayout(fullConfig);
        labelCode.tagName = 'label';
        labelCode.innerHTML = '验证码';
        tdArr[3].childNodes.push(labelCode);

        var warn = engine.getLayout(fullConfig);
        warn.id = 'warn';
        warn.class = 'warn';
        account.childNodes.push(warn);

        var warnTitle = engine.getLayout(fullConfig);
        warnTitle.tagName = 'h3';
        warnTitle.innerHTML = '提示信息';
        warn.childNodes.push(warnTitle);

        var warnDetail = engine.getLayout(fullConfig);
        warnDetail.id = 'warnDetail';
        warnDetail.tagName = 'p';
        warnDetail.innerHTML = '';
        warn.childNodes.push(warnDetail);

        var btnsContainer = engine.getLayout(fullConfig);
        btnsContainer.class = 'btns';
        item2.childNodes.push(btnsContainer);

        var submitBtn = engine.getLayout(fullConfig);
        submitBtn.tagName = 'button';
        submitBtn.id = 'submit';
        submitBtn.class = 'btn btn-submit';
        submitBtn.innerHTML = '确定';
        btnsContainer.childNodes.push(submitBtn);

        // item3 page3
        var item3 = engine.getLayout(fullConfig);
        item3.class = 'item item3 page3 text-center';
        item3.id = 'item3';
        items.push(item3);
        item3.innerHTML = '<div class="envelope">'
                + '<p id="money" class="money"><span id="cashNumber">2.34</span>元</p>'
            + '</div>'
            + '<p class="page3-desc">由于不同网络环境，奖励可能会产生一定延时</p>'
            + '<p class="page3-desc">请您耐心等待</p>'
            + '<a id="btn-checkout" href="https://wallet.baidu.com/content/mywallet/h5/sdk_page/sdk_quan_manager.html?ua=1-1-1-wirelessadv" target="_blank" class="btn-show-money">点击查看</a>'
            + '<a data-page="3" href="http://app.baifubao.com" target="_blank" class="btn-download page4-btn-dl">'
                + '<p>'
                    + '<img src="http://cpro.baidustatic.com/cpro/ui/noexpire/img/qrcode/A/qianbao-icon.png">'
                    + '<span>下载百度钱包提取现金</span>'
                + '</p>'
            + '</a>';

        var fireworks = engine.getLayout(fullConfig);
        fireworks.class = 'fireworks';
        items.push(fireworks);




        // item4 page4
        var item4 = engine.getLayout(fullConfig);
        item4.class = 'item item4 page4 text-center';
        item4.id = 'item4';
        items.push(item4);
        item4.innerHTML = '<div class="sorry-board"></div>'
            + '<p class="page4-desc">加油，别灰心</p>'
            + '<p class="page4-desc">重新扫描二维码，试试其他任务吧</p>'
            + '<a data-page="4" href="http://app.baifubao.com" target="_blank" class="btn-download page4-btn-dl">'
                + '<p>'
                    + '<img src="http://cpro.baidustatic.com/cpro/ui/noexpire/img/qrcode/A/qianbao-icon.png">'
                    + '<span>下载百度钱包提取现金</span>'
                + '</p>'
            + '</a>';


        style.a = {
            'text-decoration': 'none'
        };
        style['input[type=submit]'] = {
            '-webkit-appearance': 'none',
            'border-radius': '0.3125rem'
        };
        style.html = {
            'width': '100%',
            'color': '#000',
            'font-size': currentRootFontSize + 'px',
            'background-color': '#f9f3d8'
            // 'overflow-x': 'hidden'
        };
        style['::-webkit-input-placeholder'] = {
            'text-align': 'left',
            'font-size': '0.75rem'
        };
        style['::-moz-placeholder'] = {
            'text-align': 'left',
            'font-size': '0.75rem'
        };
        style[':-ms-input-placeholder'] = {
            'text-align': 'left',
            'font-size': '0.75rem'
        };
        style[':-moz-placeholder'] = {
            'text-align': 'left',
            'font-size': '0.75rem'
        };
        style.body = {
            height: '100%',
            margin: '0',
            padding: '0'
            // 'overflow-x': 'hidden'
        };
        style.div = {
            margin: '0',
            padding: '0'
        };
        style['.container'] = {
            'position': 'relative'
            // width: clientWidth + 'px'
        };


        // page 2
        style['.item1'] = {
            display: 'block'
        };
        style['.item2'] = {
            display: 'none'
        };
        style['.item3'] = {
            display: 'none'
        };
        style['.item4'] = {
            display: 'none'
        };
        style['.fireworks'] = {
            display: 'none'
        };
        style['.page'] = {
            'box-sizing': 'border-box',
            'padding': '1.125rem',
            'position': 'relative'
        };
        var bgWidth = 335 / 380 * clientWidth;
        style['.bg'] = {
            'padding': '1.125rem',
            'position': 'relative',
            'width': '90%',
            'margin': '10% auto 0',
            // 'height': clientHeight * 0.8 + 'px',
            // 'position': 'absolute',
            // 'left': (clientWidth - bgWidth) / 2 + 'px',
            // 'bottom': 0,
            // 'background': 'rgba(255, 255, 255, 0.7)',
            'box-sizing': 'border-box',
            'position': 'absolute',
            'left': '5%',
            'bottom': 0,
            'height': '95%'
        };

        /* 问题部分 */
        style['.quiz-title'] = {
            'box-sizing': 'border-box',
            // 'border-left': '0.3125rem solid #fa4727',
            // 'padding-left': '0.3125rem',
            'color': '#fa4727',
            'font-weight': 'bold',
            'font-size': '1rem'
        };
        style['.quiz-title p'] = {
            'margin-bottom': '0.3125rem',
            'color': '#f40a0a'
        };
        style['.quiz-title p:first-of-type'] = {
            'color': '#f40a0a',
            'font-size': '0.875rem'
        };
        style['.quiz'] = {
            'border-bottom': '2px dashed #797979',
            'margin-bottom': '3rem'
        };
        style['#quiz-answer'] = {
            'text-align': 'left',
            'font-size': '1rem',
            'margin': '1.3rem 0',
            'display': 'none'
        };

        style['.answer-option'] = {
            'text-align': 'left',
            'display': 'block',
            'width': '100%',
            'float': 'left',
            'font-size': '0.8125rem',
            'font-weight': 'bold',
            'margin-bottom': '0.625rem'
        };
        style['.answer-option input'] = {
            'margin-right': '0.3125rem'
        };
        style['#quiz-options'] = {
            'width': '100%',
            'text-align': 'center',
            'margin-bottom': '2rem',
            'display': 'none'
        };

        style['.clear'] = {
            clear: 'both',
            display: 'block'
        };


        /* 账号部分 */
        style['.account-btn'] = {
            'font-size': '0.75rem',
            'padding': '0.1875rem 0.625rem',
            'border-radius': '0.3125rem',
            'width': '100%',
            'height': '1.8rem'
        };

        style['.require-validate'] = {
            'background-color': '#f40a0a',
            'border': 'none',
            'color': 'white',
            'font-weight': 'bold'
        };

        style['.account-btn-login'] = {
            'color': 'white',
            'background-color': '#f40a0a',
            'border': 'none'
        };

        style['.require-validate.disabled'] = {
            'color': 'gray',
            'border-color': 'gray'
        };

        style['.account-unknown'] = {
            // display: 'none'
        };

        style['.account-title'] = {
            'font-size': '0.875rem',
            'font-weight': 'bold',
            'margin-bottom': '1rem',
            'color': '#f40a0a'
        };

        style['.account-unknown label'] = {
            'font-size': '0.75rem',
            'font-weight': 'bold'
        };

        // style['.account-unknown input'] = {
        //     'border':'none',
        //     'border': '1px solid rgba(0,0,0,0.3)',
        //     'box-shadow': 'inset 0 0 2px rgba(0,0,0,0.3)',
        //     height: '1.5625rem'
        // }
        style['.account-unknown .text-input'] = {
            'border': 'none',
            'border': '1px solid rgba(0,0,0,0.3)',
            'box-shadow': 'inset 0 0 2px rgba(0,0,0,0.3)',
            'border-radius': '0.3125rem',
            'height': '1.8rem',
            'width': '9.125rem',
            'font-size': '0.75rem'
        };

        style['.account-unknown table'] = {
            'width': '100%',
            'margin-bottom': '1.25rem'
        };

        style['.account-unknown table td'] = {
            'padding-bottom': '0.625rem'
        };
        style['.account'] = {
            'margin-bottom': '4rem'
        };
        style['.warn'] = {
            display: 'none'
        };
        style['.warn h3'] = {
            'color': '#fb5137',
            'font-size': '1rem',
            'margin-bottom': '0.625rem'
        };
        style['.warn p'] = {
            'margin-left': '1.25rem',
            'font-size': '0.875rem',
            'line-height': '1.125rem'
        };
        style['.account-known p'] = {
            'float': 'left',
            'width': '50%',
            'font-size': '14px',
            'padding': '0 10px',
            'box-sizing': 'border-box'
        };
        style['.account-known div'] = {
            'width': '50%',
            'float': 'right'
        };
        style['.account-known button'] = {
            'border': 'none',
            'color': 'white',
            'padding': '5px 20px',
            'border-radius': '5px',
            'background-color': '#fa4727',
            'display': 'block',
            'margin': '0 auto'
        };
        style['.account-known:after'] = {
            content: '',
            display: 'block',
            clear: 'both'
        };


        /* 提交按钮部分 */
        style['.btns'] = {
            width: '100%'
            // position: 'absolute',
            // left: '0',
            // bottom: '10px'
        };
        style['.btn'] = {
            'width': '16.25rem',
            'height': '2.5rem',
            'border-radius': '0.3125rem',
            'border': 'none',
            'margin': '0 auto',
            'margin-bottom': '0.625rem',
            'display': 'block',
            'font-size': '1rem'
        };
        style['.btn-submit'] = {
            'color': 'white',
            'background-color': '#f40a0a'
        };
        style['.btn-return'] = {
            'background-color': 'transparent',
            'border': '1px solid #ed6a4e'
        };
        style['div#closeBtn'] = {
            'cursor': 'pointer',
            'position': 'absolute',
            'z-index': '2147483647',
            'width': 50,
            'height': 50,
            'text-align': 'center',
            'top': '2px',
            'left': '2px'
        };
        style['div#closeDiv'] = {
            'cursor': 'pointer',
            'position': 'absolute',
            'z-index': '2147483647',
            'width': '3.2rem',
            'height': '3.2rem',
            'border-radius': 15 + 'px',
            'font-size': '3rem',
            'text-align': 'center',
            'background': '#888',
            'color': '#fff'
        };
        style['.tipDiv'] = {
            'display': 'none',
            'width': '100%',
            'height': '100%',
            'background': 'rgba(0,0,0,0.7) none repeat scroll 0 0!important',
            'filter': 'Alpha(optacity=70)',
            'position': 'fixed',
            'top': '0',
            'left': '0',
            'z-index': '999'
        };
        style['.tipCon'] = {
            'width': '40rem',
            'height': '14rem',
            'padding': '2rem 1.5rem 0 4rem',
            'vertical-align': 'center',
            'margin': '0 4rem',
            'radius': '0.33rem',
            '-webkit-border-radius': '0.33rem',
            '-moz-border-radius': '0.33rem',
            'position': 'absolute',
            'background-color': '#fff',
            'color': '#000',
            'box-sizing': 'border-box'
        };
        style['.tip1'] = {
            'font-size': '2rem',
            'font-weight': 'bold',
            'margin-bottom': '5px'
        };
        style['.tip2'] = {
            'font-size': '2rem',
            'margin-bottom': '5px'
        };
        style['.tip3'] = {
            'font-size': '2rem'
        };
        style['.tip4'] = {
            position: 'absolute',
            right: '0.5rem',
            top: '0.5rem'
        };
        style['.tipArrow'] = {
            width: '9.6rem'
        };
        // add adIcon
        if (fullConfig.adIconIsShow) {
            container.childNodes.push(this.adIcon.getAdIcon(fullConfig));
        }
        var result = {
            layoutObj: container,
            style: style
        };
        return result;
    }
});
