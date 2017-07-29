function Core(options) {
    var _that = this;

    _that.app = new PIXI.Application(800, 600, { backgroundColor: 0x1099bb });

    _that.numberOfShapes = options.numberOfShapes !== undefined ? options.numberOfShapes : 5;
    _that.gravity = options.gravity !== undefined ? options.gravity : 0.1;
    _that.updateInterval = options.updateInterval !== undefined ? options.updateInterval : 1000 / 60;
    _that.shapes = [];
    _that.toLastSecond = 0;

    setTimeout(function () {
        _that.update();
    }, _that.updateInterval);
}

Core.prototype = {
    addShape: function (e) {
        var shape = this.getRandomShape();
        console.log(shape);
        shape = new window[shape]({});
        this.shapes.push(shape);
        this.app.stage.addChild(shape.sprite);

        shape.removeMe.attach(function (shape) {
            this.removeShape(shape);
        });
    },
    removeShape: function (shape) {
        var index = this.shapes.indexOf(shape);
        if (index != -1) {
            this.app.stage.removeChild(shape.sprite);
            this.shapes.splice(index, 1);
            shape.remove();
        }
    },
    update: function () {
        for (var index = 0; index < this.shapes.length; index++) {

            var shape = this.shapes[index];
            if(shape.sprite == null){
                console.log(shape);
                console.log(this.shapes);
            }
            if (shape.sprite.y > 500) {
                this.removeShape(shape);
                continue;
            }
            shape.update(this.gravity);
        }

        this.toLastSecond += this.updateInterval;
        if(this.toLastSecond > 1000){
            var count = Math.round(this.numberOfShapes);
            for (var shapeIndx = 0; shapeIndx < count; shapeIndx++) {
                this.addShape();
            }
            this.toLastSecond = 0;
        }

        var _that = this;
        setTimeout(function () {
            _that.update();
        }, _that.updateInterval);
    },
    getRandomShape: function () {
        var shapes = [
            'Shape'
            //,
            //'Shape2',
            //'ShapeCirle'
        ];

        return shapes[Math.round(Math.random() * (shapes.length-1))];
    }
};

function CoreView(options) {
    document.getElementById('viewCanvas').appendChild(options.model.app.view);
}
