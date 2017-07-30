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

    options.model.onShapeCounterUpdated.attach(function (sender, value) {
        _that.options.shapesCounter.innerHTML = value;
    });

    options.model.onOccupaedByShapesUpdated.attach(function (sender, value) {
        _that.options.occupaedByShapes.innerHTML = value;
    });

    options.model.onShapeCountChanged.attach(function (sender, value) {
        _that.options.shapeCount.value = value;
    });

    options.model.onGravityCountChanged.attach(function (sender, value) {
        _that.options.gravityCount.value = value;
    });

    options.shapeCountMinus.addEventListener('click', function (e) {
        _that.onShapeCountMinusClicked.notify(e);
    });

    options.shapeCountPlus.addEventListener('click', function (e) {
        _that.onShapeCountPlusClicked.notify(e);
    });

    options.shapeCount.addEventListener('change', function (e) {
        _that.onShapeCountChanged.notify(e);
    });

    options.gravityCountMinus.addEventListener('click', function (e) {
        _that.onGravityCountMinusClicked.notify(e);
    });

    options.gravityCountPlus.addEventListener('click', function (e) {
        _that.onGravityCountPlusClicked.notify(e);
    });

    options.gravityCount.addEventListener('change', function (e) {
        _that.onGravityCountChanged.notify(e);
    });
}