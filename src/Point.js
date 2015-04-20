(function (global) {
    var utils = global.utils;

    var Point = global.Point = function (x, y) {
        var self = this;
        self.x = x;
        self.y = y;
    };

    utils.extend(Point.prototype, [{
        move: utils.chain(function (vector) {
            var self = this;
            self.x += vector.x;
            self.y += vector.y;
        })
    }]);

})(window.kanvas);
