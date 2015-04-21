(function (global) {
    var utils = global.utils,
        Figure = global.Figure,
        Size = global.Size;

    var Text = global.Text = function (position, text, font) {
        var self = this;
        Figure.call(self, position);
        self.text = text;
        self.font = font;
    };

    utils.extend(Text.prototype, [Figure.prototype, {
        draw: utils.chain(function (scene) {
            var self = this,
                position = self.position,
                text = self.text,
                font = self.font,
                context = scene.context;

            context.textBaseline = 'top';
            context.font = font.getCombinedText();
            context.fillText(text, position.x, position.y);
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
                position = self.position,
                size = self.getSize();

            return pt.x >= position.x && pt.x <= position.x + size.width && pt.y >= position.y && pt.y <= position.y + size.height;
        }
    }]);

})(window.kanvas);
