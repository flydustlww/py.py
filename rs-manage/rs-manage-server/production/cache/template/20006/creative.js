/**
 * @file 20001
 * @author fanwenjuan@baidu.com
 */
/* globals oojs */
oojs.define({
    name: '20001Creative',
    namespace: '',
    searchCreative: function (size) {
        var result = [];
        var creativeType = 1;
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