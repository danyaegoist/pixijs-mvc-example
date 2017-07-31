function Core(options) {
    var _that = this;

    this.numberOfShapes = options.numberOfShapes !== undefined ? options.numberOfShapes : 1;
    this.gravity = options.gravity !== undefined ? options.gravity : 0.001;
    this.updateInterval = options.updateInterval !== undefined ? options.updateInterval : 1000 / 60;
    this.screenWidth = options.screenWidth !== undefined ? options.screenWidth : 800;
    this.screenHeight = options.screenHeight !== undefined ? options.screenHeight : 600;
    this.screenColor = options.screenColor !== undefined ? options.screenColor : 0xffffff;
    this.shapes = [];
    this.toLastSecond = 0;

    this.app = new PIXI.Application(this.screenWidth, this.screenHeight, { backgroundColor: this.backgroundColor, roundPixels: true });
    this.app.stage.interactive = true;
    this.app.stage.hitArea = new PIXI.Rectangle(0, 0, this.screenWidth, this.screenHeight);

    this.app.stage.on('pointerdown', function (e) {
        if (e.target instanceof PIXI.Sprite) {
            _that.interactionOnShape(e.target.owner, e);
        } else {
            _that.addShape(e);
        }
    });

    this.onShapeCounterUpdated = new Event(this);
    this.onOccupaedByShapesUpdated = new Event(this);
    this.onGravityCountChanged = new Event(this);
    this.onShapeCountChanged = new Event(this);

    this.start();
}

Core.prototype = {
    start: function () {
        this.play = true;
        var _that = this;
        setTimeout(function () {
            _that.update();
        }, _that.updateInterval);
    },
    stop: function () {
        this.play = false;
    },
    addShape: function (e) {
        var shape = this.getRandomShape();
        var options = { parent: this };
        if (e !== undefined && e.data.global.x !== undefined && e.data.global.y !== undefined) {
            options.x = e.data.global.x;
            options.y = e.data.global.y;
        }
        shape = new window[shape](options);
        this.shapes.push(shape);
        this.app.stage.addChild(shape.sprite);

        var _that = this;
        shape.onClicked.attach(function (sender, e) {
            _that.interactionOnShape(sender, e);
        });

        this.onShapeCounterUpdated.notify(this.shapes.length);
    },
    interactionOnShape: function (sender, e) {

        if (e.data.button == 0) {
            this.removeShape(sender);
        } else if (e.data.button == 2) {
            this.setShapesColor(sender.type);
        }
    },
    setShapesColor: function (type) {
        for (var index = 0; index < this.shapes.length; index++) {
            var shape = this.shapes[index];
            if (shape.type == type) {
                shape.changeColor();
            }
        }
    },
    setShapeCount: function (value, force) {
        value = parseFloat(value);
        if (force) {
            this.numberOfShapes = value;
        } else {
            this.numberOfShapes += value;
        }
        this.numberOfShapes = Math.max(0, this.numberOfShapes);
        this.onShapeCountChanged.notify(this.numberOfShapes);
    },
    setGravityCount: function (value, force) {
        value = parseFloat(value);
        if (force) {
            this.gravity = value;
        } else {
            this.gravity += value;
        }
        // this.gravity = this.gravity.toFixed(2);
        this.onGravityCountChanged.notify(this.gravity);
    },
    removeShape: function (shape) {
        var index = this.shapes.indexOf(shape);
        if (index != -1) {
            this.app.stage.removeChild(shape.sprite);
            this.shapes.splice(index, 1);
            shape.remove();
        }

        this.onShapeCounterUpdated.notify(this.shapes.length);
    },
    update: function () {
        var totalArea = 0;
        for (var index = 0; index < this.shapes.length; index++) {

            var shape = this.shapes[index];
            if (shape.sprite == null) {
                console.log(shape);
                console.log(this.shapes);
            }
            if(shape.sprite.y >= 0 && shape.sprite.y < this.screenHeight){
                totalArea += shape.area;
            }
            
            if (shape.sprite.y < -100 || shape.sprite.y > this.screenHeight + 100) {
                this.removeShape(shape);
                continue;
            }
            shape.update(this.gravity);
        }
        //easy way
        this.onOccupaedByShapesUpdated.notify(Math.round(Math.sqrt(totalArea)) + " ("+Math.floor(totalArea / (this.screenWidth * this.screenHeight) * 100) +"%)");

        this.toLastSecond += this.updateInterval;
        if (this.toLastSecond > 1000) {
            var count = Math.round(this.numberOfShapes);
            for (var shapeIndx = 0; shapeIndx < count; shapeIndx++) {
                this.addShape();
            }
            this.toLastSecond = 0;

            //HARD WAY
            // var pix = this.app.renderer.extract.pixels(this.app.stage);
            // var countOfOccupaed = 0;
            // for (var i = 0, n = pix.length; i < n; i += 4) {
            //     if(pix[i] !== 0 && pix[i+1] !== 0 && pix[i+2] !== 0){
            //         countOfOccupaed++;
            //     }   
            // }
            // this.onOccupaedByShapesUpdated.notify(Math.floor(Math.sqrt(countOfOccupaed)) + " ("+Math.floor(countOfOccupaed / (pix.length / 4) * 100) +"%)");
        }
        

        if (this.play) {
            var _that = this;
            setTimeout(function () {
                _that.update();
            }, _that.updateInterval);
        }
    },
    getRandomShape: function () {
        var shapes = [
            'Shape',
            'Shape2',
            'ShapeCirle'
        ];

        return shapes[Math.round(Math.random() * (shapes.length - 1))];
    }
};