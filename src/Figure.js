(function (global) {
    var utils = global.utils,
        EventTarget = global.EventTarget;

    var Figure = global.Figure = function () {
        var self = this;
        EventTarget.call(self);
    };

    utils.extend(Figure.prototype, [EventTarget.prototype]);

})(window.kanvas);
