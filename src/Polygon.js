(function (global) {
    var utils = global.utils,
        Figure = global.Figure,
        Point = global.Point;

    var Polygon = global.Polygon = function (position, points) {
        var self = this;
        Figure.call(self, position);
        self.points = points;
    };

    utils.extend(Polygon.prototype, [Figure.prototype, {
        draw: utils.chain(function (scene) {
            var self = this,
                context = scene.context,
                position = self.position,
                points = self.points;

            context.beginPath();
            context.moveTo(position.x + points[0].x, position.y + points[0].y);

            for (var i = 1; i < points.length; i++) {
                var point = points[i];
                context.lineTo(position.x + point.x, position.y + point.y);
            }

            context.closePath();
            context.stroke();
        }),

        pointInside: function (pt) {
            var self = this,
                points = self.points,
                position = self.position;

            for (var rpointi, rpointj, c = false, i = -1, l = points.length, j = l - 1; ++i < l; j = i) {
                rpointi = new Point(position.x + points[i].x, position.y + points[i].y);
                rpointj = new Point(position.x + points[j].x, position.y + points[j].y);

                ((rpointi.y <= pt.y && pt.y < rpointj.y) || (rpointj.y <= pt.y && pt.y < rpointi.y)) &&
                (pt.x < (rpointj.x - rpointi.x) * (pt.y - rpointi.y) / (rpointj.y - rpointi.y) + rpointi.x) &&
                (c = !c);
            }
            return c;
        }
    }]);

})(window.kanvas);
