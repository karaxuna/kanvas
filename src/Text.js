(function (global) {
    var utils = global.utils,
        Figure = global.Figure,
        Size = global.Size;

    var Text = global.Text = function (text, point, font) {
        var self = this;
        self.text = text;
        self.point = point;
        self.font = font;
    };

    utils.extend(Text.prototype, [Figure.prototype, {
        draw: utils.chain(function (scene) {
            var self = this,
                point = self.point,
                text = self.text,
                font = self.font,
                context = scene.context;

            context.textBaseline = 'top';
            context.font = font.getCombinedText();
            context.fillText(text, point.x, point.y);
        }),

        getSize: function () {
            var self = this,
                text = self.text,
                font = self.font,
                vctx = document.createElement('canvas').getContext('2d');

            vctx.textBaseline = 'top';
            vctx.font = font.getCombinedText();
            return new Size(vctx.measureText(text).width, font.size);
        },

        pointInside: function (pt) {
            var self = this,
                point = self.point,
                size = self.getSize();

            return pt.x >= point.x && pt.x <= point.x + size.width && pt.y >= point.y && pt.y <= point.y + size.height;
        },

        move: utils.chain(function (vector) {
            var self = this,
                point = self.point;

            point.move(vector);
        })
    }]);

})(window.kanvas);
