(function (global) {
    var utils = global.utils;

    var EventTarget = global.EventTarget = function () {
        var self = this;
        self._listeners = {};
    };

    EventTarget.prototype = {
        constructor: EventTarget,

        on: utils.chain(function (type, listener) {
            if (typeof this._listeners[type] == "undefined") {
                this._listeners[type] = [];
            }

            this._listeners[type].push(listener);
        }),

        trigger: utils.chain(function (type, data) {
            if (this._listeners[type] instanceof Array) {
                var listeners = this._listeners[type];
                for (var i = 0, len = listeners.length; i < len; i++) {
                    if (data instanceof Array) {
                        listeners[i].apply(this, data);
                    } else {
                        listeners[i].call(this, data);
                    }
                }
            }
        }),

        removeListener: utils.chain(function (type, listener) {
            if (this._listeners[type] instanceof Array) {
                var listeners = this._listeners[type];
                for (var i = 0, len = listeners.length; i < len; i++) {
                    if (listeners[i] === listener) {
                        listeners.splice(i, 1);
                        break;
                    }
                }
            }
        })
    };

})(window.kanvas);
