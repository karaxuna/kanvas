(function (global) {
    var utils = global.utils,
        EventTarget = global.EventTarget;

    var Figure = global.Figure = function (position) {
        var self = this;
        EventTarget.call(self);
        self.position = position;
    };

    utils.extend(Figure.prototype, [EventTarget.prototype, {

        move: utils.chain(function (vector) {
            var self = this;
            self.position.move(vector);
        })

        /*
        * draw - draw on canvas
        * abstract
        * @param Scene - instance of scene to draw there
        */

    }]);

})(window.kanvas);
