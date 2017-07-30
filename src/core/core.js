function Core(options) {
    var _that = this;

    this.numberOfShapes = options.numberOfShapes !== undefined ? options.numberOfShapes : 1;
    this.gravity = options.gravity !== undefined ? options.gravity : 0.1;
    this.updateInterval = options.updateInterval !== undefined ? options.updateInterval : 1000 / 60;
    this.screenWidth = options.screenWidth !== undefined ? options.screenWidth : 800;
    this.screenHeight = options.screenHeight !== undefined ? options.screenHeight : 600;
    this.screenColor = options.screenColor !== undefined ? options.screenColor : 0xffffff;
    this.shapes = [];
    this.toLastSecond = 0;

    this.app = new PIXI.Application(this.screenWidth, this.screenHeight, { backgroundColor: this.backgroundColor });

    this.onShapeCounterUpdated = new Event(this);
    this.onOccupaedByShapesUpdated = new Event(this);
    this.onGravityCountChanged = new Event(this);
    this.onShapeCountChanged = new Event(this);

    this.start();
}

Core.prototype = {
    start: function(){
        this.play = true;
        var _that = this;
        setTimeout(function () {
            _that.update();
        }, _that.updateInterval);
    },
    stop: function(){
        this.play = false;
    },
    addShape: function (e) {
        var shape = this.getRandomShape();
        console.log(shape);
        shape = new window[shape]({parent: this});
        this.shapes.push(shape);
        this.app.stage.addChild(shape.sprite);

        shape.onRemoveMe.attach(function (shape) {
            this.removeShape(shape);
        });

        this.onShapeCounterUpdated.notify(this.shapes.length);
    },
    setShapeCount: function(value, force){
        value = parseFloat(value);
        if(force){
            this.numberOfShapes = value;
        } else {
            this.numberOfShapes += value;
        }
        this.numberOfShapes = Math.max(0, this.numberOfShapes);
        this.onShapeCountChanged.notify(this.numberOfShapes);
    },
    setGravityCount: function(value, force){
        value = parseFloat(value);
        if(force){
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
        for (var index = 0; index < this.shapes.length; index++) {

            var shape = this.shapes[index];
            if(shape.sprite == null){
                console.log(shape);
                console.log(this.shapes);
            }
            if (shape.sprite.y < -200 || shape.sprite.y > this.screenHeight) {
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
        
        this.onOccupaedByShapesUpdated.notify(this.shapes.length * 3);

        
        if(this.play){
            var _that = this;
            setTimeout(function () {
                _that.update();
            }, _that.updateInterval);
        }
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
2
function CoreView(options) {
    var _that = this;
    _that.options = options;
    options.canvasContainer.appendChild(options.model.app.view);

    options.shapeCount.value = options.model.numberOfShapes;
    options.gravityCount.value = options.model.gravity;

    this.onShapeCountMinusClicked = new Event(this);
    this.onShapeCountPlusClicked = new Event(this);
    this.onShapeCountChanged = new Event(this);
    this.onGravityCountMinusClicked = new Event(this);
    this.onGravityCountPlusClicked = new Event(this);
    this.onGravityCountChanged = new Event(this);

    options.model.onShapeCounterUpdated.attach(function(sender, value){
        _that.options.shapesCounter.innerHTML = value;
    });

    options.model.onOccupaedByShapesUpdated.attach(function(sender, value){
        _that.options.occupaedByShapes.innerHTML = value;
    });

    options.model.onShapeCountChanged.attach(function(sender, value){
        _that.options.shapeCount.value = value;
    });

    options.model.onGravityCountChanged.attach(function(sender, value){
        _that.options.gravityCount.value = value;
    });

    options.shapeCountMinus.addEventListener('click', function(e){
        _that.onShapeCountMinusClicked.notify(e);
    });

    options.shapeCountPlus.addEventListener('click', function(e){
        _that.onShapeCountPlusClicked.notify(e);
    });
    
    options.shapeCount.addEventListener('change', function(e){
        _that.onShapeCountChanged.notify(e);
    });

    options.gravityCountMinus.addEventListener('click', function(e){
        _that.onGravityCountMinusClicked.notify(e);
    });

    options.gravityCountPlus.addEventListener('click', function(e){
        _that.onGravityCountPlusClicked.notify(e);
    });
    
    options.gravityCount.addEventListener('change', function(e){
        _that.onGravityCountChanged.notify(e);
    });
}


function CoreControl(options){
    var _that = this;
    this._model = options.model;
    this._view = options.view;

    this._view.onShapeCountMinusClicked.attach(function(){
        _that._model.setShapeCount(-1);
    });

    this._view.onShapeCountPlusClicked.attach(function(){
        _that._model.setShapeCount(1);
    });

    this._view.onShapeCountChanged.attach(function(sender, e){
        _that._model.setShapeCount(e.currentTarget.value, true);
    });
    
    this._view.onGravityCountMinusClicked.attach(function(){
        _that._model.setGravityCount(-0.01);
    });

    this._view.onGravityCountPlusClicked.attach(function(){
        _that._model.setGravityCount(0.01);
    });

    this._view.onGravityCountChanged.attach(function(sender, e){
        _that._model.setGravityCount(e.currentTarget.value, true);
    });
}