/**
 * @file 测试数据
 * @author liguangyi@baidu.com
 */
var ads = {"creativeContents":[{"imageMaterial":[{"file":{"fileSrc":"http://ubmcmm.baidustatic.com/media/v1/0f0000J1CFBykyP9Catl00.jpg"},"width":600,"height":500}],"promoteAppMaterial":{"appName":"baidusafe","appLogoUrl":"http://ubmcmm.baidustatic.com/media/v1/0f0005lYhtG66ld3dKxp7f.png","appPackage":"cn.opda.a.phonoalbumshoushou"},"action":[{"actionType":"5","clickLink":{"clickLink":"xxx.baidu.com://clicklink","antiCheating":0}}]}]};

// 请求对象
var requestInfo = {
    client: {
        dspId: 1,
        sspId: 1,
        requestId: 'requestId',
        account: 'account'
    },
    styleId: 20008,
    size: {
        sizeType: 1,
        width: 320,
        height: 48
    },
    device: {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36'
        + ' (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36',
		device: {deviceType:2}
    },
    ads: JSON.stringify(ads)
};
        
module.exports = requestInfo;

