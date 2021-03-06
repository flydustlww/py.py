/**
 * @file RPC协议层实现
 * @author zhangziqiu(zhangziqiu@qq.com)
 */
/* global oojs */

oojs.define({
    name: 'Template',
    namespace: 'TemplateServer.Service',

    /**
     * 静态构造函数
     */
    $Template: function () {

    },

    /**
     * 模板渲染流程
     *
     * @param {Object} requestInfo 请求对象
     * @return {oojs.promise} 返回promise对象
     */
    render: function (requestInfo) {
        var promise = oojs.create(oojs.promise);

        // 处理client对象
        var client = {};
        if (requestInfo.client && requestInfo.client.clientRequestId) {
            client.clientRequestId = requestInfo.client.clientRequestId;
        }

        // 使用promise._resolve改变promise状态,引发上层promise链式调用的继续执行.
        setTimeout(function () {
            var result = {
                client: client,
                status: {
                    statusCode: 1,
                    detail: 'finished'
                },
                /* eslint-disable max-len */
                result: '<!DOCTYPE html><html> <head>  <meta http-equiv=Content-Type content="text/html; charset=UTF-8">        <title>百度网盟推广</title><link rel=stylesheet href=http://cpro.baidustatic.com/cpro/ui/noexpire/css/2.0.1/template.min.css> <style type="text/css">.bd-logo-310-260{bottom:5px;right:5px}</style> </head> <body><script src=http://cpro.baidustatic.com/cpro/ui/noexpire/js/2.0.1/oojs.js></script> <script>            var ads = [{"encoding":1,"title":null,"desc":[],"monitorUrl":[],"clickUrl":null,"midTime":30,"showUrl":null,"stuffType":9000,"stuffSrc":"","width":200,"height":200,"smartIdeaProduct":[{"clickUrl":"http://pos.baidu.com/cclick.php?af0000KIKxX3ws7ttKmSieMD2pwgSFDlQRZVWXouw6HGlOvNSLhmYqZuL6q-sZe7GjSyHVIHtVakcnvDFpWAqFIMlH9MnNkWjsiLX3ODHC7YtJyk74amLLqiifGM.7D_aqM76wKWo4pjl775OOdJhI6k3EOOEEX1BsTEpMfkk3tTMAEWvIrHGLI5i_HDnNerQKzs34-9h9mzUVLWkR0.mhwGujYznDuDnWbYnWTYwRNKrj77PRDsfbfkwRw7fRD1nHT4nfKWTA-b5HcswbfzrHfzP1w7wRD3nRRdfHKawj77wDNKfHnkP1bk0ZIbg17YTh7buHYk0ZIbg1FYTh7buHYknfKbUvd9py4xuh-zTLwxIZF9uARqn0KbUvd9py4xTvNWUv4bgLwzmyw-5H00TAtqn0Ksm1Ys0APCUyfqnfK9uZfqnfK9uAP_mgP15H00IZRqPHcsnHnkP0KYUHYs0Zw9TWYk0ZP1TjYknj0k0Aq15H00mMcqn0KbIZ0qnfKdThsqpZwYTjCEQLILIz4Bmy-bIi4WUvY0Iv-bIA6qnW0s0A9-pyICIjYznj00myw3gvFGu7qWTAYqn0K1IA7YpyPxTZFETANzIZbq0ZPVmgFYgLIspyfqnH0snfK1Uy7zI7qsThqbIyPYpyfqnH0snsK1Uy7zI7qYTAkGujY1nfKWThnqnWn4PHn0","midTime":38,"jsonData":"{ \"key1\" : \"p1_title\", \"key2\" : \"kkk\", \"key3\" : \"1 p1_starttime\", \"key4\" : \"aaap1_endTimebbb\", \"key5\" : \"p1ak1_valuep1ak2_value\" }"},{"clickUrl":"http://pos.baidu.com/cclick.php?af0000agKvKMi1TxVl9MpkwvWZKE6dAnZEQU29obVw2pndd4GgzodJRzAoreDy-cBXtDVALhYQu5TSNU04vKAG-znBk68r9iMg6Cb2NuTHb_YtLAY_xFlioItVoa.7R_aqM76wKWzTVKqaBMOOldHrsmtgOOLLEukmrgVHCm3tXrHWgkerMFYe8MGyFBA2qM764mTTzs1f_uPhOG3J0.mhwGujYznDuDnWbYnWTYwRNKrj77PRDsfbfkwRw7fRD1nHT4nfKWTA-b5HcswbfzrHfzP1w7wRD3nRRdfHKawj77wDNKfHnkP1bk0ZIbg17YTh7buHYk0ZIbg1FYTh7buHYknfKbUvd9py4xuh-zTLwxIZF9uARqn0KbUvd9py4xTvNWUv4bgLwzmyw-5H00TAtqn0Ksm1Ys0APCUyfqnfK9uZfqnfK9uAP_mgP15H00IZRqPHcsnHnkP0KYUHYs0Zw9TWYk0ZP1TjYknj0k0Aq15H00mMcqn0KbIZ0qnfKdThsqpZwYTjCEQLILIz4Bmy-bIi4WUvY0Iv-bIA6qnW0s0A9-pyICIjYznj00myw3gvFGu7qWTAYqn0K1IA7YpyPxTZFETANzIZbq0ZPVmgFYgLIspyfqnH0snfK1Uy7zI7qsThqbIyPYpyfqnH0sP0K1Uy7zI7qYTAkGujY1nfKWThnqn1c30j","midTime":38,"jsonData":"{ \"key1\" : \"p2_title\", \"key2\" : \"kkk\", \"key3\" : \"2.1 p2_starttime\", \"key4\" : \"aaap2_endTimebbb\", \"key5\" : \"p2ak1_valuep2ak2_value\" }"}],"extention":null,"actionType":null,"actionTypeInfo":null,"bid":null}];            var config = {"templateWidth":200,"templateHeight":200,"account":"super-nova"};var layoutConfig = {};            var antiArray = [38,38];ar smGlobleCss ={\'.container div\':\'{position:absolute;overflow:hidden}\',\'a\':\'{text-decoration:none;font-family:微软雅黑;}\',\'.container\':\'{position:relative;padding:0;margin:0;overflow:hidden;border:1px solid #000;background:#fff;}\',\'.adItemSpace\':\'{width:400px;height:0px;border-top:1px dotted #dadada;position:relative;}\',\'.adDesc\':\'{color:#333333}\',\'.adPrice\':\'{color:#ff7800;font-weight:bold}\',\'.adShoppingCart\':\'{background:url("http://cpro.baidu.com/cpro/ui/noexpire/img/smartIdea/shoppingCart.png") no-repeat 0 0; _filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=none, src="http://cpro.baidu.com/cpro/ui/noexpire/img/smartIdea/shoppingCart.png");_background:none;}\',\'.clickButton\':\'{background:#ff7800;}\',\'.buttonText\':\'{color:#fff}\'};           var smLayoutconfig = {  container:{id:\'container\',style:\'width:198px;height:198px;\',type:\'layout\'},   brandBlock:{id:\'brandBlock\',parent:\'container\',style:\'width:198px;height:198px;background:#fff;text-align:left;\',type:\'layout\',isShow:true},    brandLogo:{id:\'brandlogo0\',parent:\'brandBlock\',style:\'height:198px;width:198px;top:0px;left:0px;\',type:\'image\',content:\'\',isShow:true,linkDisplay:"inline",enableClick:true,content:\'http://ubmcmm.baidustatic.com/media/v1/0f0000RxkYNRADErAebSEf.jpg\'},   adBlockWrap:{id:\'adBlockWrap\',parent:\'container\',style:\'width:118px;height:157px;background:#fff;left:0px;top:52px;margin-left:40px;\',isShow:true,type:"layout"}, adBlock:{id:\'adBlock\',parent:\'adBlockWrap\',style:\'width:118px;height:157px;background:#fff;left:0px;top:0px;\',isShow:true,type:"layout",linkDisplay:"inline",adItemNum:1,adItemlayoutType:\'horizontal\'}, //vertical and horizontal  adItem:{id:\'adItem\',parent:\'adBlock\',style:\'width:118px;height:158px;background:#fff;position:relative;float:left\',isShow:true,type:"layout",linkDisplay:"inline"},   adLogo:{id:\'adLogo\',parent:\'adItem\',style:\'width:74px;height:74px;left:22px;top:5px;\',className:\'adLogo\',isShow:true,type:"image",linkDisplay:"inline",k:\'res\'},  adDesc:{id:\'adDesc\',parent:\'adItem\',style:\'width:118px;height:32px;left:0px;top:85px;font-size:14px;line-height:15px;text-align:center;\',className:\'adDesc\',isShow:true,type:"text",linkDisplay:"inline",k:\'title\'},  adPriceBlockWrap:{id:\'adPriceBlockWrap\',parent:\'adItem\',style:\'height:40px;width:118px;position:relative;top:118px;left:0;text-align:center\',type:\'layout\',content:\'\',isShow:true},   adPriceBlock:{id:\'adPriceBlock\',parent:\'adPriceBlockWrap\',style:\'height:40px;position:relative;display:inline-block;_display:inline;_zoom:1\',type:\'layout\',content:\'\',isShow:true},   adPrice:{id:\'adPrice\',parent:\'adPriceBlock\',style:\'height:30px;font-size:14px;position:relative;float:left;\',type:\'text\',content:\'\',suffix:\'\',isShow:true, className:\'adPrice\',k:\'sprice\'}, clickButton:{id:\'clickButton\',parent:\'adPriceBlock\',style:\'width:35px;height:22px;position:relative;float:left;margin-top:3px;margin-left:3px;\',type:\'layout\',content:\'\',isShow:true,className:\'clickButton\'},  clickButtonArrow:{id:\'clickButtonArrow\',parent:\'adPriceBlock\',style:\'position:relative;float:left;margin-top:3px;width:0;height:0;border-bottom:11px solid #fff; border-top:11px solid #fff;border-left:5px solid #ff7800; \',type:\'layout\',content:\'\',isShow:true},   buttonText:{id:\'buttonText\',parent:\'clickButton\',style:\'position:relative;font-size:12px;height:22px;margin-left:5px;\',type:\'text\',content:\'购买\',isShow:true,className:\'buttonText\'},    adItemSpace:{id:\'adItemSpace\',parent:\'adBlock\',style:\'width:238px;margin-left:15px;position:relative;\',className:\'adItemSpace\',isShow:false,type:"layout",linkDisplay:"inline"}};var smLunboConfig = {  isLunbo:true,   isAnimation:true,//切换的时候，是否需要动画效果   lunboLeftIconBlock: {style:\'width:30px;height:30px;position:absolute;left:10px;top:100px;overflow:hidden;\',parent:\'container\',isShow:true}, lunboLeftIcon:{style:\'width:21px;height:21px;margin:5px;\',src:\'http://cpro.baidu.com/cpro/ui/noexpire/img/smartIdea/lunboArrowLeft_1.png\',mouseover:\'http://cpro.baidu.com/cpro/ui/noexpire/img/smartIdea/lunboArrowLeft_mouseover_1.png\',hover:\'http://cpro.baidu.com/cpro/ui/noexpire/img/smartIdea/lunboArrowLeft_hover_1.png\',parent:\'lunboLeftIconBlock\'},   lunboRightIconBlock: {style:\'width:30px;height:30px;position:absolute;right:10px;top:100px;\',parent:\'container\',isShow:true},   lunboRightIcon:{style:\'width:21px;height:21px;margin:5px;\',src:\'http://cpro.baidu.com/cpro/ui/noexpire/img/smartIdea/lunboArrowRight_1.png\',mouseover:\'http://cpro.baidu.com/cpro/ui/noexpire/img/smartIdea/lunboArrowRight_mouseover_1.png\',hover:\'http://cpro.baidu.com/cpro/ui/noexpire/img/smartIdea/lunboArrowRight_hover_1.png\',parent:\'lunboRightIconBlock\'},  lunboPageNumBlock:{style:\'width:41px;height:41px;position:absolute;right:0;top:0;\',src:\'http://cpro.baidu.com/cpro/ui/noexpire/img/smartIdea/lunbo_page_1.png\',parent:\'container\',isShow:false},  lunboCurrentPageNum:{style:\'color:#FF7800\'},lunboTimeArray:[5000,3000,2000],  lunboStep:118,  lunboBlock:"adBlock"};        </script> <div id=loader class=loader>loading......</div> <div id=lu_loader class=loader>loading......</div>  <script src=http://cpro.baidustatic.com/static/js/rs/1.0.0/rsBase.min.js></script> <script>     try{document.execCommand("BackgroundImageCache",!1,!0)}catch(err){}oojs.config({basePath:"http://cpro.baidustatic.com/cpro/ui/noexpire/js/"}),oojs.loadScript("rs.business.anticheat");         </script> '
                /* eslint-enable max-len */
            };
            promise._resolve(result);
        }, 1);

        return promise;
    }
});
