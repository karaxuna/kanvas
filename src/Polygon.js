(function (global) {
    var utils = global.utils,
        Figure = global.Figure;

    var Polygon = global.Polygon = function (points) {
        var self = this;
        Figure.call(self);
        self.points = points;
    };

    utils.extend(Polygon.prototype, [Figure.prototype, {
        draw: utils.chain(function (scene) {
            var self = this,
                context = scene.context,
                points = self.points;

            context.beginPath();
            context.moveTo(points[0].x, points[0].y);

            for (var i = 1; i < points.length; i++) {
                var point = points[i];
                context.lineTo(point.x, point.y);
            }

            context.closePath();
            context.stroke();
        }),

        pointInside: function (pt) {
            var self = this,
                points = self.points;

            for (var c = false, i = -1, l = points.length, j = l - 1; ++i < l; j = i)
                ((points[i].y <= pt.y && pt.y < points[j].y) || (points[j].y <= pt.y && pt.y < points[i].y)) && (pt.x < (points[j].x - points[i].x) * (pt.y - points[i].y) / (points[j].y - points[i].y) + points[i].x) && (c = !c);
            return c;
        },

        move: utils.chain(function (vector) {
            var self = this,
                points = self.points;

            for (var i = 0, point; point = points[i]; i++)
                point.move(vector);
        })
    }]);

})(window.kanvas);
