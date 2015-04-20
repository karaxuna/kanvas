(function (global) {
    var utils = global.utils,
        EventTarget = global.EventTarget,
        Mouse = global.Mouse;

    var Scene = global.Scene = function (context) {
        var self = this;
        EventTarget.call(self);
        self.context = context;
        self.figures = [];
        self.mouse = new Mouse(context.canvas);
    };

    utils.extend(Scene.prototype, [EventTarget.prototype, {
        add: utils.chain(function (figure, index) {
            var self = this;
            self.figures.splice(index === undefined ? self.figures.length - 1 : index, 0, figure);
        }),

        draw: utils.chain(function () {
            var self = this;
            for (var i = 0, figure; figure = self.figures[i]; i++) {
                figure.draw(self);
            }
        }),

        clear: utils.chain(function () {
            var self = this;
            self.context.clearRect(0, 0, self.context.canvas.width, self.context.canvas.height);
        })
    }]);

})(window.kanvas);
