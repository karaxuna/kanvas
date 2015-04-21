(function (global) {
    var utils = global.utils,
        EventTarget = global.EventTarget;

    var Figure = global.Figure = function (parent, position) {
        var self = this;
        EventTarget.call(self);
        self.parent = parent;
        self.position = position;
    };

    utils.extend(Figure.prototype, [EventTarget.prototype, {

        move: utils.chain(function (vector) {
            var self = this;
            self.position.move(vector);
        }),

        getAbsPosition: function () {
            var self = this;
            return self.parent ? self.parent.getAbsPosition().copy().move(self.position) : self.position;
        }

        /*
        * draw - draw on canvas
        * abstract
        * @param Scene - instance of scene to draw there
        * @returns Figure - self
        */

        /*
        * pointInside - determines whether the point is inside figure or not
        * abstract
        * @param Point - point
        * @returns Boolean - result
        */

    }]);

})(window.kanvas);
