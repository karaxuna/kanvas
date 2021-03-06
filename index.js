var scene = new kanvas.Scene(document.getElementById('canvas').getContext('2d'));

// text inside circle
var circle = new kanvas.Circle(null, new kanvas.Point(300, 70), 25);
var text = new kanvas.Text(circle, new kanvas.Point(0, 0), 'konichiva bros :)))', new kanvas.Font('italic', 20, 'Calibri'));

var line = new kanvas.Polygon(null, new kanvas.Point(10, 10), [
    new kanvas.Point(50, 50),
    new kanvas.Point(100, 50),
    new kanvas.Point(100, 100),
    new kanvas.Point(75, 125),
    new kanvas.Point(50, 100)
]);

scene.add(circle);
scene.add(text);
scene.add(line);
update();

function update() {
    scene
        .clear()
        .draw();
}

scene.mouse.on('move', function () {
    if (this.down) {
        if (line.pointInside(this.curr))
            line.move(this.diff);
        if (circle.pointInside(this.curr))
            circle.move(this.diff);
        if (text.pointInside(this.curr))
            text.move(this.diff);
    }
    update();
});
