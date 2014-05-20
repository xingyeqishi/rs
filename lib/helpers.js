var handlebars = require('handlebars');
/**
 * 初始化helper
 */
function initHelper() {
    handlebars.registerHelper("each_with_index", function(array, options) {
        var buffer = "";
        if (!array) {
            return;
        }
        for (var i = 0, j = array.length; i < j; i++) {
            var item = array[i];
            // stick an index property onto the item, starting with 1, may make configurable later
            item.index = i;
            // show the inside of the block
            buffer += options.fn(item);
        }
        // return the finished buffer
        return buffer;
    });
}
module.exports = initHelper;
