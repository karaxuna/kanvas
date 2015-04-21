(function (global) {
    var utils = global.utils,
        Figure = global.Figure,
        Point = global.Point,
        Vector = global.Vector;

    var Circle = global.Circle = function (parent, position, radius) {
        var self = this;
        Figure.call(self, parent, position);
        self.radius = radius;
    };

    utils.extend(Circle.prototype, [Figure.prototype, {
        draw: utils.chain(function (scene) {
            var self = this,
                context = scene.context,
                center = self.getAbsCenter(),
                radius = self.radius;

            context.beginPath();
            context.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);
            context.stroke();
        }),

        pointInside: function (pt) {
            var self = this,
                radius = self.radius,
                center = self.getAbsCenter();

            return (pt.x - center.x) * (pt.x - center.x) + (pt.y - center.y) * (pt.y - center.y) <= radius * radius;
        },

        getAbsCenter: function () {
            var self = this,
                absPosition = self.getAbsPosition();
            return new Point(absPosition.x + self.radius, absPosition.y + self.radius);
        }
    }]);

})(window.kanvas);
