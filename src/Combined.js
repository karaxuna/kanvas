(function (global) {
    var utils = global.utils,
        Figure = global.Figure;

    var Circle = global.Circle = function (figures) {
        var self = this;
        Figure.call(self);
        self.figures = figures;
    };

    utils.extend(Circle.prototype, [Figure.prototype, {
        draw: utils.chain(function (scene) {
            var self = this;
            self.figures.forEach(function (figure) {
                figure.draw(scene);
            });
        }),

        pointInside: function (pt) {
            var self = this;
            return self.figures.some(function (figure) {
                return figure.pointInside(pt);
            });
        },

        move: utils.chain(function (vector) {
            var self = this,
                center = self.center;

            center.move(vector);
        })
    }]);

})(window.kanvas);
