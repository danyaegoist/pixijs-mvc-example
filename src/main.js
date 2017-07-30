
window.addEventListener('load', function () {

    var core = new Core({});
    var view = new CoreView({
        shapesCounter: document.getElementById('shapesCounter'),
        occupaedByShapes: document.getElementById('occupaedByShapes'),
        shapeCountMinus: document.getElementById('shapeCountMinus'),
        shapeCountPlus: document.getElementById('shapeCountPlus'),
        shapeCount: document.getElementById('shapeCount'),
        gravityCountMinus: document.getElementById('gravityCountMinus'),
        gravityCountPlus: document.getElementById('gravityCountPlus'),
        gravityCount: document.getElementById('gravityCount'),
        canvasContainer: document.getElementById('viewCanvas'),
        model: core
    });
    var control = new CoreControl({
        model: core,
        view: view
    });
});