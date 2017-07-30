function CoreControl(options) {
    var _that = this;
    this._model = options.model;
    this._view = options.view;

    this._view.onShapeCountMinusClicked.attach(function () {
        _that._model.setShapeCount(-1);
    });

    this._view.onShapeCountPlusClicked.attach(function () {
        _that._model.setShapeCount(1);
    });

    this._view.onShapeCountChanged.attach(function (sender, e) {
        _that._model.setShapeCount(e.currentTarget.value, true);
    });

    this._view.onGravityCountMinusClicked.attach(function () {
        _that._model.setGravityCount(-0.01);
    });

    this._view.onGravityCountPlusClicked.attach(function () {
        _that._model.setGravityCount(0.01);
    });

    this._view.onGravityCountChanged.attach(function (sender, e) {
        _that._model.setGravityCount(e.currentTarget.value, true);
    });
}