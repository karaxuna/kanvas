(function (global) {
    var utils = global.utils;

    var Font = global.Font = function (style, size, family) {
        var self = this;
        self.style = style;
        self.size = size;
        self.family = family;
    };

    utils.extend(Font.prototype, [{
        getCombinedText: function () {
            var self = this,
                style = self.style,
                size = self.size,
                family = self.family,
                result = '';

            if (style) {
                result += style;
            }
            if (size) {
                result += (result ? ' ' : '') + size + 'px';
            }
            if (family) {
                result += (result ? ' ' : '') + family;
            }
            return result;
        }
    }]);

})(window.kanvas);
