(function (global) {
    var utils = global.utils,
        Figure = global.Figure,
        Size = global.Size;

    var Text = global.Text = function (parent, absPosition, text, font) {
        var self = this;
        Figure.call(self, parent, absPosition);
        self.text = text;
        self.font = font;
    };

    utils.extend(Text.prototype, [Figure.prototype, {
        draw: utils.chain(function (scene) {
            var self = this,
                absPosition = self.getAbsPosition(),
                text = self.text,
                font = self.font,
                context = scene.context;

            context.textBaseline = 'top';
            context.font = font.getCombinedText();
            context.fillText(text, absPosition.x, absPosition.y);
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
                absPosition = self.getAbsPosition(),
                size = self.getSize();

            return pt.x >= absPosition.x && pt.x <= absPosition.x + size.width &&
                pt.y >= absPosition.y && pt.y <= absPosition.y + size.height;
        }
    }]);

})(window.kanvas);
