/**
 * @file 10010
 * @author qianxiaoli@baidu.com
 */
/* globals oojs */
oojs.define({
    name: '10010Creative',
    namespace: '',
    searchCreative: function (size) {
        var result = [];
        var creativeType = 0;
        var width = size.width;
        var height = size.height;
        var creativeRequired = {
            creativeType: creativeType,
            width: width,
            height: height,
            count: 1
        };
        result.push(creativeRequired);
        return result;
    }
});