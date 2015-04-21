(function (global) {
    var utils = global.utils,
        Figure = global.Figure;

    var Combined = global.Combined = function (parent, position, figures) {
        var self = this;
        Figure.call(self, parent, position);
        self.figures = figures;
    };

    utils.extend(Combined.prototype, [Figure.prototype, {
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
        }
    }]);

})(window.kanvas);
