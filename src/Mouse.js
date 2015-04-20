(function (global) {
    var utils = global.utils,
        EventTarget = global.EventTarget,
        Point = global.Point,
        Vector = global.Vector;

    var Mouse = global.Mouse = function (container) {
        var self = this;
        EventTarget.call(self);

        self.container = container;
        self.down = false;
        self.curr = new Point(null, null);
        self.diff = new Vector(0, 0);

        container.addEventListener('mousemove', function (e) {
            var nx = e.clientX - container.offsetLeft;
            var ny = e.clientY - container.offsetTop;
            self.diff.x = nx - self.curr.x;
            self.diff.y = ny - self.curr.y;
            self.curr.x = nx;
            self.curr.y = ny;
            self.trigger('move', e);
        });

        container.addEventListener('mousedown', function (e) {
            self.down = true;
            self.trigger('down', e);
        });

        container.addEventListener('mouseup', function (e) {
            self.down = false;
            self.trigger('up', e);
        });

        container.addEventListener('click', function (e) {
            self.trigger('click', e);
        });
    };

    utils.extend(Mouse.prototype, [EventTarget.prototype]);

})(window.kanvas);
