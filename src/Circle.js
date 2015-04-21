(function (global) {
    var utils = global.utils,
        Figure = global.Figure,
        Point = global.Point,
        Vector = global.Vector;

    var Circle = global.Circle = function (position, radius) {
        var self = this;
        Figure.call(self, position);
        self.radius = radius;
    };

    utils.extend(Circle.prototype, [Figure.prototype, {
        draw: utils.chain(function (scene) {
            var self = this,
                context = scene.context,
                center = self.getCenter(),
                radius = self.radius;

            context.beginPath();
            context.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);
            context.stroke();
        }),

        pointInside: function (pt) {
            var self = this,
                radius = self.radius,
                center = self.getCenter();

            return (pt.x - center.x) * (pt.x - center.x) + (pt.y - center.y) * (pt.y - center.y) <= radius * radius;
        },

        getCenter: function () {
            var self = this;
            var center = new Point(self.position.x, self.position.y);
            center.move(new Vector(self.radius, self.radius));
            return center;
        }
    }]);

})(window.kanvas);
