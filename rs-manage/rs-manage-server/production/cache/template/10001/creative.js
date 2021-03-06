/**
 * @file 10001
 * @author fanwenjuan@baidu.com
 */
/* globals oojs */
oojs.define({
    name: '10001Creative',
    namespace: '',
    searchCreative: function (size) {
        var result = [];
        var creativeType = 0;
        var width = size.width;
        var height = size.height;
        var count = 1;
        if (width < 200) {
            count =  Math.round(height / 150);
        } else if (330 > width && width >= 200) {
            count =  Math.round(height / 100);
        } else if (450 > width && width >= 330) {
            count =  Math.round(height / 70);
        } else if (960 > width && width >= 450) {
            count = Math.round(width / 200) * Math.round(height / 90);
        } else {
            count = Math.floor(width / 200) * Math.round(height / 90);
        }
        var creativeRequired = {
            creativeType: creativeType,
            count: count
        };
        result.push(creativeRequired);
        return result;
    }
});