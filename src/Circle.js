(function (global) {
    var utils = global.utils,
        Figure = global.Figure;

    var Circle = global.Circle = function (center, radius) {
        var self = this;
        Figure.call(self);
        self.center = center;
        self.radius = radius;
    };

    utils.extend(Circle.prototype, [Figure.prototype, {
        draw: utils.chain(function (scene) {
            var self = this,
                context = scene.context,
                center = self.center,
                radius = self.radius;

            context.beginPath();
            context.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);
            context.stroke();
        }),

        pointInside: function (pt) {
            var self = this,
                radius = self.radius,
                center = self.center;

            return (pt.x - center.x) * (pt.x - center.x) + (pt.y - center.y) * (pt.y - center.y) <= radius * radius;
        },

        move: utils.chain(function (vector) {
            var self = this,
                center = self.center;

            center.move(vector);
        })
    }]);

})(window.kanvas);
