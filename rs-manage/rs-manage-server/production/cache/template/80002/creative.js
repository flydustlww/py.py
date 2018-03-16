/**
 * @file 80002
 * @author fanwenjuan@baidu.com
 */
/* globals oojs */
/* eslint-disable */
oojs.define({
    name: '80002Creative',
    namespace: '',
    searchCreative: function (size) {
        var result = [];
        var creativeType = 7;
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
