(function(global) {

	// utilities
    var _utils = global.utils = {

        merge: function(as, excludeInstances) {
            var copy = {};
            excludeInstances = excludeInstances || [Array];
            this.extend(copy, as, excludeInstances);
            return copy;
        },

        extend: function(a, bs, excludeInstances) {
        	for(var i = 0, b; b = bs[i]; i++)
	            for (var prop in b)
	                if (b.hasOwnProperty(prop)) {
	                    var isInstanceOfExcluded = false;
	                    if (excludeInstances)
	                        for (var i = 0; i < excludeInstances.length; i++)
	                            if (b[prop] instanceof excludeInstances[i])
	                                isInstanceOfExcluded = true;

	                    if (typeof b[prop] === 'object' && !isInstanceOfExcluded) {
	                        a[prop] = a[prop] !== undefined ? a[prop] : {};
	                        this.extend(a[prop], [b[prop]], excludeInstances);
	                    } else
	                        a[prop] = b[prop];
	                }
        },

        setProp: function(obj, prop, value) {
            var parts = prop.split('.');
            var _ref = obj;
            for (var i = 0, part; part = parts[i]; i++)
                if (i === parts.length - 1)
                    _ref[part] = value;
                else
                    _ref = (_ref[part] = _ref[part] || {});
        },

        getProp: function(obj, prop) {
            var parts = prop.split('.');
            var _ref = obj;
            for (var i = 0, part; part = parts[i]; i++)
                if (i === parts.length - 1)
                    return _ref[part];
                else
                    _ref = _ref[part] || {};
        },

        findOne: function(ar, query, fn) {
            for (var i = 0, a; a = ar[i]; i++)
                var m = this.matchesQuery(a, query);
                if (m) {
                    if (fn) fn(a, i);
                    return a;
                }

            if (fn) fn(null);
            return null;
        },

        matchesQuery: function(obj, query) {
            switch (typeof query) {
                case 'object':
                    for(var prop in query){
                    	var val = this.getProp(obj, prop);
                    	if(val !== query[prop])
                    		return false;
                    }
                    return true;
                case 'function':
                    return query(obj);
            }
        },

        find: function(ar, query, fn) {
            var results = [];
            for (var i = 0, a; a = ar[i]; i++)
                if (this.matchesQuery(a, query))
                    results.push(a);
            
            if (fn) fn(results);
            return results;
        },

        contains: function(ar, obj, query) {
            for (var i = 0, a; a = ar[i]; i++)
                if (this.equals(a, obj, query))
                    return true;
            return false;
        },

        any: function(items, query) {
        	for(var i = 0, item; item = items[i]; i++)
        		if (this.matchesQuery(item, query))
        			return true;
        	return false;
        },

        union: function(ar1, ar2, query, fn) {
            var results = [];
            for (var i = 0; i < ar1.length; i++)
                results.push(ar1[i]);
            for (var i = 0; i < ar2.length; i++) {
                var isNotInAr1 = !this.contains(ar1, ar2[i], query);
                if (isNotInAr1)
                    results.push(ar2[i]);
            };
            if (fn) fn(results);
            return results;
        },

        except: function(ar1, ar2, query, fn) {
            var results = [];
            for (var i = 0; i < ar1.length; i++) {
                var a = ar1[i];
                if (!this.contains(ar2, a, query))
                    results.push(a);
            }
            if (fn) fn(results);
            return results;
        },

        max: function(ar) {
            var max;
            for (var i = 0; i < ar.length; i++) {
                var a = ar[i];
                if (typeof max === 'undefined' || a > max)
                    max = a;
            }
            return max;
        },

        equals: function(item1, item2, query) {
            for(var prop in query){
            	var val1 = this.getProp(item1, prop);
            	var val2 = this.getProp(item2, prop);
            	if(val1 !== val2)
            		return false;
            }
            return true;
        },

        chain: function(fn) {
            return function() {
                fn.apply(this, arguments);
                return this;
            };
        }

    };

    // EventTarget
    (function() {

        var EventTarget = global.EventTarget = function() {
            var self = this;
            self._listeners = {};
        };

        EventTarget.prototype = {
            constructor: EventTarget,

            on: _utils.chain(function(type, listener) {
                if (typeof this._listeners[type] == "undefined") {
                    this._listeners[type] = [];
                }

                this._listeners[type].push(listener);
            }),

            trigger: _utils.chain(function(type, data) {
                if (this._listeners[type] instanceof Array) {
                    var listeners = this._listeners[type];
                    for (var i = 0, len = listeners.length; i < len; i++) {
                        if (data instanceof Array)
                            listeners[i].apply(this, data);
                        else
                            listeners[i].call(this, data);
                    }
                }
            }),

            removeListener: _utils.chain(function(type, listener) {
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

    })();

    // Vector
    (function(){

        var Vector = global.Vector = function(x, y){
            var self = this;
            self.x = x;
            self.y = y;
        };

    })();

    // Point
    (function(){

        var Point = global.Point = function(x, y){
            var self = this;
            self.x = x;
            self.y = y;
        };

        _utils.extend(Point.prototype, [{
            move: _utils.chain(function(vector){
                var self = this;
                self.x += vector.x;
                self.y += vector.y;
            })
        }]);

    })();

    // Mouse
    (function() {
        var EventTarget = global.EventTarget;
        var Point = global.Point;
        var Vector = global.Vector;

    	var Mouse = global.Mouse = function(container){
            var self = this;
            EventTarget.call(self);

            self.container = container;
            self.down = false;
            self.curr = new Point(null, null);
            self.diff = new Vector(0, 0);

            container.addEventListener('mousemove', function(e) {
                var nx = e.clientX - container.offsetLeft;
                var ny = e.clientY - container.offsetTop;
                self.diff.x = nx - self.curr.x;
                self.diff.y = ny - self.curr.y;
                self.curr.x = nx;
                self.curr.y = ny;
                self.trigger('move', e);
            });

            container.addEventListener('mousedown', function(e) {
                self.down = true;
                self.trigger('down', e);
            });

            container.addEventListener('mouseup', function(e) {
                self.down = false;
                self.trigger('up', e);
            });

            container.addEventListener('click', function(e) {
                self.trigger('click', e);
            });
    	};

    	_utils.extend(Mouse.prototype, [EventTarget.prototype]);

    })();

    // Polygon
    (function(){
        var EventTarget = global.EventTarget;

        var Polygon = global.Polygon = function(points, options){
            var self = this;
            EventTarget.call(self);
            self.points = points;
            self.options = options;
            self.scene = null;
        };

        _utils.extend(Polygon.prototype, [EventTarget.prototype, {
            draw: _utils.chain(function(){
                var self = this,
                    context = self.scene.context;
                    options = self.options;
                    points = self.points;

                context.beginPath();
                context.moveTo(points[0].x, points[0].y);

                for(var i = 1; i < points.length; i++){
                    var point = points[i];
                    context.lineTo(point.x, point.y);
                }

                context.lineTo(points[0].x, points[0].y);

                if(options.fillStyle){
                    context.fillStyle = options.fillStyle;
                    context.fill();
                }

                if(options.lineWidth){
                    context.strokeStyle = options.strokeStyle || 'black';
                    context.lineWidth = options.lineWidth;
                    context.stroke();
                }
            }),

            pointInside: function(pt){
                var self = this,
                    points = self.points;

                for(var c = false, i = -1, l = points.length, j = l - 1; ++i < l; j = i)
                    ((points[i].y <= pt.y && pt.y < points[j].y) || (points[j].y <= pt.y && pt.y < points[i].y))
                    && (pt.x < (points[j].x - points[i].x) * (pt.y - points[i].y) / (points[j].y - points[i].y) + points[i].x)
                    && (c = !c);
                return c;
            },

            move: _utils.chain(function(vector){
                var self = this,
                    points = self.points;

                for(var i = 0, point; point = points[i]; i++)
                    point.move(vector);
            })
        }]);

    })();

    // Scene
    (function(){
        var EventTarget = global.EventTarget;
        var Mouse = global.Mouse;

        var Scene = global.Scene = function(context){
            var self = this;
            EventTarget.call(self);
            self.context = context;
            self.polygons = [];
            self.mouse = new Mouse(context.canvas);
        };

        _utils.extend(Scene.prototype, [EventTarget.prototype, {
            add: _utils.chain(function(polygon, index){
                var self = this;
                self.polygons.splice(index === undefined ? self.polygons.length - 1 : index, 0, polygon);
                polygon.scene = self;
            }),

            draw: _utils.chain(function(){
                var self = this;
                for(var i = 0, polygon; polygon = self.polygons[i]; i++)
                    polygon.draw(self);
            }),

            clear: _utils.chain(function(){
                var self = this;
                self.context.clearRect(0, 0, self.context.canvas.width, self.context.canvas.height);
            })
        }]);

    })();

    // test
    var scene = new global.Scene(document.getElementById('squanche').getContext('2d'));
    var line = new global.Polygon([
        new global.Point(50, 50),
        new global.Point(100, 50),
        new global.Point(100, 100),
        new global.Point(75, 125),
        new global.Point(50, 100)
    ], {
        strokeStyle: 'green',
        lineWidth: 1,
        fillStyle: '#8ED6FF'
    });

    scene.add(line);
    update();

    function update(){
        scene
            .clear()
            .draw();
    }

    scene.mouse.on('move', function(){
        var overline = line.pointInside(this.curr);

        if(overline && this.down)
            line.move(this.diff);

        update();
    });

})(window.kanvas = {});
